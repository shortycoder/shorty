import {ShortcodeController} from './shortcodeController';
import restify = require('restify');
import sinon = require('sinon');
import chai = require('chai');
import sinonChai = require('sinon-chai');
import {ShortcodeService} from "../services/shortcodeService";
import {ShortcodeGenerator} from "../services/shortcodeGeneratorService";
import {InMemoryShortcodeStorage} from "../storage/inMemoryShortcodeStorage";
chai.use(sinonChai);
let expect = chai.expect;

describe('The Shorten Controller', ()=> {
    let shortcodeController: ShortcodeController;
    let shortcodeService;

    beforeEach(()=>{
        shortcodeService = {
            get: sinon.spy(),
            save: sinon.spy()
        };

        shortcodeController = new ShortcodeController(shortcodeService);
    });



    describe('the post method', ()=> {
        let req: restify.Request;
        let res: restify.Response;
        let url = 'http://test.url';

        beforeEach(()=> {

            req = <restify.Request>{
                body: {
                    url: url
                }
            };
            res = <restify.Response>{
                json: sinon.spy()
            };
        });

        it('creates a shortcode from a url', (done)=> {
            shortcodeService.save = sinon.stub().returns('aaBBcc');

            shortcodeController.post(req, res, <restify.Next>(()=> {
                expect(shortcodeService.save).to.have.been.calledOnce;
                expect(shortcodeService.save).to.have.been.calledWith(url);

                //noinspection BadExpressionStatementJS
                expect(res.json).to.have.been.calledOnce;
                //noinspection BadExpressionStatementJS
                expect(res.json).to.have.been.calledWith(201, {shortcode: sinon.match(/^[0-9a-zA-Z_]{6}$/)});
                done();
            }));
        });

        it('returns an error when no url is provided', (done)=> {
            delete req.body.url;
            shortcodeController.post(req, res, <restify.Next>(()=> {
                expect(res.json).to.have.been.calledWith(400, {message: 'Required property "url" is not provided.'});
                done();
            }));
        });

        it('uses a provided shortcode', (done)=> {
            const shortcode = 'code42';
            req.body.shortcode = shortcode;

            shortcodeService.save = sinon.stub().returns(shortcode);

            shortcodeController.post(req, res, <restify.Next>(()=> {
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

            shortcodeService.save = sinon.stub().returns(shortcode);

            shortcodeController.post(req, res, <restify.Next>(()=> {
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

            shortcodeController.post(req, res, <restify.Next>(()=> {
                //noinspection BadExpressionStatementJS
                expect(res.json).to.have.been.calledOnce;
                //noinspection BadExpressionStatementJS
                expect(res.json).to.have.been.calledWith(422, {message: 'The provided shortcode is invalid, it should match "/^[0-9a-zA-Z_]{4,}$/"'});
                done();
            }));
        });
    });

    describe('the get method', ()=> {
        let req: restify.Request;
        let res: restify.Response;
        beforeEach(()=> {
            req = <restify.Request>{
                params: {
                    shortcode: 'aabbcc'
                }
            };
            res = <restify.Response>{
                send: sinon.spy()
            };
        });

        it('returns the url from a shortcode', (done)=> {
            let url = 'http://test.url';

            shortcodeService.get = sinon.stub().returns(url);

            shortcodeController.get(req, res, <restify.Next>(()=> {
                expect(shortcodeService.get).to.have.been.calledOnce;
                expect(shortcodeService.get).to.have.been.calledWith('aabbcc');


                //noinspection BadExpressionStatementJS
                expect(res.send).to.have.been.calledOnce;
                //noinspection BadExpressionStatementJS
                expect(res.send).to.have.been.calledWith(302, null, {location: url});
                done();
            }));
        });

        it('returns 404 if the shortcode does not exist', (done)=>{
            shortcodeService.get = sinon.stub().returns(undefined);
            req.params.shortcode = 'shortcodethatdoesnotexist';

            shortcodeController.get(req, res, <restify.Next>(()=> {
                expect(shortcodeService.get).to.have.been.calledOnce;
                expect(shortcodeService.get).to.have.been.calledWith('shortcodethatdoesnotexist');


                //noinspection BadExpressionStatementJS
                expect(res.send).to.have.been.calledOnce;
                //noinspection BadExpressionStatementJS
                expect(res.send).to.have.been.calledWith(404);
                done();
            }))
        });
    });
});