export class Logger {
    private _logs = [];

    log(value) {
        this._logs = [...this.logs, value];
    }

    get logs() {
        return this._logs
    }

    console() {
        console.log(this._logs);
    }
}