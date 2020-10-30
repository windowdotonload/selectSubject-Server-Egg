'use strict';

const md5 = require('md5');
const path = require("path")
const fs = require("fs")
const xlsx = require('xlsx')
const Controller = require('egg').Controller;


class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    //********************** */
    // 测试处理上传的xlsx文件
    //********************** */
    // mode:file
    // const file = ctx.request.files[0];
    // console.log('--------')
    // console.log(file)
    // console.log('-------')
    // const workbook = xlsx.readFile(file.filepath);
    // console.log('workbook', workbook)
    // console.log('A1 = ', workbook.Sheets.Sheet1.A1)
    // console.log('B1 = ', workbook.Sheets.Sheet1.B1)
    // console.log('A2 = ', workbook.Sheets.Sheet1.A2)
    // console.log('B2 = ', workbook.Sheets.Sheet1.B2)
    // 直接转化为json
    // let data = xlsx.utils.sheet_to_json(workbook.Sheets.Sheet1)
    // console.log('worksheet_to_json', xlsx.utils.sheet_to_json(workbook.Sheets.Sheet1))
    // console.log(data)
    // console.log(data[0]["姓名"])

    //********************** */
    // 测试读取文件流 使用流那么config.default.js中config.multipart 的mode就不能设置为file
    //********************** */
    // const stream = await ctx.getFileStream();
    // console.log('stream', stream)


    /**
     * 
     * 测试连表查询
     */
    let result = await ctx.model.Student.findAll({
      include: {
        model: ctx.model.Record
      }
    });
    ctx.body = result
    // ctx.body = ctx.request.files
    // const workbook = xlsx.readFile(file.filepath)
    // console.log(workbook)
    // console.log('home_controller')
    // const { ctx } = this
    // const { app } = ctx
    // console.log(app)
    // console.log('-------')
    // console.log(ctx.app)
    // console.log('-------')
    // console.log(app.ctx)
    // 使用egg-mysql
    // let res = await app.mysql.select('admin')
    // 初始化插入一条数据
    // const result = await this.app.mysql.insert('admin', { username: 'admin', password: md5('123456') });
    // const user = await ctx.model.Test.create({ username: "admin", password: md5('123456') });
    // console.log(md5(123456))
    // console.log(result)
    // ctx.body = res;

  }

  async login() {
    const { ctx, app } = this;

    // 使用egg-sequelize
    // let res = await ctx.model.Test.findAll()
    // const res = await ctx.model.Test.findAll({ where: { username: 'adminSecond' } })


    // this.ctx.body = res
  }
}

module.exports = HomeController;
