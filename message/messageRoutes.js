
module.exports = messageRoutes;


function messageRoutes(passport) {

    var messageController = require('./messageController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(messageController.postMessage)
        .get(messageController.getMessages);

    router.route('/:message_id')
        .get(messageController.getMessage)
        .put(messageController.putMessage)
        .delete(messageController.deleteMessage);

    return router;
}