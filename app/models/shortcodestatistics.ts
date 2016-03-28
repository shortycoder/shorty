export class ShortcodeStatistics {
    private _startDate: Date;
    private _redirectCount: Number;
    private _lastSeenDate: Date;

    constructor(){
        this._startDate = new Date();
        this._redirectCount = 0;
    }

    get startDate(): Date {
        return this._startDate;
    }

    get lastSeenDate(): Date {
        return this._lastSeenDate;
    }

    get redirectCount(): Number{
        return this._redirectCount;
    }

    update(){
        this._lastSeenDate = new Date();
        this._redirectCount++;

        return this;
    }
}