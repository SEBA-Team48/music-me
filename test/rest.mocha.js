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
                name: "test111",
                year: 2015,
                synopsis: "test test bla bla",
                user: testuser._id
            };
            //create the test movie
            request(app)
                .post("/api/lessons")
                .send({
                    name: testlesson.name,
                    year: testlesson.year,
                    synopsis: testlesson.synopsis,
                    user: testlesson.user
                })
                .set("Authorization", "JWT " + testuser.token)
                .expect('Content-Type', /json/)
                .expect(201)
                .expect(function (res) {
                    var created = res.body;
                    assert(testlesson.name == created.name);
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

        it('should update one movie', function (done) {
            var testmovieCopy = JSON.parse(JSON.stringify(testlesson)); //copy testmovie object w/o reference
            testmovieCopy.title = "new title";
            request(app)
                .put("/api/movies/" + testlesson._id)
                .send(testmovieCopy)
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

    describe("Deny unauthenticated and unauthorized access", function () {
        var testlesson = {
            name: "123"
        };

        before(function () {
            //create test movie, maybe another test user to check if authorization works properly
        });

        it("should deny unauthenticated lesson creating", function (done) {
            request(app)
                .post("/api/lessons")
                .send(testlesson)
                .expect(401)
                .end(done);

        })
    });
});


function parseToken(token) {
    return JSON.parse(new Buffer(token.split('.')[1], 'base64').toString('ascii'));
}