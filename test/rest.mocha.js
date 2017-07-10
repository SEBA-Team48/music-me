/**
 * Created by peresthahadji on 10.06.17.
 */
var assert = require('assert');
var request = require('supertest');
var app = require('../app');


describe('REST API test', function () {

    var testuser;

    before(function (done) {

        testuser = {
            //to be received
            _id: undefined,
            //you should make sure this user does not exist yet and eventually choose a different username
            username: "testhans",
            password: "jaskdjasdjkas",
            //to be received
            token: undefined
        };

        //register testuser
        request(app)
            .post("/signup")
            .send({
                username: testuser.username,
                password: testuser.password
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(function (res) {
                assert(res.body.token);

                var tokendata = parseToken(res.body.token);
                assert(tokendata.user.username == testuser.username);

                testuser._id = tokendata.user._id;
                testuser.token = res.body.token;

            })
            .end(done);
    });

    after(function (done) {
        //delete testuser
        request(app)
            .post("/unregister")
            .set("Authorization", "JWT " + testuser.token)
            .expect(200, done);
    });

    it("should login successfully", function (done) {
        request(app)
            .post("/login")
            .send({
                username: testuser.username,
                password: testuser.password
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({token: testuser.token}, done)

    });


    describe('Lesson lifecycle', function () {

        var testlesson;

        before(function (done) {

            testlesson = {
                _id: undefined,
                title: "test111",
                year: 2015,
                synopsis: "test test bla bla",
                user: testuser._id
            };
            //create the test movie
            request(app)
                .post("/api/lessons")
                .send({
                    title: testlesson.title,
                    year: testlesson.year,
                    synopsis: testlesson.synopsis,
                    user: testlesson.user
                })
                .set("Authorization", "JWT " + testuser.token)
                .expect('Content-Type', /json/)
                .expect(201)
                .expect(function (res) {
                    var created = res.body;
                    assert(testlesson.title == created.title);
                    assert(testlesson.year == created.year);
                    assert(testlesson.synopsis == created.synopsis);
                    assert(testlesson.user == created.user);

                    testlesson = created;

                })
                .end(done);

        });

        after(function (done) {
            request(app)
                .delete("/api/lessons/" + testlesson._id)
                .set("Authorization", "JWT " + testuser.token)
                .expect(200, done)
        });

        it('should list all lessons', function (done) {

            request(app)
                .get("/api/lessons")
                //no authorization
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    assert(res.body.length > 1);
                })
                .end(done);

        });

        it('should show one lesson', function (done) {
            request(app)
                .get("/api/lessons/" + testlesson._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    assert.deepEqual(testlesson, res.body);
                })
                .end(done);


        });

        it('should update one lesson', function (done) {
            var testlessonCopy = JSON.parse(JSON.stringify(testlesson)); //copy testlesson object w/o reference
            testlessonCopy.title = "new title";
            request(app)
                .put("/api/lessons/" + testlesson._id)
                .send(testlessonCopy)
                .set("Authorization", "JWT " + testuser.token)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    assert.deepEqual(testlessonCopy, res.body);
                    testlesson = testlessonCopy;
                })
                .end(done);


        });


    });

    describe('Teacher lifecycle', function () {

        var testteacher;

        before(function (done) {

            testteacher = {
                _id: undefined,
                teacherName: "test111",
                age: 20,
                email: "test@gmx.de",
                lessons: "test test bla bla",
                rating: 3,
                user: testuser._id
            };
            //create the test teacher
            request(app)
                .post("/api/teachers")
                .send({
                    teacherName: testteacher.teacherName,
                    age: testteacher.age,
                    email: testteacher.email,
                    lessons: testteacher.lessons,
                    rating: testteacher.rating,
                    user: testteacher.user
                })
                .set("Authorization", "JWT " + testuser.token)
                .expect('Content-Type', /json/)
                .expect(201)
                .expect(function (res) {
                    var created = res.body;
                    assert(testteacher.teacherName == created.teacherName);
                    assert(testteacher.age == created.age);
                    assert(testteacher.email == created.email);
                    assert(testteacher.lessons == created.lessons);
                    assert(testteacher.rating == created.rating);
                    assert(testteacher.user == created.user);

                    testteacher = created;

                })
                .end(done);

        });

        after(function (done) {
            request(app)
                .delete("/api/teachers/" + testteacher._id)
                .set("Authorization", "JWT " + testuser.token)
                .expect(200, done)
        });

        it('should list all teachers', function (done) {

            request(app)
                .get("/api/teachers")
                //no authorization
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    assert(res.body.length > 1);
                })
                .end(done);

        });

        it('should show one teacher', function (done) {
            request(app)
                .get("/api/teachers/" + testteacher._id)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    assert.deepEqual(testteacher, res.body);
                })
                .end(done);


        });

        it('should update one teacher', function (done) {
            var testteacherCopy = JSON.parse(JSON.stringify(testteacher)); //copy testteacher object w/o reference
            testteacherCopy.teacherName = "new name";
            request(app)
                .put("/api/teachers/" + testteacher._id)
                .send(testteacherCopy)
                .set("Authorization", "JWT " + testuser.token)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    assert.deepEqual(testteacherCopy, res.body);
                    testteacher = testteacherCopy;
                })
                .end(done);


        });


    });

    describe("Deny unauthenticated and unauthorized access", function () {
        var testteacher = {
            teacherName: "123"
        };

        before(function () {
            //create test teacher, maybe another test user to check if authorization works properly
        });

        it("should deny unauthenticated teacher creating", function (done) {
            request(app)
                .post("/api/teachers")
                .send(testteacher)
                .expect(401)
                .end(done);

        })
    });
});


function parseToken(token) {
    return JSON.parse(new Buffer(token.split('.')[1], 'base64').toString('ascii'));
}