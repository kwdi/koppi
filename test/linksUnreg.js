let mongoose = require("mongoose");
const Link = require("../models/Link");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);


let urlID;


describe('Links Unregistered', () => {
    after((done) => {
        Link.deleteMany({}, (err) => {
           done();
        });
    });

    // @desc    Test the /GET route
    // @route   GET /
    // @acess   Public
    describe('/GET link', () => {
        it('it should GET one link', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                res.should.have.status(200);
                done();
                });
        });
    });     
    



    // @desc    Test the /POST route
    // @route   POST /unreg
    // @acess   Public
    describe('/POST link', () => {
        it('it should POST a link', (done) => {
            let link = {
                url: "pcriot.org"
                }
            chai.request(server)
                .post('/unreg')
                .send(link)
                .end((err, res) => {
                    urlID=res.body.data.address;
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.should.have.property('data');  
                    res.body.should.have.property('result');                
                done();
                });
        });

    });

    // @desc    Test the /POST route error response
    // @route   POST /unreg
    // @acess   Public
    describe('/POST link', () => {
        it('it should not POST a link without url field', (done) => {
            let link = {
                }
        chai.request(server)
        .post('/unreg')
        .send(link)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('error').eql('Bad Request');
            done();
            });
        });
    });

    // @desc    Test the /GET route 
    // @route   GET /:id
    // @acess   Public
    describe('/GET:id link', () => {
        it('it should GET a link by the given id', (done) => {
            chai.request(server)
                .get('/' + urlID)
                .end((err, res) => {
                res.should.have.status(200);
                done();
                });
                });
            });
    
    // @desc    Test the /GET route error response
    // @route   GET /:id
    // @acess   Public
    describe('/GET:id link', () => {
        it('it should return error on GET a link by not existing id', (done) => {
            chai.request(server)
                .get('/wrong')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(false);
                    res.body.should.have.property('error').eql('Url not found with name of wrong');
                done();
                
                });
                });
            });    

});