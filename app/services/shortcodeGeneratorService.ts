export class ShortcodeGenerator {
    private length: number;

    constructor() {
        this.length = 6;
    }
    
    public generate(): string {
        return Math.round((Math.pow(36, this.length + 1) - Math.random() * Math.pow(36, this.length))).toString(36).slice(1);
    }
}