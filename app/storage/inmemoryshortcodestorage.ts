import {IShortcodeStorage} from "./ishortcodestorage";
import {ShortcodeStatistics} from "../models/shortcodestatistics";

export class InMemoryShortcodeStorage implements IShortcodeStorage{
    private shortcodes: {[shortcode: string]: string};
    private statistics: {[shortcode: string]: ShortcodeStatistics};

    constructor(){
        this.shortcodes = {};
        this.statistics = {};
    }

    get(shortcode: string|boolean) {
        return this.shortcodes[shortcode] || false;
    }

    add(shortcode: string, url: string) {
        this.shortcodes[shortcode] = url;
        this.statistics[shortcode] = new ShortcodeStatistics();
    }

    getStatistics(shortcode: string): ShortcodeStatistics {
        return undefined;
    }

    updateStatistics(shortcode: string, statistics: ShortcodeStatistics) {
    }

}