import {ShortcodeStatistics} from '../models/shortcodestatistics';

export interface IStorage {
    get(shortcode: string): string;
    add(shortcode: string, url: string);
    getStatistics(shortcode: string): ShortcodeStatistics;
    saveStatistics(shortcode: string, statistics: ShortcodeStatistics);
}