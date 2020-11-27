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

    async checkOtherRecordFinish() {
        const { ctx } = this
        let res = await ctx.service.admin.checkOtherRecordFinish()

        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: 'error'
            }
        }

    }

    // 标记学生对应的记录信息的id
    static recordid = 0
    async addRecordId() {
        const { ctx } = this
        AdminController.recordid = ctx.query.id
        // console.log('---------')
        // console.log(AdminController.recordid)
        // console.log('---------')
        ctx.body = {
            msg: "添加id成功",
            data: AdminController.recordid
        }

    }


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
                await ctx.service.admin.addStuData(data, AdminController.recordid)
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


    static fileUploadStatus = null
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

    async addTeaToRec() {
        const { ctx } = this
        // console.log(ctx.request.body)
        let res = await ctx.service.teatorec.addTTR(ctx.request.body)
        // console.log('-----------')
        // console.log('res is ', res)
        // console.log('-----------')
        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: "error"
            }
        }
    }

    async adminShowTeacherTitle() {
        const { ctx } = this
        let res = await ctx.service.admin.adminShowTeacherTitle(ctx.query)

        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: "error"
            }
        }
    }

    async adminClickStuTitleInfo() {
        const { ctx } = this
        let res = await ctx.service.admin.adminClickStuTitleInfo(ctx.query)

        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: "error"
            }
        }
    }

    async showSelectTeacher() {
        const { ctx } = this
        // console.log(ctx.query)
        let res = await ctx.service.teacher.showTeacherByTTR(ctx.query)
        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: 'error'
            }
        }
    }

    async deleteSelectTeacher() {
        const { ctx } = this
        let res = await ctx.service.teatorec.deleteSelectTeacher(ctx.request.body)
        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: 'error'
            }
        }

    }

    async submitEditStudent() {
        const { ctx } = this
        let res = await ctx.service.admin.editStu(ctx.request.body)
        if (res) {
            ctx.body = {
                msg: 'success'
            }
        } else {
            ctx.body = {
                msg: 'error'
            }
        }
    }

    async deleteStudent() {
        const { ctx } = this
        let res = await ctx.service.admin.deleteStu(ctx.request.body)
        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: 'error'
            }
        }
    }

    async deleteTeacher() {
        const { ctx } = this
        let res = await ctx.service.teacher.deleteTeacher(ctx.request.body)
        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: 'error'
            }
        }
    }

    async editRecord() {
        const { ctx } = this
        let res = await ctx.service.admin.editRecord(ctx.request.body)
        if (res) {
            ctx.body = {
                msg: 'success',
                data: res
            }
        } else {
            ctx.body = {
                msg: 'error'
            }
        }
    }

    async overRecord() {
        const { ctx } = this
        let res = await ctx.service.admin.overRecord(ctx.request.body)
        if (res) {
            ctx.body = {
                msg: "success",
                data: res
            }
        } else {
            ctx.body = {
                msg: "error"
            }
        }
    }

    async checkUsernameExist() {
        const { ctx } = this

        let res = await ctx.service.admin.checkUsernameExist(ctx.query)


        if (res) {
            ctx.body = {
                msg: "success",
                data: res
            }
        } else {
            ctx.body = {
                msg: "error"
            }
        }

    }
}

module.exports = AdminController;
