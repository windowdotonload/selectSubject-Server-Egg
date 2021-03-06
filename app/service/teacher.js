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

    async addTitleInfo(params) {
        const { ctx, app } = this
        const { title_name, title_description, id } = params
        const addRes = await app.elasticsearch.bulk({
            body: [
                { index: { _index: 'title' } },
                { content: title_name, uptime: new Date() }
            ]
        })
        // console.log(addRes.items[0].index._id)
        let res = await ctx.model.Title.create({ title_name, title_description, status: 0, teacherid: id, elasticsearchid: addRes.items[0].index._id })
        // console.log(addRes)
        // res.dataValues.addRes = addRes
        // console.log('res is ', res)
        return res
    }

    async showTitle(params) {
        const { ctx } = this
        const { id } = params
        // console.log('id is ', id)
        let res = await ctx.model.Title.findAll(
            {
                where: {
                    teacherid: id
                }
            }
        )
        return res
    }

    async editTitle(params) {
        const { ctx } = this
        const { id } = params
        let editObj = {}
        for (let i in params) {
            if (i != 'id') {
                if (params[i] != '') {
                    editObj[i] = params[i]
                }
            }
        }
        // console.log(editObj)
        let tit = await ctx.model.Title.findByPk(id)
        let res = await tit.update(editObj)
        return res
    }

    async deleteTitle(params) {
        const { ctx, app } = this
        const { id } = params
        let tit = await ctx.model.Title.findByPk(id)
        // console.log('tit is  ', tit)
        // console.log('elsticsearchid is is ', tit.dataValues.elasticsearchid)
        const deleteRes = await app.elasticsearch.bulk({
            body: [
                { delete: { _index: 'title', _id: tit.dataValues.elasticsearchid } },
            ]
        })
        // console.log('deleteRes is ', deleteRes)
        let res = await tit.destroy()
        return res
    }

    async searchSimilarTitleName(params) {
        const { ctx, app } = this
        // console.log(params)
        const { title } = params
        const res = await app.elasticsearch.search({
            index: 'title',
            // from: 20,   //分页
            // size: 10,
            body: {
                query: {
                    match: {
                        content: title
                    }
                },
                highlight: {
                    pre_tags: ["<h1 style='margin:5px;margin-top:-2px'>"],
                    post_tags: ["</h1>"],
                    fields: {
                        content: {}
                    }
                }
            }
        }, {
            ignore: [404],
            maxRetries: 3
        })
        // console.log('res is  ', res)
        // console.log(res.data.hits.hits)
        return res
    }

    async showAllStudentCanSelectTeacher(params) {
        const { ctx } = this
        const { recordid } = params
        let res = await ctx.model.Teacher.findAll({
            where: {
                status: 1
            },
            include: {
                model: ctx.model.Record,
                where: {
                    id: recordid,
                    status: 1
                }
            }
        })
        return res
    }

    async showSelectTeacherTitle(params) {
        const { ctx } = this
        const { id } = params
        let res = await ctx.model.Title.findAll({
            where: {
                teacherid: id,
                // status: 0
            }
        })
        return res
    }

    async teaGetSelectStuInfo(params) {
        const { ctx } = this
        const { id } = params
        let res = await ctx.model.Student.findAll({
            where: {
                teacherid: id
            }
        })
        return res
    }

    async passStudentSelTitle(params) {
        const { ctx } = this
        const { id } = params

        let stu = await ctx.model.Student.findByPk(id)
        let stures = await stu.update({ select_title_status: 2 })
        let titleid = stu.dataValues.titleid
        let tit = await ctx.model.Title.findByPk(titleid)
        let titres = await tit.update({ status: 2 })
        return [stures, titres]

    }

    async refuseStudentSelTitle(params) {
        const { ctx } = this
        const { id, titlename } = params
        let stu = await ctx.model.Student.findByPk(id)
        // 老师将一个学生的选题退回，学生选题状态变为被退回，而题目的状态直接可以变为待选择
        let stures = await stu.update({ select_title_status: 4 })
        let titleid = stu.dataValues.titleid
        let tit = await ctx.model.Title.findByPk(titleid)
        let titres = await tit.update({ status: 0 })
        let applyRes = await ctx.model.Applyhistory.create({
            content: `选择${titlename}被退回`,
            studentid: id
        })
        let resArr = [stures, titres, applyRes]
        return resArr
    }

    async teacherSubmitScore(params) {
        const { ctx } = this
        const { id, score } = params
        // console.log(id)
        let stu = await ctx.model.Student.findByPk(id)
        let res = await stu.update({
            score
        })
        // console.log(res)
        return res
    }

    async teacherGetApplyHistory(parms) {
        const { ctx } = this
        const { id } = parms

        let applyres = await ctx.model.Applyhistory.findAll({
            where: {
                studentid: id
            },
            order: [
                ['id', 'desc']
            ]
        })
        return applyres
    }

    async teacherAlreadyReadMessage(params) {
        const { ctx } = this

        const { id } = params

        let stu = await ctx.model.Student.findByPk(id)

        let res = await stu.update({
            sendmessage: 0
        })
        return res
    }

    async remindStudentMessage(params) {
        const { ctx } = this
        const { id } = params

        let stu = await ctx.model.Student.findByPk(id)

        let res = await stu.update({
            receiveteamessage: 1
        })

        return res
    }
}

module.exports = TeacherService;
