'use strict';

const Service = require('egg').Service;

class StudentService extends Service {
    async saveTeacherId(params) {
        const { ctx } = this
        const { studentid, teacherid } = params
        let stu = await ctx.model.Student.findByPk(studentid)
        let res = await stu.update({ teacherid })
        return res
    }

    async createdShowSelectTeacherId(params) {
        const { ctx } = this
        const { id } = params
        // console.log(id)
        let stu = await ctx.model.Student.findByPk(id)
        // console.log(stu)
        const teacherid = stu.dataValues.teacherid
        // console.log(teacherid)
        let res = await ctx.model.Title.findAll({
            where: {
                teacherid
            }
        })
        // console.log(res)
        return res
    }

    async stuGetSelectTeacherName(params) {
        const { ctx } = this
        const { id } = params

        let stu = await ctx.model.Student.findByPk(id)
        const teacherid = stu.dataValues.teacherid
        let res = await ctx.model.Teacher.findByPk(teacherid)
        // console.log(res)
        return res
    }

    async confirmSelectTeacher(params) {
        const { ctx } = this
        const { id } = params

        let stu = await ctx.model.Student.findByPk(id)
        let res = await stu.update({ canselect: 1 })
        return res
    }

    async getStuInfo(params) {
        const { ctx } = this
        const { id } = params

        let res = await ctx.model.Student.findByPk(id)
        return res
    }
}

module.exports = StudentService;