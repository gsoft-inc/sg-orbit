import { toSearch } from "../utils/url";
import { fetchWithTimeout } from "./fetch";

const DEFAULT_TIMEOUT = 0;

const DEFAULT_OPTIONS = {
    credentials: "include",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: DEFAULT_TIMEOUT
};

export function httpGet({ url, data, options = {} }) {
    let requestUrl = url;

    if (!isNil(data)) {
        const urlParameters = toSearch(pickBy(data, x => !isNil(x)));

        if (isNotNullOrEmpty(urlParameters)) {
            requestUrl = `${requestUrl}?${urlParameters}`;
        }
    }

    return fetchWithTimeout(requestUrl, {
        method: "GET",
        ...DEFAULT_OPTIONS,
        ...options
    });
};