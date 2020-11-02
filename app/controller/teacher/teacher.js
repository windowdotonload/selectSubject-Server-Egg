'use strict';

const Controller = require('egg').Controller;

class TeacherController extends Controller {
    async addTacher() {
        const { ctx } = this
        let res = await ctx.service.teacher.addTea(ctx.request.body)
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

    async showTeacher() {
        const { ctx } = this
        let res = await ctx.service.teacher.showTea(ctx.query)
        if (res) {
            ctx.body = {
                msg: 'success',
                data: {
                    count: res.count,
                    pageData: res.rows
                }
            }
        }
    }

    async editTeacher() {
        const { ctx } = this
        let res = await ctx.service.teacher.editTea(ctx.request.body)

        ctx.body = {
            msg: 'success',
            data: res
        }
    }
}

module.exports = TeacherController;
