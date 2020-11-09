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
        let stu = await ctx.model.Student.findByPk(id)
        console.log(stu)
    }
}

module.exports = StudentService;
