import restify = require('restify');
import {ShortenController} from '../controllers/shortenController'

function shortenRoute(api: restify.Server) {
    let routeCtrl = new ShortenController();
    api.post('/shorten', routeCtrl.post);
}

module.exports.routes = shortenRoute;