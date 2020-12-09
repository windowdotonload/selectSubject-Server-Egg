<!--
 * @Descripttion: 
 * @version: 
 * @Author: windowdotonload
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: windowdotonload
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: windowdotonload
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: windowdotonload
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: windowdotonload
-->
# egg_server


### 这是课程选题系统的后端实现，采用的是阿里的egg框架🥚  


做一点简单的记录，供日后参考。  

* 登录是采用的JWT，当前端请求接口的时候，在中间键中根据前端传过来的token进行一个认证，如果认证通过则正常调用接口，否则返回错误信息。  

* 数据库采用的mysql，使用sequelize进行数据库操作。

* 使用xlsx插件处理前端从excel表格中导入的数据信息。

* 因为涉及到了模糊搜索的需求，所以使用了elasticsearch全文搜索引擎。

* 使用egg-socket做了一个简单通信

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