
// importing Message model
var Message = require('./messageSchema');
exports.postMessage = function(req, res) {
    var message = new Message(req.body);
    //do not allow user to fake identity. The user who posted the message must be the same user that is logged in
    if (!req.user.equals(message.sender)) {
        res.sendStatus(401);
    }
    message.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).json(m);
    });
};
// Create endpoint /api/messages for GET
exports.getMessages = function(req, res) {
    Message.find(function(err, messages) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(messages);
    });
};
// Create endpoint /api/messages/:message_id for GET
exports.getMessage = function(req, res) {
    // Use the Message model to find a specific movie
    Message.findById(req.params.message_id, function(err, message) {
        if (err) {
            res.status(500).send(err)
            return;
        };

        res.json(message);
    });
};


// Create endpoint /api/messages/:message_id for PUT
exports.putMessage = function(req, res) {
    // Use the Message model to find a specific message and update it
    Message.findByIdAndUpdate(
        req.params.message_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, message) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(message);
        });
};


// Create endpoint /api/messages/:message_id for DELETE
exports.deleteMessage = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Message.findById(req.params.message_id, function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        m.remove();
        res.sendStatus(200);
    });
};