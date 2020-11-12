'use strict';

const Controller = require('egg').Controller;

class StudentController extends Controller {
    async showAllStudentCanSelectTeacher() {
        const { ctx } = this
        let res = await ctx.service.teacher.showAllStudentCanSelectTeacher(ctx.query)
        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: 'error'
            }
        }
    }

    async showSelectTeacherTitle() {
        const { ctx } = this
        let res = await ctx.service.teacher.showSelectTeacherTitle(ctx.query)
        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: 'error'
            }
        }
    }

    async saveTeacherId() {
        const { ctx } = this
        let res = await ctx.service.student.saveTeacherId(ctx.request.body)
        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: 'error'
            }
        }
    }

    async createdShowSelectTeacherId() {
        const { ctx } = this
        let res = await ctx.service.student.createdShowSelectTeacherId(ctx.query)
        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: "error"
            }
        }
    }

    async stuGetSelectTeacherName() {
        const { ctx } = this
        let res = await ctx.service.student.stuGetSelectTeacherName(ctx.query)
        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: 'error'
            }
        }
    }

    async confirmSelectTeacher() {
        const { ctx } = this
        let res = await ctx.service.student.confirmSelectTeacher(ctx.request.body)
        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: "error"
            }
        }
    }

    async getStuInfo() {
        const { ctx } = this
        let res = await ctx.service.student.getStuInfo(ctx.query)
        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: "error"
            }
        }
    }

    async confirmStudentSelTitle() {
        const { ctx } = this
        let res = await ctx.service.student.confirmStudentSelTitle(ctx.request.body)
        if (res) {
            ctx.body = {
                msg: "success",
                data: res
            }
        } else {
            ctx.body = {
                msg: "error"
            }
        }
    }

    async getStudentSelTitleInfo() {
        const { ctx } = this
        let res = await ctx.service.student.getStudentSelTitleInfo(ctx.query)
        if (res) {
            ctx.body = {
                msg: "success",
                data: res
            }
        } else {
            ctx.body = {
                msg: 'error'
            }
        }
    }

    async changeTitleStatus() {
        const { ctx } = this
        let res = await ctx.service.student.changeTitleStatus(ctx.request.body)
        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: 'error'
            }
        }
    }
}

module.exports = StudentController;
