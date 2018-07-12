export class Logger {
    private oldLogs = [];

    log(value) {
        this.oldLogs = [...this.oldLogs, value];
    }

    get logs() {
        return this.oldLogs
    }

    console() {
        console.log(this.oldLogs);
    }
}