
// importing Booking model
var Booking = require('./bookingSchema');
exports.postBooking = function(req, res) {
    var booking = new Booking(req.body);

    if (!req.user.equals(booking.user)) {
        res.sendStatus(401);
    }
    booking.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).json(m);
    });
};
// Create endpoint /api/bookings for GET
exports.getBookings = function(req, res) {
    Booking.find(function(err, bookings) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(bookings);
    });
};
// Create endpoint /api/bookings/:booking_id for GET
exports.getBooking = function(req, res) {
    // Use the Movie model to find a specific movie
    Booking.findById(req.params.booking_id, function(err, booking) {
        if (err) {
            res.status(500).send(err)
            return;
        };

        res.json(booking);
    });
};
// Create endpoint /api/bookings/:booking_id for PUT
exports.putBooking = function(req, res) {
    // Use the Booking model to find a specific bookings and update it
    Booking.findByIdAndUpdate(
        req.params.booking_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, booking) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(booking);
        });
};
// Create endpoint /api/bookings/:booking_id for DELETE
exports.deleteBooking = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Booking.findById(req.params.booking_id, function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        m.remove();
        res.sendStatus(200);
    });
};