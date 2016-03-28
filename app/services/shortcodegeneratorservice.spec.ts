import {ShortcodeGenerator} from './shortcodeGeneratorService';
import sinon = require('sinon');
import chai = require('chai');
import sinonChai = require('sinon-chai');
chai.use(sinonChai);
let expect = chai.expect;

describe('The shortcode generator', ()=>{
   it('generates a shortcode of the correct length and characters', ()=>{
       let shortcodeGenerator = new ShortcodeGenerator();
       expect(shortcodeGenerator.generate()).to.match(/^[0-9a-zA-Z_]{6}$/);
   });
});