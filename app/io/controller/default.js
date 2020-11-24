/*
 * @Descripttion: 
 * @version: 
 * @Author: windowdotonload
 */
/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
    async server() {
        console.log('connection is ok ')
        const { ctx, app } = this;
        const nsp = app.io.of('/');
        const message = ctx.args[0] || {};
        const socket = ctx.socket;
        const client = socket.id;
        console.log('args', ctx.args[0]) //服务端获取客户端传过来的参数
        let res = await ctx.model.Recordmessage.create({
            teacherid: ctx.args[0].teaid,
            studentid: ctx.args[0].stuid,
            msg: ctx.args[0].msg,
            sender: ctx.args[0].sender
        })
        // socket.emit('res', { id: 1, msg: message })、
        //app.io.emit 进行全局广播第一参数为客户段(前端)定义的事件
        app.io.emit("message", this.ctx.args[0]) //进行全局广播

        // await nsp.emit('connect', { age: 12 })
    }
}

module.exports = DefaultController;

