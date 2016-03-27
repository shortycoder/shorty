import {ShortenController} from './shortenController';
import restify = require('restify');
import sinon = require('sinon');
import chai = require('chai');
import sinonChai = require('sinon-chai');
chai.use(sinonChai);
let expect = chai.expect;

describe('The Shorten Controller', ()=> {
    describe('the post method', ()=> {
        let shortenController: ShortenController;
        let req: restify.Request;
        let res: restify.Response;
        beforeEach(()=>{
            shortenController = new ShortenController();
            req = <restify.Request>{
                body: {
                    url: 'http://test.url'
                }
            };
            res = <restify.Response>{
                json: sinon.spy()
            };
        });

        it('creates a shortcode from a url', (done)=> {
            shortenController.post(req, res, <restify.Next>(()=>{
                //noinspection BadExpressionStatementJS
                expect(res.json).to.have.been.calledOnce;
                //noinspection BadExpressionStatementJS
                expect(res.json).to.have.been.calledWith(201, {shortcode: sinon.match(/^[0-9a-zA-Z_]{6}$/)});
                done();
            }));
        });

        it('returns an error when no url is provided', (done)=>{
            delete req.body.url;
            shortenController.post(req, res, <restify.Next>(()=>{
                expect(res.json).to.have.been.calledWith(400, {message: 'Required property "url" is not provided.'});
                done();
            }));
        });

        it('uses a provided shortcode', (done)=> {
            const shortcode = 'code42';
            req.body.shortcode = shortcode;

            shortenController.post(req, res, <restify.Next>(()=>{
                //noinspection BadExpressionStatementJS
                expect(res.json).to.have.been.calledOnce;
                //noinspection BadExpressionStatementJS
                expect(res.json).to.have.been.calledWith(201, {shortcode: shortcode});
                done();
            }));
        });

        it('uses a very long provided shortcode', (done)=> {
            const shortcode = 'code42WithSugarAndCherriesAndFreshPickedBerries';
            req.body.shortcode = shortcode;

            shortenController.post(req, res, <restify.Next>(()=>{
                //noinspection BadExpressionStatementJS
                expect(res.json).to.have.been.calledOnce;
                //noinspection BadExpressionStatementJS
                expect(res.json).to.have.been.calledWith(201, {shortcode: shortcode});
                done();
            }));
        });

        it('returns an error when the provided shortcode is invalid', (done)=> {
            const shortcode = '42';
            req.body.shortcode = shortcode;

            shortenController.post(req, res, <restify.Next>(()=>{
                //noinspection BadExpressionStatementJS
                expect(res.json).to.have.been.calledOnce;
                //noinspection BadExpressionStatementJS
                expect(res.json).to.have.been.calledWith(422, {message: 'The provided shortcode is invalid, it should match "/^[0-9a-zA-Z_]{4,}$/"'});
                done();
            }));
        });
    });
});