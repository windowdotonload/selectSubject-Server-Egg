'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
    async index() {
        /**
         * 测试联表查询
         */
        const { ctx } = this
        let result = await ctx.model.Student.findAll({
            include: {
                model: ctx.model.Record
            }
        });
        ctx.body = result
    }
}

module.exports = TestController;
