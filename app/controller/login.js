'use strict';

const md5 = require('md5');
const jwt = require('jsonwebtoken');
const auth = require('basic-auth')

const Controller = require('egg').Controller;

class LoginController extends Controller {
    async login() {
        const { ctx, app } = this
        const { userName, passWord } = ctx.request.body
        let res = await ctx.service.admin.login(userName, md5(passWord))
        if (res) {
            // 在登录时如果账号和密码正确启用jwt颁发一个token令牌，返回给客户端，以此在中间件中进行后续接口认证
            let token = jwt.sign({ id: res.id, username: res.username }, 'this is sign', {
                // 设置过期时间
                expiresIn: 60 * 60 * 24
            });
            ctx.body = {
                msg: "success",
                data: res,
                token: token
            }
        } else {
            ctx.body = {
                msg: "账号或密码错误"
            }
        }
    }
}

module.exports = LoginController;
