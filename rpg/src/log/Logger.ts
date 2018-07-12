export class Logger {
    private  logs = [];

    log(value) {
        this. logs = [...this.logs, value];
    }

    get logs() {
        return this. logs
    }

    console() {
        console.log(this. logs);
    }
}