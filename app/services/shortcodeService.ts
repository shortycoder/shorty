import {IStorage} from "../storage/iStorage";
import {ShortcodeGenerator} from "./generatorService";
import {ShortcodeExistsError} from "../errors/shortcodeExistsError";
import {ShortcodeStatistics} from "../models/shortcodeStatistics";
export class ShortcodeService {
    constructor(private storage: IStorage, private shortcodeGenerator: ShortcodeGenerator){

    }

    get(shortcode: string): string {
        return this.storage.get(shortcode);
    }

    save(url: string, shortcode?: string){
        if(!!shortcode){
            if(this.get(shortcode)){
                throw new ShortcodeExistsError('Shortcode already exists');
            }
        }else{
           shortcode = this.generateShortCode();
        }

        this.storage.add(shortcode, url);
        this.storage.saveStatistics(shortcode, new ShortcodeStatistics());
        return shortcode;
    }

    updateUsage(shortcode: string){
        let statistics = this.storage.getStatistics(shortcode);
        statistics.update();
        this.storage.saveStatistics(shortcode, statistics);
    }

    exists(shortcode: string): boolean {
        return !!this.get(shortcode);
    }

    getStatistics(shortcode: string): ShortcodeStatistics {
        return this.storage.getStatistics(shortcode);
    }

    private generateShortCode(): string{
        let shortcode;
        do{
            shortcode = this.shortcodeGenerator.generate();
        }while(this.exists(shortcode));

        return shortcode;
    }
}