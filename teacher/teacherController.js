
// importing Teacher model
var Teacher = require('./teacherSchema');
exports.postTeacher = function(req, res) {
    var teacher = new Teacher(req.body);
    //do not allow user to fake identity. The user who postet the teacher must be the same user that is logged in
    if (!req.user.equals(teacher.user)) {
        res.sendStatus(401);
    }
    teacher.save(function(err, m) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).json(m);
    });
};
// Create endpoint /api/teachers for GET
exports.getTeachers = function(req, res) {
    Teacher.find(function(err, teachers) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(teachers);
    });
};
// Create endpoint /api/teachers/:teacher_id for GET
exports.getTeacher = function(req, res) {
    // Use the Lesson model to find a specific movie
    Teacher.findById(req.params.teacher_id, function(err, teacher) {
        if (err) {
            res.status(500).send(err)
            return;
        };

        res.json(teacher);
    });
};
// Create endpoint /api/teachers/:teacher_id for PUT
exports.putTeacher = function(req, res) {
    // Use the Teacher model to find a specific teacher and update it
    Teacher.findByIdAndUpdate(
        req.params.teacher_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, teacher) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(teacher);
        });
};
// Create endpoint /api/teachers/:teacher_id for DELETE
exports.deleteTeacher = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Teacher.findById(req.params.teacher_id, function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        m.remove();
        res.sendStatus(200);
    });
};