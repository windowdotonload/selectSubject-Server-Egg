'use strict';

const Service = require('egg').Service;

class TeatorecService extends Service {
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
                    console.log(res)
                    return res
                }
            })
        )
    }

}

module.exports = TeatorecService;
