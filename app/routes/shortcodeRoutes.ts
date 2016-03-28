import restify = require('restify');
import {ShortcodeController} from '../controllers/ShortcodeController';
import {ShortcodeService} from '../services/shortcodeService';
import {InMemoryShortcodeStorage} from "../storage/inMemoryShortcodeStorage";
import {ShortcodeGenerator} from "../services/shortcodeGeneratorService";

function ShortcodeRoutes(api: restify.Server) {

}

module.exports.routes = ShortcodeRoutes;