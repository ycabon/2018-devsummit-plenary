export default class TimeoutError {
    get name() {
        return 'TimeoutError';
    }
    constructor(message) {
        message = message || 'The request timed out';
        this.message = message;
    }
}
//# sourceMappingURL=TimeoutError.mjs.map