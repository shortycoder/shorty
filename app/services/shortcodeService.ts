import {IShortcodeStorage} from "../storage/ishortcodestorage";
import {ShortcodeGenerator} from "./shortcodeGeneratorService";
import {InvalidArgumentError} from "restify";
import {ShortcodeExistsError} from "../errors/shortcodeExistsError";
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
        return shortcode;
    }

    exists(shortcode: string): boolean {
        return !!this.get(shortcode);
    }

    private generateShortCode(): string{
        let shortcode;
        do{
            shortcode = this.shortcodeGenerator.generate();
        }while(this.exists(shortcode));

        return shortcode;
    }
}