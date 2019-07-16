import { isNil } from "lodash";

export function fetchWithTimeout(url, options) {
    const { timeout, ...requestOptions } = options;

    if (!isNil(timeout) && timeout > 0) {
        // prettier-ignore
        return Promise.race([
            fetch(url, requestOptions),
            new Promise((resolve, reject) => setTimeout(() => reject({ isTimeout: true }), timeout))
        ]);
    }

    return fetch(url, requestOptions);
}
