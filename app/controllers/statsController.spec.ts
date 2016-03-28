import sinon = require('sinon');
import chai = require('chai');
import sinonChai = require('sinon-chai');
chai.use(sinonChai);
let expect = chai.expect;

import restify = require('restify');
import {StatsController} from './statsController';
import sinonChai = require("sinon-chai");
import {ShortcodeStats} from "../models/shortcodeStats";

describe('The stats controller', ()=> {
    let statsController: StatsController;
    let shortcodeService;

    let req: restify.Request;
    let res: restify.Response;
    beforeEach(()=> {
        shortcodeService = {
            getStats: ()=> {
            },
            save: sinon.spy()
        };

        statsController = new StatsController(shortcodeService);

        req = <restify.Request>{
            params: {
                shortcode: 'aabbcc'
            }
        };
        res = <restify.Response>{
            json: sinon.spy()
        };
    });

    it('gets stats for a shortcode', (done)=> {
        let clock = sinon.useFakeTimers();

        let stats = {
            redirectCount: 2,
            startDate: new Date(),
            lastSeenDate: new Date()
        };

        sinon.stub(shortcodeService, 'getStats').returns(stats);

        statsController.get(req, res, <restify.Next>(()=> {
            expect(res.json).to.have.been.calledWith(200, {
                redirectCount: stats.redirectCount,
                startDate: "1970-01-01T00:00:00.000Z",
                lastSeenDate: "1970-01-01T00:00:00.000Z"
            });

            clock.restore();

            done();
        }));

    });
});