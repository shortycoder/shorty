import {ShortcodeStats} from '../models/shortcodestats';

export interface IStorage {
    get(shortcode: string): string;
    add(shortcode: string, url: string);
    getStats(shortcode: string): ShortcodeStats;
    saveStats(shortcode: string, stats: ShortcodeStats);
}