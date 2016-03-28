import {IStorage} from "./iStorage";
import {ShortcodeStatistics} from "../models/shortcodeStatistics";

export class InMemoryStorage implements IStorage{
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
        return this.statistics[shortcode];
    }

    saveStatistics(shortcode: string, statistics: ShortcodeStatistics) {
        this.statistics[shortcode] = statistics;
    }
}