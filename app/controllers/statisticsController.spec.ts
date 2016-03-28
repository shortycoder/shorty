import sinon = require('sinon');
import chai = require('chai');
import sinonChai = require('sinon-chai');
chai.use(sinonChai);
let expect = chai.expect;

import restify = require('restify');
import {StatisticsController} from './statisticsController';
import sinonChai = require("sinon-chai");
import {ShortcodeStatistics} from "../models/shortcodeStatistics";

describe('The statistics controller', ()=> {
    let statisticsController: StatisticsController;
    let shortcodeService;

    let req: restify.Request;
    let res: restify.Response;
    beforeEach(()=> {
        shortcodeService = {
            getStatistics: ()=> {
            },
            save: sinon.spy()
        };

        statisticsController = new StatisticsController(shortcodeService);

        req = <restify.Request>{
            params: {
                shortcode: 'aabbcc'
            }
        };
        res = <restify.Response>{
            json: sinon.spy()
        };
    });

    it('gets statistics for a shortcode', (done)=> {
        let clock = sinon.useFakeTimers();

        let statistics = {
            redirectCount: 2,
            startDate: new Date(),
            lastSeenDate: new Date()
        };

        sinon.stub(shortcodeService, 'getStatistics').returns(statistics);

        statisticsController.get(req, res, <restify.Next>(()=> {
            expect(res.json).to.have.been.calledWith(200, {
                redirectCount: statistics.redirectCount,
                startDate: "1970-01-01T00:00:00.000Z",
                lastSeenDate: "1970-01-01T00:00:00.000Z"
            });

            clock.restore();

            done();
        }));

    });
});