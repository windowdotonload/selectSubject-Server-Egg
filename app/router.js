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
  router.post('/receiveFile', controller.admin.admin.receiveFile)
  router.get('/checkUploadStatus', controller.admin.admin.checkUploadStatus)
  router.get('/showStudent', controller.admin.admin.showStudent)
  router.get('/addRecordId', controller.admin.admin.addRecordId)
  router.post('/addTeaToRecord', controller.admin.admin.addTeaToRec)
  router.post('/addTacher', controller.teacher.teacher.addTacher)
  router.get('/showTeacher', controller.teacher.teacher.showTeacher)
  router.post('/editTeacher', controller.teacher.teacher.editTeacher)
  router.get('/showSelectTeacher', controller.admin.admin.showSelectTeacher)
};
