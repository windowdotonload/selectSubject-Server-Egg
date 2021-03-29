/*
 * @Descripttion: 
 * @version: 
 * @Author: windowdotonload
 */
'use strict';

const Controller = require('egg').Controller;
const Excel = require('xlsx')
class TestController extends Controller {
    async index() {
        const { ctx } = this

        /**
         * 测试联表查询
         */
        // let result = await ctx.model.Student.findAll({
        //     include: {
        //         model: ctx.model.Record
        //     }
        // });

        /**
         * 测试多表连表查询
         */

        // let result = await ctx.model.Record.findOne({
        //     where: {
        //         id: 9
        //     },
        //     include: {
        //         model: ctx.model.Teacher
        //     }
        // })

        // let result = await ctx.model.Teacher.findAll({
        //     include: {
        //         model: ctx.model.Record,
        //         where: {
        //             id: 9
        //         }
        //     }
        // })
        let result = await ctx.model.Student.findAll(
            {
                attributes: ['studentnumber', 'studentname', 'studentage', 'gender', 'specialized_subject', 'calssname', 'political_status', 'ethnic_groups', 'select_subject', 'score']
            }
        )
        let stu = result.map(item => {
            return item.dataValues
        });
        let fields = ['studentnumber', 'studentname', 'studentage', 'gender', 'specialized_subject', 'calssname', 'political_status', 'ethnic_groups', 'select_subject', 'score']
        const titles = {
            'studentnumber': '学号',
            'studentname': '姓名',
            'studentage': '年龄',
            'gender': '性别',
            'specialized_subject': '专业',
            'calssname': '班级',
            'political_status': '政治面貌',
            'ethnic_groups': '民族',
            'select_subject': '所选课题',
            'score': '得分'
        }
        // let ws = Excel.utils.json_to_sheet(stu)
        // let wb = Excel.utils.book_new()
        // Excel.utils.book_append_sheet(wb, ws, 'users用户信息')
        const ws = Excel.utils.json_to_sheet(
            stu,
            {
                header: fields
            }
        )
        const range = Excel.utils.decode_range(ws['!ref'])
        for (let c = range.s.c; c <= range.e.c; c++) {
            const header = Excel.utils.encode_col(c) + '1'
            ws[header].v = titles[ws[header].v]
        }

        let wb = Excel.utils.book_new()
        Excel.utils.book_append_sheet(wb, ws, 'users用户信息')

        let buf = Excel.write(wb, {
            type: 'buffer',
            bookType: 'xlsx'
        })
        let filename = 'users.xlsx'
        ctx.set('Content-disposition', 'attachment; filename=' + filename);
        ctx.type = "xlsx"
        ctx.body = buf
        return buf
        // ctx.body = teacher
    }
}

module.exports = TestController;
