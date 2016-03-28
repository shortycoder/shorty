import {InMemoryStorage} from './inMemoryStorage';
import sinon = require('sinon');
import chai = require('chai');
import sinonChai = require('sinon-chai');
import {ShortcodeStatistics} from "../models/shortcodeStatistics";
chai.use(sinonChai);
let expect = chai.expect;

describe('The InMemoryShortcodeStorage', ()=> {
    let inMemoryShortcodeStorage: InMemoryStorage;
    beforeEach(()=>{
        inMemoryShortcodeStorage = new InMemoryStorage();
    });

    it('stores a shortcode', (done)=> {
        const shortcode = 'aaBBcc';
        const url = 'http://this-is-a-test.nl';

        inMemoryShortcodeStorage.add(shortcode, url);

        expect(inMemoryShortcodeStorage.get(shortcode)).to.equal(url);
        done();
    });

    it('returns false when shortcode does not exist', ()=>{
       expect(inMemoryShortcodeStorage.get('non-existing-code')).to.equal(false);
    });

    it('stores shortcode statistics', ()=>{
        let statistics = {};
        let shortcode = 'shortcode';

        inMemoryShortcodeStorage.saveStatistics(shortcode, <ShortcodeStatistics>statistics);
        expect(inMemoryShortcodeStorage.getStatistics(shortcode)).to.equal(statistics);
    });
});