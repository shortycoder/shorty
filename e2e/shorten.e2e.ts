import restify = require('restify');
import chai = require('chai');
import {Client} from 'restify';
let client: Client;
let expect = chai.expect;

describe('shorten endpoint', ()=> {
    beforeEach(()=> {
        client = restify.createJsonClient(`http://localhost:3000`); // TODO: get port from config
    });

    it('shortens an url', (done)=>{
        client.post('/shorten', {'url': 'http://test.url'}, (err, req, res: restify.Response, data)=>{
            expect(res.statusCode).to.equal(200);
            expect(data).to.equal('works');
            done();
        });
    });
});