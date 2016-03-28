import restify = require('restify');
import {ShortcodeService} from "../services/shortcodeService";
import {ShortcodeStatistics} from "../models/shortcodeStatistics";
export class StatisticsController{
    constructor(private shortcodeService: ShortcodeService){

    }

    get(req: restify.Request, res: restify.Response, next: restify.Next){
        let statistics: ShortcodeStatistics = this.shortcodeService.getStatistics(req.params.shortcode);

        if (statistics) {
            let output: {startDate: string, redirectCount: Number, lastSeenDate?: string} = {
                startDate: statistics.startDate.toISOString(),
                redirectCount: statistics.redirectCount
            };
            
            if(statistics.redirectCount > 0){
                output.lastSeenDate = statistics.lastSeenDate.toISOString();
            }
            
            res.json(200, output);
        } else {
            res.json(404);
        }

        return next();
    }
}