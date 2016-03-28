import {ShortcodeService} from './shortcodeService';
import sinon = require('sinon');
import chai = require('chai');
import sinonChai = require('sinon-chai');
import SinonStubStatic = Sinon.SinonStubStatic;
import SinonSpy = Sinon.SinonSpy;
import SinonStub = Sinon.SinonStub;
chai.use(sinonChai);
let expect = chai.expect;

describe('The shortcode service', ()=> {
    let shortcodeStorage;
    let shortcodeGenerator;
    let shortcodeService: ShortcodeService;

    beforeEach(()=> {
        shortcodeStorage = {
            add: sinon.spy(),
            get: ()=> {
            },
            saveStatistics: ()=> {
            },
            getStatistics: ()=> {
            }
        };

        shortcodeGenerator = {
            generate: ()=> {
            }
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
        (<SinonStub>shortcodeGenerator.generate).onSecondCall().returns(pseudoRandom2);
        sinon.stub(shortcodeService, 'exists').onFirstCall().returns(true);
        (<SinonStub>shortcodeService.exists).onSecondCall().returns(false);

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

    it('saves statistics for a new shortcode', ()=> {
        sinon.stub(shortcodeStorage, 'saveStatistics');

        let shortcode = 'shortcode';
        shortcodeService.save('test', shortcode);
        expect(shortcodeStorage.saveStatistics).to.have.been.calledOnce;
        expect(shortcodeStorage.saveStatistics).to.have.been.calledWith(shortcode, sinon.match.has('startDate').and(sinon.match.has('redirectCount')));
    });

    it('returns statistics for a shortcode', ()=> {
        let shortcode = 'shortcode';
        let statistics = {};

        sinon.stub(shortcodeStorage, 'getStatistics').returns(statistics);

        expect(shortcodeService.getStatistics(shortcode)).to.equal(statistics);
    });

    it('updates statistics for a shortcode', ()=> {
        let shortcode = 'shortcode';
        let statistics = {
            update: sinon.spy()
        };

        sinon.stub(shortcodeStorage, 'getStatistics').returns(statistics);
        sinon.stub(shortcodeStorage, 'saveStatistics');

        shortcodeService.updateUsage(shortcode);

        expect(shortcodeStorage.getStatistics).to.have.been.calledWith(shortcode);
        expect(statistics.update).to.have.been.calledOnce;
        expect(shortcodeStorage.saveStatistics).to.have.been.calledWith(shortcode, statistics);
    });
});