import restify = require('restify');
import chai = require('chai');
import {Client} from 'restify';
let client: Client;
let expect = chai.expect;

describe('The shorty api', ()=> {

    beforeEach(()=> {
        client = restify.createJsonClient(`http://localhost:3000`); // TODO: get port from config
    });

    it('shortens an url', (done)=> {
        const url = 'http://test.url';
        client.post('/shorten', {url}, (err, req, res: restify.Response, data)=> {
            expect(res.statusCode).to.equal(201);
            expect(res.headers['content-type']).to.equal('application/json');
            expect(data).to.include.keys('shortcode');
            expect(data.shortcode).to.match(/^[0-9a-zA-Z_]{6}$/);

            client.get(`/${data.shortcode}`, (err, req, res: restify.Response, data)=> {
                expect(res.statusCode).to.equal(302);
                expect(res.headers['location']).to.equal(url);
                done();
            });
        });
    });

    it('returns 404 on a non-existing shortcode', (done)=>{
        client.get('/shortcodethatdoesnotexist', (err, req, res: restify.Response, data)=>{
            expect(res.statusCode).to.equal(404);
            done();
        });
    });

    describe('when providing a desired code', ()=> {
        let doShortenRequest = function (body, callback) {
            client.post('/shorten', body, callback);
        };

        it('uses a valid code of minimal length', (done)=> {
            let shortcode = 'zoef';
            doShortenRequest({'url': 'http://test.url', shortcode}, (err, req, res: restify.Response, data)=> {
                expect(res.statusCode).to.equal(201);
                expect(data.shortcode).to.equal(shortcode);
                done();
            });
        });

        it('uses a valid code of extended length', (done)=> {
            let shortcode = '42istheanswer';
            doShortenRequest({'url': 'http://test.url', shortcode}, (err, req, res: restify.Response, data)=> {
                expect(res.statusCode).to.equal(201);
                expect(data.shortcode).to.equal(shortcode);
                done();
            });
        });

        it('rejects an invalid code', (done)=> {
            let shortcode = '123';
            client.post('/shorten', {
                'url': 'http://test.url',
                shortcode
            }, (err, req, res: restify.Response, data)=> {
                expect(res.statusCode).to.equal(422);
                expect(data.message).to.equal('The provided shortcode is invalid, it should match "/^[0-9a-zA-Z_]{4,}$/"');
                done();
            });
        });

        it('rejects an already existing code', (done)=> {
            let shortcode = 'usemeonce';
            client.post('/shorten', {'url': 'http://test.url', shortcode}, ()=> {
                client.post('/shorten', {
                    'url': 'http://test2.url',
                    shortcode
                }, (err, req, res: restify.Response, data)=> {
                    expect(res.statusCode).to.equal(409);
                    expect(data.message).to.equal('The desired shortcode is already in use.');
                    done();
                });
            });
        });
    });

    xdescribe('when asked for statistics', ()=> {
        const url = 'http://test.url';
        let shortcode: string;

        it('provides the data on a new shortcode', (done)=> {
            client.post('/shorten', {url}, (err, req, res: restify.Response, data)=> {
                shortcode = data.shortcode;

                client.get(`/${shortcode}/statistics`, (err, req, res, data)=>{
                    expect(res.statusCode).to.equal(200);
                    expect(data)
                })
            });
        });
    });

});