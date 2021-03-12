let mongoose = require("mongoose");
const Link = require("../models/Link");
const User = require("../models/User");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);


let urlID;
let token;


describe('Links Registered', () => {
    after((done) => {
        Link.deleteMany({}, (err) => {
           done();
        });
    });
    after((done) => {
        User.deleteMany({}, (err) => {
           done();
        });
    });


    // @desc    Test the /POST register new user
    // @route   POST /auth/register
    // @acess   Public
    describe('/POST register', () => {
        it('it should POST and register an new user', (done) => {
            let regInfo = {
                email : "user@gmail.com",
                password : "123456"
                }
        chai.request(server)
        .post('/auth/register')
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


    // @desc    Test the /POST route
    // @route   POST /
    // @acess   Private
    describe('/POST link', () => {
        it('it should POST a link', (done) => {
            let link = {
                url: "pcriot.org"
                }
            chai.request(server)
                .post('/')
                .send(link)
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    urlID=res.body.data.shortAddress;
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');  
                    res.body.should.have.property('result');                
                done();
                });
        });

    });

    // @desc    Test the /PUT route
    // @route   PUT /
    // @acess   Private
    describe('/PUT:id link', () => {
        it('it should PUT update a link', (done) => {
            let link = {
                url: "doodle.org"
                }
            chai.request(server)
                .put('/' + urlID)
                .send(link)
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('url').eql('doodle.org');  
                    //res.body.should.have.property('result');                
                done();
                });
        });

    });


     // @desc   Test the /DELETE route
    // @route   DELET /
    // @acess   Private
    describe('/DELETE:id link', () => {
        it('it should DELETE a link', (done) => {
            chai.request(server)
                .delete('/' + urlID)
                .send(link)
                .set({ Authorization: `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');             
                done();
                });
        });

    });

});