/**
 * Created by peresthahadji on 10.06.17.
 */
module.exports = bookingRoutes;


function bookingRoutes(passport) {

    var bookingController = require('./bookingController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(bookingController.postBooking)
        .get(bookingController.getBookings);

    router.route('/:booking_id')
        .get(bookingController.getBooking)
        .put(bookingController.putBooking)
        .delete(bookingController.deleteBooking);

    return router;
}