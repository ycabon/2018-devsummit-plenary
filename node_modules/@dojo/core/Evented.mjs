import Map from '@dojo/shim/Map';
import { on as aspectOn } from './aspect';
import { Destroyable } from './Destroyable';
/**
 * Handles an array of handles
 *
 * @param handles an array of handles
 * @returns a single Handle for handles passed
 */
function handlesArraytoHandle(handles) {
    return {
        destroy() {
            handles.forEach((handle) => handle.destroy());
        }
    };
}
/**
 * Map of computed regular expressions, keyed by string
 */
const regexMap = new Map();
/**
 * Determines is the event type glob has been matched
 *
 * @returns boolean that indicates if the glob is matched
 */
export function isGlobMatch(globString, targetString) {
    if (typeof targetString === 'string' && typeof globString === 'string' && globString.indexOf('*') !== -1) {
        let regex;
        if (regexMap.has(globString)) {
            regex = regexMap.get(globString);
        }
        else {
            regex = new RegExp(`^${globString.replace(/\*/g, '.*')}$`);
            regexMap.set(globString, regex);
        }
        return regex.test(targetString);
    }
    else {
        return globString === targetString;
    }
}
/**
 * Event Class
 */
export class Evented extends Destroyable {
    constructor() {
        super(...arguments);
        /**
         * map of listeners keyed by event type
         */
        this.listenersMap = new Map();
    }
    emit(event) {
        this.listenersMap.forEach((method, type) => {
            // Since `type` is generic, the compiler doesn't know what type it is and `isGlobMatch` requires `string | symbol`
            if (isGlobMatch(type, event.type)) {
                method.call(this, event);
            }
        });
    }
    on(type, listener) {
        if (Array.isArray(listener)) {
            const handles = listener.map((listener) => aspectOn(this.listenersMap, type, listener));
            return handlesArraytoHandle(handles);
        }
        else {
            return aspectOn(this.listenersMap, type, listener);
        }
    }
}
export default Evented;
//# sourceMappingURL=Evented.mjs.map