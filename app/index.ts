import {InMemoryShortcodeStorage} from "./storage/inMemoryShortcodeStorage";
let fs = require('fs');

import restify = require('restify');
import {settings} from './config';
import {logger} from './logger';
import {ShortcodeGenerator} from "./services/shortcodeGeneratorService";
import {ShortcodeService} from "./services/shortcodeService";
import {ShortcodeController} from "./controllers/shortcodeController";

let api = restify.createServer({
   name: settings.name
});

restify.CORS.ALLOW_HEADERS.push('authorization');
api.use(restify.CORS());
api.pre(restify.pre.sanitizePath());
api.use(restify.acceptParser(api.acceptable));
api.use(restify.bodyParser());
api.use(restify.queryParser());
api.use(restify.authorizationParser());
api.use(restify.fullResponse());

let shortcodeStorage = new InMemoryShortcodeStorage();
let shortcodeGenerator = new ShortcodeGenerator();
let shortcodeService = new ShortcodeService(shortcodeStorage, shortcodeGenerator);
let shortcodeCtrl = new ShortcodeController(shortcodeService); // TODO: Don't initialize the controller until needed.

api.post('/shorten', shortcodeCtrl.post.bind(shortcodeCtrl));
api.get('/:shortcode', shortcodeCtrl.get.bind(shortcodeCtrl));

api.listen(settings.port, function() {
    console.log(`INFO: ${settings.name} is running at ${api.url}`);
});