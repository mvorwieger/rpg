export class Logger {
    private oldLogs = []

    get logs() {
        return this.oldLogs
    }

    log(value) {
        this.oldLogs = [...this.oldLogs, value]
    }

    console() {
        console.log(this.oldLogs)
    }
}