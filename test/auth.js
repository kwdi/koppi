let mongoose = require("mongoose");
const User = require("../models/User");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);


let token;


describe('Auth', () => {
    after((done) => {
        User.deleteMany({}, (err) => {
           done();
        });
    });

    // @desc    Test the Logout user / clear cookie
    // @route   GET /auth/logout
    // @acess   Private
    describe('/GET logout', () => {
        it('it should GET logout user', (done) => {
            chai.request(server)
                .get('/auth/logout')
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                done();
                });
        });
    });     
    

    // @desc    Test the Get logged in user error response
    // @route   GET /auth/me
    // @acess   Private
    describe('/GET me', () => {
        it('it should GET logged in user error', (done) => {
            chai.request(server)
                .get('/auth/me')
                .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('error').eql('Not authorized to access this route');
                done();
                });
        });
    });     


    // @desc    Test the /POST register new user
    // @route   POST /auth/register
    // @acess   Public
    describe('/POST register', () => {
        it('it should POST and register an new user', (done) => {
            let regInfo = {
                email : "ab@gmail.com",
                password : "123456"
                }
        chai.request(server)
        .post('/auth/register')
        .send(regInfo)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('token');
            done();
            });
        });
    });

    // @desc    Test the /POST login user
    // @route   POST /auth/login
    // @acess   Private
    describe('/POST login', () => {
        it('it should POST and login user', (done) => {
            let regInfo = {
                email : "ab@gmail.com",
                password : "123456"
                }
        chai.request(server)
        .post('/auth/login')
        .send(regInfo)
        .end((err, res) => {
            token = res.body.token;
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('token');
            done();
            });
        });
    });


    // @desc    Test the Get logged in user 
    // @route   GET /auth/me
    // @acess   Private
    describe('/GET me', () => {
        it('it should GET logged in user info', (done) => {
            chai.request(server)
                .get('/auth/me')
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                done();
                });
        });
    });   

});