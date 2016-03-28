import {IShortcodeStorage} from "../storage/ishortcodestorage";
import {ShortcodeGenerator} from "./shortcodeGeneratorService";
import {ShortcodeExistsError} from "../errors/shortcodeExistsError";
import {ShortcodeStatistics} from "../models/shortcodeStatistics";
export class ShortcodeService {
    constructor(private shortcodeStorage: IShortcodeStorage, private shortcodeGenerator: ShortcodeGenerator){

    }

    get(shortcode: string): string {
        return this.shortcodeStorage.get(shortcode);
    }

    save(url: string, shortcode?: string){
        if(!!shortcode){
            if(this.get(shortcode)){
                throw new ShortcodeExistsError('Shortcode already exists');
            }
        }else{
           shortcode = this.generateShortCode();
        }

        this.shortcodeStorage.add(shortcode, url);
        this.shortcodeStorage.saveStatistics(shortcode, new ShortcodeStatistics());
        return shortcode;
    }
    
    updateUsage(shortcode: string){
        let statistics = this.shortcodeStorage.getStatistics(shortcode);
        statistics.update();
        this.shortcodeStorage.saveStatistics(shortcode, statistics);
    }

    exists(shortcode: string): boolean {
        return !!this.get(shortcode);
    }
    
    getStatistics(shortcode: string): ShortcodeStatistics {
        return this.shortcodeStorage.getStatistics(shortcode);
    }
    
    private generateShortCode(): string{
        let shortcode;
        do{
            shortcode = this.shortcodeGenerator.generate();
        }while(this.exists(shortcode));

        return shortcode;
    }
}