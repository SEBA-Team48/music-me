/**
 * Created by peresthahadji on 10.06.17.
 */
module.exports = teacherRoutes;


function teacherRoutes(passport) {

    var teacherController = require('./teacherController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(teacherController.postTeacher)
        .get(teacherController.getTeachers);

    router.route('/:lesson_id')
        .get(teacherController.getTeacher)
        .put(teacherController.putTeacher)
        .delete(teacherController.deleteTeacher);

    return router;
}