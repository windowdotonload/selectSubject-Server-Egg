<!--
 * @Descripttion: 
 * @version: 
 * @Author: windowdotonload
-->
# egg_server


### 这是课程选题系统的后端实现，采用的是阿里的egg框架🥚

<br>
做一点简单的记录，供日后参考

登录的话是采用的JWT，当前端请求接口的时候，在中间键中根据前端传过来的token进行一个认证，如果认证通过则正常调用接口，否则返回错误信息。 

数据库的采用的是mysql，使用sequelize  

因为涉及到了一个模糊搜索的需求，所以也用了elasticsearch全文搜索引擎。

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org