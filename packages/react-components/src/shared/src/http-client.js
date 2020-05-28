import { isNil, pickBy } from "lodash";
import { isNilOrEmpty } from "./is-nil-or-empty";

const DEFAULT_TIMEOUT = 0;

const DEFAULT_OPTIONS = {
    headers: {
        "Content-Type": "application/json"
    },
    timeout: DEFAULT_TIMEOUT
};

function fetchWithTimeout(url, options) {
    const { timeout, ...requestOptions } = options;

    if (!isNil(timeout) && timeout > 0) {
        return Promise.race([
            fetch(url, requestOptions),
            new Promise((resolve, reject) => setTimeout(() => reject({ isTimeout: true }), timeout))
        ]);
    }

    return fetch(url, requestOptions);
}

function toSearch(params) {
    const instance = new URLSearchParams();

    Object.keys(params).forEach(key => {
        instance.append(key, params[key]);
    });

    return instance.toString();
}

export function httpGet({ url, data, options = {} }) {
    let requestUrl = url;

    if (!isNil(data)) {
        const urlParameters = toSearch(pickBy(data, x => !isNil(x)));

        if (!isNilOrEmpty(urlParameters)) {
            const separator = requestUrl.includes("?") ? "&" : "?";

            requestUrl = `${requestUrl}${separator}${urlParameters}`;
        }
    }

    return fetchWithTimeout(requestUrl, {
        method: "GET",
        ...DEFAULT_OPTIONS,
        ...options
    });
}
