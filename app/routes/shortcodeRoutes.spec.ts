import ShortcodeRoutes = require('./shortcodeRoutes');
import restify = require('restify');
import sinon = require('sinon');
import chai = require('chai');
import sinonChai = require('sinon-chai');
chai.use(sinonChai);
let expect = chai.expect;

describe('The Shortcode routes', ()=> {
    let api;
    beforeEach(()=>{
        api = {
            get: sinon.spy(),
            post: sinon.spy()
        };
    });

    it('has a `POST /shorten` route', (done)=>{
        ShortcodeRoutes.routes(<restify.Server>api);
        expect(api.post).to.have.been.calledWith('/shorten'); //TODO: verify that correct method on controller is called
        done();
    });

    it('has a `GET /:shortcode` route', (done)=>{
        ShortcodeRoutes.routes(<restify.Server>api);
        expect(api.get).to.have.been.calledWith('/:shortcode');
        done();
    });
});