/**
 * Convert an object to query string parameters.
 * @param {Object} params
 * @returns {string}
 * @example
 * toSearch({ foo: "bar", yo: "lo" });
 * -> "foo=bar&yo=lo"
 */
export function toSearch(params) {
    const instance = new URLSearchParams();

    Object.keys(params).forEach(key => {
        instance.append(key, params[key]);
    });

    return instance.toString();
}