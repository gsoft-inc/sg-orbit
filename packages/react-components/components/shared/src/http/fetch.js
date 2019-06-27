export function fetchWithTimeout(url, options) {
    const { timeout, ...fetchOptions } = options;

    if (timeout > 0) {
        // prettier-ignore
        return Promise.race([
            fetch(url, fetchOptions),
            new Promise((resolve, reject) => setTimeout(() => reject({ isTimeout: true }), timeout))
        ]);
    }

    return fetch(url, fetchOptions);
}