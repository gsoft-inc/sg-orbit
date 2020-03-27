import { isNil } from "lodash";

/**
 * Defer the execution of a function until the function has not been called for the specified delay.
 * The execution of the function can also manually be cancelled.
 *
 * @param {function} func - The function to execute.
 * @param {number} [delay=0] - The execution delay.
 * @return {function} - The new deferred function.
 * @example
 * const deferredShowLoading = defer(() => { this.setState({ isLoading: true }) }, 200);
 *
 * deferredShowLoading();
 *
 * deferredShowLoading.cancel();
 */
export function defer(func, delay = 0) {
    let timeoutId = null;

    function deferring(...args) {
        cancel();

        timeoutId = setTimeout(() => {
            func(...args);
            timeoutId = null;
        }, delay);
    }

    function cancel() {
        if (!isNil(timeoutId)) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    }

    deferring.cancel = cancel;

    return deferring;
}
