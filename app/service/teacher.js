'use strict';

const md5 = require('md5');

const Service = require('egg').Service;

class TeacherService extends Service {
    async addTea(params) {
        const { ctx } = this
        console.log(params)
        const { username, password, teachername, specialized_subject, phonenumber, tecentqnumber, professional } = params
        let res = await ctx.model.Teacher.create({ username, password: md5(password), teachername, specialized_subject, phonenumber, tecentqnumber, professional, status: 1 })
        return res
    }

    async showTea(params) {
        const { ctx } = this
        const { pagesize, pagenumber, recordid } = params
        const res = await ctx.model.Teacher.findAndCountAll({
            limit: Number(pagesize),
            offset: (Number(pagenumber) - 1) * Number(pagesize),
            where: {
                status: 1
            }
        });
        return res
    }

    async editTea(params) {
        const { ctx } = this
        // console.log('----------')
        // console.log(params)
        // console.log('----------')

        const { id, username, password, teachername, specialized_subject } = params
        let editObj = {}
        for (let i in params) {
            if (params[i] != '') {
                if (i == 'password') {
                    editObj[i] = md5(params[i])
                } else {
                    editObj[i] = params[i]
                }
            }
        }
        // console.log(editObj)
        let res = await ctx.model.Teacher.findOne({
            where: { id }
        })
        let resEdit = await res.update(editObj)
        // console.log(res)
        return resEdit
    }

    // 连表查询对应记录下选择的毕业设计教师
    async showTeacherByTTR(params) {
        const { ctx } = this
        const { id } = params
        // console.log(id)
        // 根据当前创建的记录的id查找对应的老师信息
        let result = await ctx.model.Teacher.findAll({
            where: {
                status: 1
            },
            include: {
                model: ctx.model.Record,
                where: {
                    id
                }
            }
        })
        // console.log('-----------')
        // console.log(result)
        // console.log('-----------')
        return result
    }

    async deleteTeacher(params) {
        const { ctx } = this
        const { id } = params
        let tea = await ctx.model.Teacher.findByPk(id)
        let res = await tea.update({ status: 0 })
        return res
    }

}

module.exports = TeacherService;
