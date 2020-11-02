'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
    async index() {
        const { ctx } = this

        /**
         * 测试联表查询
         */
        // let result = await ctx.model.Student.findAll({
        //     include: {
        //         model: ctx.model.Record
        //     }
        // });

        /**
         * 测试多表连表查询
         */

        // let result = await ctx.model.Record.findOne({
        //     where: {
        //         id: 9
        //     },
        //     include: {
        //         model: ctx.model.Teacher
        //     }
        // })

        let result = await ctx.model.Teacher.findAll({
            include: {
                model: ctx.model.Record,
                where: {
                    id: 9
                }
            }
        })
        console.log(result)
        ctx.body = result
    }
}

module.exports = TestController;
