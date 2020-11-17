/*
 * @Descripttion: 
 * @version: 
 * @Author: windowdotonload
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/', controller.home.index);
  router.get('/test', controller.test.index);

  router.post('/login', controller.login.login)
  router.post('/addRecord', controller.admin.admin.addRecord)
  router.get('/getRecord', controller.admin.admin.getRecord)
  router.post('/deleteRecord', controller.admin.admin.deleteRecord)
  router.post('/overRecord', controller.admin.admin.overRecord)
  router.post('/receiveFile', controller.admin.admin.receiveFile)
  router.get('/checkUploadStatus', controller.admin.admin.checkUploadStatus)
  router.get('/showStudent', controller.admin.admin.showStudent)
  router.get('/addRecordId', controller.admin.admin.addRecordId)
  router.post('/addTeaToRecord', controller.admin.admin.addTeaToRec)
  router.post('/addTacher', controller.teacher.teacher.addTacher)
  router.get('/showTeacher', controller.teacher.teacher.showTeacher)
  router.post('/editTeacher', controller.teacher.teacher.editTeacher)
  router.get('/showSelectTeacher', controller.admin.admin.showSelectTeacher)
  router.post('/deleteSelectTeacher', controller.admin.admin.deleteSelectTeacher)
  router.post('/submitEditStudent', controller.admin.admin.submitEditStudent)
  router.post('/deleteStudent', controller.admin.admin.deleteStudent)
  router.post('/deleteTeacher', controller.admin.admin.deleteTeacher)
  router.post('/editRecord', controller.admin.admin.editRecord)
  router.post('/addTitleInfo', controller.teacher.teacher.addTitleInfo)
  router.get('/showTitle', controller.teacher.teacher.showTitle)
  router.post('/editTitle', controller.teacher.teacher.editTitle)
  router.post('/deleteTitle', controller.teacher.teacher.deleteTitle)
  router.get('/searchSimilarTitleName', controller.teacher.teacher.searchSimilarTitleName)
  router.get('/showAllStudentCanSelectTeacher', controller.student.student.showAllStudentCanSelectTeacher)
  router.get('/showSelectTeacherTitle', controller.student.student.showSelectTeacherTitle)
  router.post('/saveTeacherId', controller.student.student.saveTeacherId)
  router.get("/createdShowSelectTeacherId", controller.student.student.createdShowSelectTeacherId)
  router.get('/stuGetSelectTeacherName', controller.student.student.stuGetSelectTeacherName)
  router.post('/confirmSelectTeacher', controller.student.student.confirmSelectTeacher)
  router.get('/getStuInfo', controller.student.student.getStuInfo)
  router.post('/confirmStudentSelTitle', controller.student.student.confirmStudentSelTitle)
  router.get('/getStudentSelTitleInfo', controller.student.student.getStudentSelTitleInfo)
  router.post('/changeTitleStatus', controller.student.student.changeTitleStatus)
  router.post('/studentCustomTitle', controller.student.student.studentCustomTitle)
  router.get('/teaGetSelectStuInfo', controller.teacher.teacher.teaGetSelectStuInfo)
  router.post('/passStudentSelTitle', controller.teacher.teacher.passStudentSelTitle)
  router.post('/refuseStudentSelTitle', controller.teacher.teacher.refuseStudentSelTitle)
  router.post("/stuChangeTitle", controller.student.student.stuChangeTitle)
  router.post('/teacherSubmitScore', controller.teacher.teacher.teacherSubmitScore)
  router.post('/recordChangeTitle', controller.student.student.recordChangeTitle)
  router.get('/teacherGetApplyHistory', controller.teacher.teacher.teacherGetApplyHistory)
};
