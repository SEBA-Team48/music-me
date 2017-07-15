
// importing Lesson model
var Lesson = require('./lessonSchema');
exports.postLesson = function(req, res) {
    var lesson = new Lesson(req.body);
    //do not allow user to fake identity. The user who postet the lesson must be the same user that is logged in
    if (!req.user.equals(lesson.user)) {
        res.sendStatus(401);
    }
    lesson.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).json(m);
    });
};
// Create endpoint /api/lessons for GET
exports.getLessons = function(req, res) {
    Lesson.find(function(err, lessons) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(lessons);
    });
};
// Create endpoint /api/lessons/:lesson_id for GET
exports.getLesson = function(req, res) {
    // Use the Movie model to find a specific movie
    Lesson.findById(req.params.lesson_id, function(err, lesson) {
        if (err) {
            res.status(500).send(err)
            return;
        };

        res.json(lesson);
    });
};
// Create endpoint /api/lessons/:lesson_id for PUT
exports.putLesson = function(req, res) {
    // Use the Lesson model to find a specific lesson and update it
    Lesson.findByIdAndUpdate(
        req.params.lesson_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, lesson) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(lesson);
        });
};
// Create endpoint /api/lessons/:lesson_id for DELETE
exports.deleteLesson = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Lesson.findById(req.params.lesson_id, function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        m.remove();
        res.sendStatus(200);
    });
};