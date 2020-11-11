'use strict';

const md5 = require('md5');
const jwt = require('jsonwebtoken');
const auth = require('basic-auth')

const Controller = require('egg').Controller;

class LoginController extends Controller {
    async login() {
        const { ctx, app } = this
        // console.log(ctx.request.body)
        const { userName, passWord, loginType } = ctx.request.body
        // loginType: 1-教务 2-老师 3-学生
        let res = await ctx.service.admin.login(userName, md5(passWord), loginType)
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
                msg: "账号或密码错误或已失去登录权限"
            }
        }
    }
}

module.exports = LoginController;
