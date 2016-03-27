import restify = require('restify');

export class ShortenController {
    post(req: restify.Request, res: restify.Response, next: restify.Next) {
        res.json(200, 'works');
        return next();
    }
}