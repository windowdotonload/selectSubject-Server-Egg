'use strict';

const Service = require('egg').Service;

class TeatorecService extends Service {
    // 关系表添加教师和每年的记录信息的数据
    async addTTR(params) {
        const { ctx } = this
        const { recordid, teacherid } = ctx.request.body
        let realAddTeacherId = []
        // console.log(recordid, teacherid)
        // Promise.all中传入的参数是一个数组
        console.log(realAddTeacherId)
        return Promise.all(
            teacherid.map(async (item) => {
                let exist = await ctx.model.TeaTOrec.findOne({
                    where: {
                        recordid,
                        teacherid: item
                    }
                })
                // console.log('exist is ', exist)
                // console.log('!exist is ', !exist)
                if (!exist) {
                    let res = await ctx.model.TeaTOrec.create({ recordid, teacherid: item })
                    let tea = await ctx.model.Teacher.findByPk(item)
                    await tea.update({
                        loginauth: 1
                    })
                    // console.log(res)
                    return res
                }
            })
        )
    }

    async deleteSelectTeacher(params) {
        const { ctx } = this
        // console.log(params)
        const { teacherid, recordid } = params
        let rec = await ctx.model.TeaTOrec.findOne({
            where: {
                teacherid,
                recordid
            }
        })
        let res = await rec.destroy()
        return res
    }
}

module.exports = TeatorecService;
