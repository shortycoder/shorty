import {InMemoryShortcodeStorage} from './inmemoryshortcodestorage';
import sinon = require('sinon');
import chai = require('chai');
import sinonChai = require('sinon-chai');
chai.use(sinonChai);
let expect = chai.expect;

describe('The InMemoryShortcodeStorage', ()=> {
    let inMemoryShortcodeStorage: InMemoryShortcodeStorage;
    beforeEach(()=>{
        inMemoryShortcodeStorage = new InMemoryShortcodeStorage();
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
});