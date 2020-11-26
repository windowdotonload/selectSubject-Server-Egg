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

    async confirmStudentSelTitle(params) {
        const { ctx } = this
        const { stuid, titleid, titlename } = params

        let stu = await ctx.model.Student.findByPk(stuid)
        let res = await stu.update({
            titleid,
            select_subject: titlename,
            select_title_status: 1,
        })
        let applyRes = await ctx.model.Applyhistory.create({
            content: `申请${titlename}题目`,
            studentid: stuid
        })
        return [res, applyRes]
    }

    async getStudentSelTitleInfo(params) {
        const { ctx } = this
        const { id } = params

        let stu = await ctx.model.Student.findByPk(id)
        // console.log(stu.dataValues)
        if (stu.dataValues.titleid) {
            let res = await ctx.model.Title.findByPk(stu.dataValues.titleid)
            return res
        }
    }

    async changeTitleStatus(params) {
        const { ctx } = this
        const { stuid, titleid } = params
        let tit = await ctx.model.Title.findByPk(titleid)
        let res = tit.update({
            studentid: stuid,
            status: 1
        })
        return res
    }

    async studentCustomTitle(params) {
        const { ctx } = this
        const { id, title_name, title_description } = params
        let stu = await ctx.model.Student.findByPk(id)
        let res = await stu.update({
            // 有一种情况为，学生先选择的老师出的题目，然后被退回，之后提交自定义选择题，此时要吧之前的学生表中的select_subject和titleid清空
            select_subject: '',
            titleid: null,
            ifcustom: 1,
            title_name,
            title_description,
            custom_title_status: 0,
            select_title_status: 1
        })
        let oldtitle = await ctx.model.Stucustomtitle.findAll({
            where: {
                studentid: id
            }
        })
        oldtitle.forEach(async item => {
            let tit = await ctx.model.Stucustomtitle.findByPk(item.dataValues.id)
            await tit.update({
                status: 0
            })
        })
        // console.log('oldtitle', oldtitle)
        let customres = await ctx.model.Stucustomtitle.create({
            title_name,
            title_description,
            status: 1,
            studentid: id,
            teacher_audit: 0
        })
        return [res, customres]
    }

    async stuChangeTitle(params) {
        const { ctx } = this
        const { id } = params
        let stu = await ctx.model.Student.findByPk(id)
        let titleid = stu.dataValues.titleid
        let stures = await stu.update({
            titleid: null,
            select_subject: '',
            select_title_status: 0,
            title_name: '',
            title_description: '',
            change_title_number: 1
        })
        let tit = await ctx.model.Title.findByPk(titleid)
        let titres = await tit.update({
            status: 0,
            studentid: null
        })
        return [stures, titres]
    }

    async modStuConfirmChangeTitle(params) {
        const { ctx } = this
        const { id } = params
        // console.log('stuid', id)
        let stu = await ctx.model.Student.findByPk(id)
        let titleid = stu.dataValues.titleid
        let ifcustom = stu.dataValues.ifcustom
        let stures = await stu.update({
            titleid: null,
            select_title_status: 0,
            select_subject: '',
            title_name: '',
            title_description: '',
        })
        let titres
        if (titleid) {
            // 判断学生是自定义题目还是选择的老师题目
            // 如果是自定义的题目，因为自定义的题目就是这个学生自已出的，所以自定义题目表是改变status
            // 如果是选择的老师出题表,需要改变老师出题表的选择状态
            if (ifcustom == 1) {
                let stuCustomTit = await ctx.model.Stucustomtitle.findByPk(titleid)
                titres = await stuCustomTit.update({
                    status: 0
                })
            } else {
                let title = await ctx.model.Title.findByPk(titleid)
                titres = await title.update({
                    status: 0,
                    studentid: null
                })
            }
        }
        return [stures, titres]
    }

    async recordChangeTitle(params) {
        const { ctx } = this
        const { id, titleid } = params
        let tit = await ctx.model.Title.findByPk(titleid)
        let res = await ctx.model.Applyhistory.create({
            studentid: id,
            content: `申请修改${tit.dataValues.title_name}选题`
        })
        return res
    }

    async recordIfStuSendMessage(params) {
        const { ctx } = this
        const { id } = params
        let stu = await ctx.model.Student.findByPk(id)
        let res = await stu.update({
            sendmessage: 1
        })
        return res
    }

    async showHistoryMessage(params) {
        const { ctx } = this
        const { studentid, teacherid } = params

        let res = await ctx.model.Recordmessage.findAll({
            where: {
                studentid,
                teacherid
            }
        })
        return res
    }

    async studentAlreadyReadMessage(params) {
        const { ctx } = this
        const { id } = params

        let stu = await ctx.model.Student.findByPk(id)

        let res = await stu.update({
            receiveteamessage: 0
        })

        return res
    }
}

module.exports = StudentService;
