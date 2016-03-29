import {IStorage} from "./iStorage";
import {ShortcodeStats} from "../models/shortcodeStats";
import {Database} from "sqlite3";
import sqlite3 = require('sqlite3');
import {settings} from '../config';

export class SqliteStorage implements IStorage {
    private db: Database;

    constructor() {
        this.db = new sqlite3.Database(settings.dbName);
    }

    get(shortcode: string): string {
        return undefined;
    }

    add(shortcode: string, url: string) {
    }

    getStats(shortcode: string): ShortcodeStats {
        return undefined;
    }

    saveStats(shortcode: string, stats: ShortcodeStats) {
    }

    private initialize(){
        
    }

}