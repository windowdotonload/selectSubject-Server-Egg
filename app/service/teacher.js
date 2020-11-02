'use strict';

const md5 = require('md5');

const Service = require('egg').Service;

class TeacherService extends Service {
    async addTea(params) {
        const { ctx } = this
        // console.log(params)
        const { username, password, teachername, specialized_subject } = params
        let res = await ctx.model.Teacher.create({ username, password: md5(password), teachername, specialized_subject })
        return res
    }

    async showTea(params) {
        const { ctx } = this
        const { pagesize, pagenumber, recordid } = params
        const res = await ctx.model.Teacher.findAndCountAll({
            limit: Number(pagesize),
            offset: (Number(pagenumber) - 1) * Number(pagesize),
        });
        return res
    }

    async editTea(params) {
        const { ctx } = this
        // console.log(params)
        const { id, username, password, teachername, specialized_subject } = params
        let res = await ctx.model.Teacher.findOne({
            where: { id }
        })
        let resEdit = await res.update({ username, password: md5(password), teachername, specialized_subject })
        // console.log(res)
        return resEdit
    }
}

module.exports = TeacherService;
