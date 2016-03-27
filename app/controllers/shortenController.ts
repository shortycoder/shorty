import restify = require('restify');

export class ShortenController {
    private code: string;

    post(req: restify.Request, res: restify.Response, next: restify.Next) {
        let shortcode: string;
        if (!req.body.url) {
            res.json(400, {message: 'Required property "url" is not provided.'})
            return next();
        }

        if (req.body.shortcode) {
            if (!req.body.shortcode.match(/^[0-9a-zA-Z_]{4,}$/)) {
                res.json(422, {message: 'The provided shortcode is invalid, it should match "/^[0-9a-zA-Z_]{4,}$/"'});
                return next();
            }

            shortcode = req.body.shortcode;
        }

        if (!shortcode) {
            shortcode = 'aabbcc';
        }

        res.json(201, {shortcode: shortcode});
        return next();
    }
}