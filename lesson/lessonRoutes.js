/**
 * Created by peresthahadji on 10.06.17.
 */
module.exports = lessonRoutes;


function lessonRoutes(passport) {

    var lessonController = require('./lessonController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(lessonController.postLesson)
        .get(lessonController.getLessons);

    router.route('/:lesson_id')
        .get(lessonController.getLesson)
        .put(lessonController.putLesson)
        .delete(lessonController.deleteLesson);

    return router;
}