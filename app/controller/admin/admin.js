'use strict';

const fs = require("fs")
const xlsx = require('xlsx')
const Controller = require('egg').Controller;

class AdminController extends Controller {
    async getRecord() {
        const { ctx } = this
        // console.log(ctx.query)
        let res = await ctx.service.admin.getRecord(ctx.query)
        // console.log(res)
        if (res) {
            ctx.body = {
                status: 0,
                msg: 'success',
                // 分页
                data: {
                    count: res.count,
                    pageData: res.rows
                }
            }
        } else {
            ctx.body = {
                status: 1,
                msg: 'error'
            }
        }

    }

    async addRecord() {
        const { ctx } = this
        // console.log(ctx.request.body)
        let res = await ctx.service.admin.addRecord(ctx.request.body)
        if (res) {
            ctx.body = {
                status: 0,
                msg: "添加记录成功",
                data: res
            }
        } else {
            ctx.body = {
                status: 1,
                msg: 'error'
            }
        }


    }

    async deleteRecord() {
        const { ctx } = this
        let res = await ctx.service.admin.deleteRecord(ctx.request.body)
        if (res) {
            ctx.body = {
                status: 0,
                msg: '删除记录成功',
                data: res
            }
        } else {
            ctx.body = {
                status: 1,
                msg: 'error'
            }
        }
    }


    static fileUploadStatus = null
    // 处理接受的文件
    async receiveFile() {
        const { ctx } = this
        const file = ctx.request.files[0];
        if (file) {
            const workbook = xlsx.readFile(file.filepath);
            // 直接转化为json
            let data = xlsx.utils.sheet_to_json(workbook.Sheets.Sheet1)
            if (data) {
                // console.log(data)
                await ctx.service.admin.addStuData(data)
                AdminController.fileUploadStatus = {
                    status: 0,
                    msg: "文件上传成功",
                }
                ctx.body = AdminController.fileUploadStatus
                return
            }
            AdminController.fileUploadStatus = {
                status: 1,
                msg: '文件上传失败'
            }
            ctx.body = AdminController.fileUploadStatus
        } else {
            AdminController.fileUploadStatus = {
                status: 1,
                msg: '文件上传失败'
            }
            ctx.body = AdminController.fileUploadStatus
        }
    }
    // 检测文件上传状态
    async checkUploadStatus() {
        const { ctx } = this
        ctx.body = AdminController.fileUploadStatus
    }

    async showStudent() {
        const { ctx } = this
        let res = await ctx.service.admin.showStu(ctx.query)
        if (res) {
            ctx.body = {
                status: 0,
                msg: 'success',
                data: {
                    count: res.count,
                    pageData: res.rows
                }
            }
        } else {
            ctx.body = {
                status: 1,
                msg: 'error',
            }
        }
    }
}

module.exports = AdminController;
