import { queueTask } from './queue';
function getQueueHandle(item) {
    return {
        destroy: function () {
            this.destroy = function () { };
            item.isActive = false;
            item.callback = null;
        }
    };
}
export default class Scheduler {
    _defer(callback) {
        const item = {
            isActive: true,
            callback: callback
        };
        if (!this._deferred) {
            this._deferred = [];
        }
        this._deferred.push(item);
        return getQueueHandle(item);
    }
    _dispatch() {
        this._isProcessing = true;
        if (this._task) {
            this._task.destroy();
            this._task = null;
        }
        const queue = this._queue;
        let item;
        while ((item = queue.shift())) {
            if (item.isActive && item.callback) {
                item.callback();
            }
        }
        this._isProcessing = false;
        let deferred = this._deferred;
        if (deferred && deferred.length) {
            this._deferred = null;
            let item;
            while ((item = deferred.shift())) {
                this._schedule(item);
            }
        }
    }
    _schedule(item) {
        if (!this._task) {
            this._task = this.queueFunction(this._boundDispatch);
        }
        this._queue.push(item);
    }
    constructor(kwArgs) {
        this.deferWhileProcessing = kwArgs && 'deferWhileProcessing' in kwArgs ? kwArgs.deferWhileProcessing : true;
        this.queueFunction = kwArgs && kwArgs.queueFunction ? kwArgs.queueFunction : queueTask;
        this._boundDispatch = this._dispatch.bind(this);
        this._isProcessing = false;
        this._queue = [];
    }
    schedule(callback) {
        if (this._isProcessing && this.deferWhileProcessing) {
            return this._defer(callback);
        }
        const item = {
            isActive: true,
            callback: callback
        };
        this._schedule(item);
        return getQueueHandle(item);
    }
}
//# sourceMappingURL=Scheduler.mjs.map