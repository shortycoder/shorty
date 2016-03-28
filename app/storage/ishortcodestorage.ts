import {ShortcodeStatistics} from '../models/shortcodestatistics';

export interface IShortcodeStorage {
    get(shortcode: string): string;
    add(shortcode: string, url: string);
    getStatistics(shortcode: string): ShortcodeStatistics;
    updateStatistics(shortcode: string, statistics: ShortcodeStatistics);
}