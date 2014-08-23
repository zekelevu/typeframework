var fs = require('fs');
var should = require('should');
var request = require('request');
var _ = require('lodash');

describe('Test App', function() {
    var app = null;
    var root = 'http://localhost:3000';

    var testBody = function(url, expectedBody, status) {
        status = !!status ? status : 200;
        it('should return "' + expectedBody + '" for ' + url, function(done) {
            request(url, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(status);
                body.should.equal(expectedBody);
                done();
            })
        });
    };

    var testHeader = function(url, headers, status) {
        status = !!status ? status : 200;
        it('should contain headers ' + JSON.stringify(headers) + ' for ' + url, function(done) {
            request({ url: url, followRedirect: false }, function (error, response) {
                should.not.exist(error);
                response.statusCode.should.equal(status);
                response.headers.should.containEql(headers);
                done();
            })
        });
    };

    var testStatus = function(url, status) {
        it('should return ' + status + ' for ' + url, function(done) {
            request(url, function (error, response) {
                should.not.exist(error);
                response.statusCode.should.equal(status);
                done();
            })
        });
    };

    var testFilter = function(action, filter, shouldStopAtFilter) {
        var url = root + '/home/' + action;
        var expectedBody = shouldStopAtFilter ? filter : action;
        var filterQuery = shouldStopAtFilter ? filter : '';
        it('should return "' + expectedBody + '" for action ' + action, function(done) {
            request({ url: url, qs: { filter: filterQuery } }, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(200);
                body.should.equal(expectedBody);
                done();
            })
        });
    };

    before(function(done) {
        var databasePath = __dirname + '/.build/database.json';
        fs.existsSync(databasePath) && fs.unlinkSync(databasePath);
        app = require('./.build/app.js');
        done();
    });

    describe('HomeController', function() {
        testBody(root, 'home');
        testBody(root + '/home/viewWithLayout', 'viewWithLayout');
        testBody(root + '/home/viewWithoutLayout', 'viewWithoutLayout');

        testHeader(root + '/home/redirectToHome', { location: '/' }, 302);
        testHeader(root + '/home/redirectToHomePermanently', { location: '/' }, 301);
        testHeader(root + '/home/fileContent', { 'content-type': 'application/json' });
        testHeader(root + '/home/downloadFile', { 'content-disposition': 'attachment; filename="app.json"' });
        testHeader(root + '/home/customHeader', { 'custom-header': 'test' });

        testBody(root + '/home/any/10', '10:string');
        testBody(root + '/home/anyArray/10', '10:object');
        testBody(root + '/home/anyArray/?id=10&id=11', '10,11:object');
        testBody(root + '/home/string/10', '10:string');
        testBody(root + '/home/stringArray/10', '10:object');
        testBody(root + '/home/stringArray/?id=10&id=11', '10,11:object');
        testBody(root + '/home/number/10', '10:number');
        testBody(root + '/home/numberArray/10', '10:object');
        testBody(root + '/home/numberArray/?id=10&id=11', '10,11:object');
        testBody(root + '/home/boolean', 'false:boolean');
        testBody(root + '/home/boolean/1', 'true:boolean');
        testBody(root + '/home/boolean/0', 'false:boolean');
        testBody(root + '/home/boolean/true', 'true:boolean');
        testBody(root + '/home/boolean/false', 'false:boolean');
        testBody(root + '/home/booleanArray/0', 'false:object');
        testBody(root + '/home/booleanArray/?id=1&id=false', 'true,false:object');

        testStatus(root + '/home/privateFunction', 404);
        testStatus(root + '/home/staticFunction', 404);
        testStatus(root + '/home/noneExistedAction', 404);

        testFilter('actionWithBeforeFilter1', 'filter1');
        testFilter('actionWithBeforeFilter1', 'filter1', true);
        testFilter('actionWithBeforeFilter2', 'filter2');
        testFilter('actionWithBeforeFilter2', 'filter2', true);
        testFilter('actionWithBeforeFilter3', 'filter3');
        testFilter('actionWithBeforeFilter3', 'filter3', true);
        testFilter('actionWithoutBeforeFilters', 'filter1');
        testFilter('actionWithoutBeforeFilters', 'filter2');
        testFilter('actionWithoutBeforeFilters', 'filter3');
        testFilter('actionWithAllBeforeFilters', 'filter1', true);
        testFilter('actionWithAllBeforeFilters', 'filter2', true);
        testFilter('actionWithAllBeforeFilters', 'filter3', true);
    });

    describe('UserController', function() {
        it('should not allow models to share waterline collection attributes', function(done) {
            var User = _.find(app.models, function(model) { return model.name == 'User' }).type;
            var User2 = _.find(app.models, function(model) { return model.name == 'User2' }).type;
            _.toArray(User.attributes).length.should.equal(3);
            User.attributes.should.have.keys('name', 'email', 'age');
            should.not.exist(User2.attributes);
            done();
        });

        it('should return empty array when retrieving all users', function(done) {
            request({ url: root + '/user/', json: true }, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(200);
                body.should.be.an.instanceof(Array);
                body.should.be.empty;
                done();
            })
        });

        it('should return 404 when retrieving non-existing user', function() {
            request({ url: root + '/user/1', method: 'GET', json: true }, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(404);
                body.should.containEql({ error: 'not found'});
            })
        });

        it('should return 404 when updating non-existing user', function(done) {
            request({ url: root + '/user/1', method: 'PUT', json: true }, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(404);
                body.should.containEql({ error: 'not found'});
                done();
            })
        });

        it('should return 404 when deleting non-existing user', function(done) {
            request({ url: root + '/user/1', method: 'DELETE', json: true }, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(404);
                body.should.containEql({ error: 'not found'});
                done();
            })
        });

        it('should return error when creating new user without email', function(done) {
            request({ url: root + '/user', method: 'POST', json: true, form: { name: 'Test' } }, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(200);
                body.should.have.key('ValidationError');
                body['ValidationError'].should.have.key('email');
                done();
            })
        });

        var user1 = { name: 'User1', email: 'user1@test.com' };
        it('should return new user when creating new user (User1)', function(done) {
            request({ url: root + '/user', method: 'POST', json: true, form: user1 }, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(200);
                body.should.containEql({ 'id': 1 });
                body.should.containEql({ 'name': user1.name });
                body.should.containEql({ 'email': user1.email });
                done();
            })
        });

        var user2 = { name: 'User2', email: 'user2@test.com' };
        it('should return new user when creating new user (User2)', function(done) {
            request({ url: root + '/user', method: 'POST', json: true, form: user2 }, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(200);
                body.should.containEql({ 'id': 2 });
                body.should.containEql({ 'name': user2.name });
                body.should.containEql({ 'email': user2.email });
                done();
            })
        });

        it('should return 2 users when retrieving all users', function(done) {
            request({ url: root + '/user/', json: true }, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(200);
                body.should.be.an.instanceof(Array);
                body.length.should.be.exactly(2);
                done();
            })
        });

        it('should return 1 user when searching for user2 email', function(done) {
            request({ url: root + '/user/', qs: { email: user2.email }, json: true }, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(200);
                body.should.be.an.instanceof(Array);
                body.length.should.be.exactly(1);
                body[0].should.containEql({ 'id': 2 });
                body[0].should.containEql({ 'name': user2.name });
                body[0].should.containEql({ 'email': user2.email });
                done();
            })
        });

        user1.email = 'user1-new@test.com';
        it('should return new user data when updating user1 email', function(done) {
            request({ url: root + '/user/1', qs: { email: user1.email }, method: 'PUT', json: true }, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(200);
                body.should.containEql({ 'id': 1 });
                body.should.containEql({ 'name': user1.name });
                body.should.containEql({ 'email': user1.email });
                done();
            })
        });

        it('should return new user data when retrieving user1', function(done) {
            request({ url: root + '/user/1', json: true }, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(200);
                body.should.containEql({ 'id': 1 });
                body.should.containEql({ 'name': user1.name });
                body.should.containEql({ 'email': user1.email });
                done();
            })
        });

        it('should return ok when deleting user1', function(done) {
            request({ url: root + '/user/1', method: 'DELETE', json: true }, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(200);
                body.should.containEql({ 'id': 1 });
                done();
            })
        });

        it('should return user2 when retrieving all users', function(done) {
            request({ url: root + '/user/', json: true }, function (error, response, body) {
                should.not.exist(error);
                response.statusCode.should.equal(200);
                body.should.be.an.instanceof(Array);
                body.length.should.be.exactly(1);
                body[0].should.containEql({ 'id': 2 });
                body[0].should.containEql({ 'name': user2.name });
                body[0].should.containEql({ 'email': user2.email });
                done();
            })
        });
    });
});