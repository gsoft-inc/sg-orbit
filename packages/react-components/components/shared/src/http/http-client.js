import { fetchWithTimeout } from "./fetch";
import { isNil, pickBy } from "lodash";
import { isNotNullOrEmpty } from "../utils/types";
import { toSearch } from "../utils/url";

const DEFAULT_TIMEOUT = 0;

const DEFAULT_OPTIONS = {
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
