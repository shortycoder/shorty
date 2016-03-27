import restify = require('restify');
import chai = require('chai');
import {Client} from 'restify';
let client: Client;
let expect = chai.expect;

describe('The shorten endpoint', ()=> {
    beforeEach(()=> {
        client = restify.createJsonClient(`http://localhost:3000`); // TODO: get port from config
    });

    it('shortens an url', (done)=> {
        const url = 'http://test.url';
        client.post('/shorten', {'url': url}, (err, req, res: restify.Response, data)=> {
            expect(res.statusCode).to.equal(201);
            expect(res.headers['content-type']).to.equal('application/json');
            expect(data).to.include.keys('shortcode');
            expect(data.shortcode).to.match(/^[0-9a-zA-Z_]{4,}$/);

            client.get(`/${data.shortcode}`, (err, req, res: restify.Response, data)=> {
                expect(res.statusCode).to.equal(302);
                expect(res.headers['location']).to.equal(url);
                done();
            });

        });


    });

    xdescribe('when providing a preferred code', ()=> {
        let doShortenRequest = function (body, callback) {
            client.post('/shorten', body, callback);
        };

        it('uses a valid code of minimal length', (done)=> {
            var code = 'zoef';
            doShortenRequest({'url': 'http://test.url', 'code': code}, (err, req, res: restify.Response, data)=> {
                expect(res.statusCode).to.equal(201);
                expect(data).to.equal({code});
                done();
            });
        });

        it('uses a valid code of extended length', (done)=> {
            var code = '42istheanswer';
            doShortenRequest({'url': 'http://test.url', 'code': code}, (err, req, res: restify.Response, data)=> {
                expect(res.statusCode).to.equal(201);
                expect(data).to.equal({code});
                done();
            });
        });

        it('rejects an invalid code', (done)=> {
            let code = '123';
            client.post('/shorten', {
                'url': 'http://test.url',
                'code': code
            }, (err, req, res: restify.Response, data)=> {
                expect(res.statusCode).to.equal(200);
                expect(data).to.equal('works');
                done();
            });
        });

        it('rejects an already existing code', (done)=> {
            client.post('/shorten', {'url': 'http://test.url'}, (err, req, res: restify.Response, data)=> {
                expect(res.statusCode).to.equal(200);
                expect(data).to.equal('works');
                done();
            });
        });
    });

});