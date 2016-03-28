import sinon = require('sinon');
import chai = require('chai');
import sinonChai = require('sinon-chai');
import chaiDatetime = require('chai-datetime');
import {ShortcodeStatistics} from "./shortcodeStatistics";
chai.use(sinonChai);
chai.use(chaiDatetime);
let expect = chai.expect;

describe('The shortcode statistics', ()=> {
    let clock;

    beforeEach(()=> {
        clock = sinon.useFakeTimers();
    });

    afterEach(()=> {
        clock.restore();
    });

    it('has initial values after creation', ()=> {
        let statistics: ShortcodeStatistics = new ShortcodeStatistics();

        expect(statistics.startDate).to.equalDate(new Date());
        expect(statistics.redirectCount).to.equal(0);
        expect(statistics.lastSeenDate).to.equal(undefined);
    });

    it('updates values', ()=> {
        let statistics: ShortcodeStatistics = new ShortcodeStatistics();
        let startDate = new Date();

        clock.tick(24*3600*1000);
        statistics.update();

        expect(statistics.startDate).to.equalDate(startDate);
        expect(statistics.lastSeenDate).to.equalDate(new Date());
        expect(statistics.redirectCount).to.equal(1);

        statistics.update();
        expect(statistics.redirectCount).to.equal(2);
    });
});