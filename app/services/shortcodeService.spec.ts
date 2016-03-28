import {ShortcodeService} from './shortcodeService';
import sinon = require('sinon');
import chai = require('chai');
import sinonChai = require('sinon-chai');
chai.use(sinonChai);
let expect = chai.expect;

describe('The shortcode service', ()=> {
    let shortcodeStorage;
    let shortcodeGenerator;
    let shortcodeService: ShortcodeService;

    beforeEach(()=> {
        shortcodeStorage = {
            add: sinon.spy(),
            get: ()=> {}
        };

        shortcodeGenerator = {
            generate: ()=>{}
        };

        shortcodeService = new ShortcodeService(shortcodeStorage, shortcodeGenerator);
    });

    it('gets the url for a shortcode', ()=> {
        let shortcode = 'shortcode';
        let url = 'url';

        shortcodeStorage.get = sinon.stub().returns(url);
        let result = shortcodeService.get(shortcode);
        expect(shortcodeStorage.get).to.have.been.calledOnce;
        expect(result).to.equal(url);
    });

    it('generates a shortcode when none provided', (done)=> {
        let url = 'url';

        let pseudoRandom = 'abcd' + Math.round(Math.random() * 100);

        shortcodeGenerator.generate = sinon.stub().returns(pseudoRandom);
        expect(shortcodeService.save(url, undefined)).to.equal(pseudoRandom);
        expect(shortcodeStorage.add).to.have.been.calledWith(pseudoRandom);
        done();
    });

    it('tries again if a generated shortcode exists', ()=> {
        let url = 'url';

        let pseudoRandom = 'abcd' + Math.round(Math.random() * 100);
        let pseudoRandom2 = 'xyz' + Math.round(Math.random() * 100);

        sinon.stub(shortcodeGenerator, 'generate').onFirstCall().returns(pseudoRandom);
        shortcodeGenerator.generate.onSecondCall().returns(pseudoRandom2);
        sinon.stub(shortcodeService, 'exists').onFirstCall().returns(true);
        shortcodeService.exists.onSecondCall().returns(false);

        expect(shortcodeService.save(url)).to.equal(pseudoRandom2);
        expect(shortcodeGenerator.generate).to.have.been.calledTwice;
    });

    it('saves a provided shortcode', ()=> {
        let shortcode = 'shortcode';
        let url = 'url';


        let result = shortcodeService.save(url, shortcode);
        expect(result).to.equal(shortcode);
        expect(shortcodeStorage.add).to.have.been.calledOnce;
        expect(shortcodeStorage.add).to.have.been.calledWith(shortcode, url);
    });

    it('throws an error when the provided shortcode already exists', ()=> {
        let shortcode = 'shortcode';
        let url = 'url';

        shortcodeStorage.get = sinon.stub().returns('something');
        expect(() => {
            shortcodeService.save(shortcode, url)
        }).to.throw();
    });
});