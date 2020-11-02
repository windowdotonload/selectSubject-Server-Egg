'use strict';


const md5 = require('md5');

const Service = require('egg').Service;

class AdminService extends Service {
    async login(username, password) {
        const { app } = this
        let res = await app.mysql.get('admin', { username, password })
        return res
    }

    async getRecord(params) {
        const { ctx } = this
        // const user = await ctx.model.Record.findAll();
        // 分页
        const { pagesize, pagenumber } = params
        // console.log(pagesize, pagenumber)
        const user = await ctx.model.Record.findAndCountAll({
            limit: Number(pagesize),
            offset: (Number(pagenumber) - 1) * Number(pagesize)
        });
        return user
    }

    async addRecord(params) {
        const { app, ctx } = this
        // console.log('this  ', this)
        // console.log('this.ctx   ', this.ctx)
        const { recordname, deadline, studentnumber, teachernumber } = params
        // 使用app.model和ctx.model都可以使用sequelize，但参考官方使用的ctx.model
        const user = await ctx.model.Record.create({ recordname, deadline, studentnumber, teachernumber });
        return user
    }

    async deleteRecord(params) {
        const { app, ctx } = this
        const { id } = params
        const res = await app.mysql.delete('record', { id })
        return res
    }

    async addStuData(params) {
        const { ctx } = this
        // console.log(params)
        const recordto = params.recordto

        params.forEach(async (item) => {
            // console.log(item)
            const {
                用户名: username,
                密码: password,
                姓名: studentname,
                年龄: studentage,
                性别: gender,
                专业: specialized_subject,
                班级: calssname,
                学号: studentnumber,
                政治面貌: political_status,
                民族: ethnic_groups,
                所选老师: select_teacher,
                所选课题: select_subject,
            } = item

            let exit = await ctx.model.Student.findOne({
                where: {
                    studentnumber
                }
            });

            // console.log('exit is  ', exit)
            if (!exit) {
                let res = await ctx.model.Student.create({
                    username: String(username),
                    password: md5(String(password)),
                    studentname,
                    studentage,
                    gender,
                    specialized_subject,
                    calssname,
                    studentnumber,
                    political_status,
                    ethnic_groups,
                    select_teacher,
                    select_subject,
                    recordto
                });
                // console.log(res)
            } else {
                let res = await exit.update({ recordto })
                // console.log('after updata res is this    ', res)
            }
        })
    }

    async showStu(params) {
        const { ctx } = this
        const { pagesize, pagenumber, recordid } = params
        const res = await ctx.model.Student.findAndCountAll({
            limit: Number(pagesize),
            offset: (Number(pagenumber) - 1) * Number(pagesize),
            where: {
                recordto: recordid
            }
        });
        return res
    }

}

module.exports = AdminService;
