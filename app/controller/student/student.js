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
        let res = await ctx.service.setudent.createdShowSelectTeacherId(ctx.query)
        if (res.msg === 'success') {
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
}

module.exports = StudentController;
