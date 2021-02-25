import { disposables } from "../../shared";

// Defer the execution of a function until the function has not been called for the specified delay.
// The execution of the function can also manually be cancelled.
export function defer(func, delay = 0) {
    const d = disposables();

    function proxy(...args) {
        d.dispose();

        d.setTimeout(() => {
            func(...args);
        }, delay);
    }

    proxy.cancel = () => {
        d.dispose();
    };

    return proxy;
}
