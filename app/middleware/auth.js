const jwt = require('jsonwebtoken');
const auth = require('basic-auth')

// 此中间件使用jwt进行权限认证
module.exports = options => {
    return async function author(ctx, next) {
        const { request } = ctx
        if (!request.header.authorization) {
            ctx.body = {
                msg: '没有携带对应的token'
            }
            return
        }
        try {
            //校验时要有在颁发时的签名，此处是' this is sign '
            let decoded = jwt.verify(request.header.authorization, 'this is sign')
            if (decoded) {
                await next()
            } else {
                ctx.body = {
                    msg: '无效的token'
                }
            }
        } catch (err) {
            ctx.body = {
                msg: err
            }
        }
    };
};