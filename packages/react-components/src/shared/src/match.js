import { isFunction } from "lodash";

// Took from https://github.com/tailwindlabs/headlessui/blob/develop/packages/%40headlessui-react/src/utils/match.ts
export function match(
    value,
    lookup,
    ...args
) {
    if (value in lookup) {
        const returnValue = lookup[value];

        return isFunction(returnValue) ? returnValue(...args) : returnValue;
    }

    const error = new Error(
        `Tried to handle "${value}" but there is no handler defined. Only defined handlers are: ${Object.keys(lookup)
            .map(key => `"${key}"`)
            .join(", ")}.`
    );

    if (Error.captureStackTrace) {
        Error.captureStackTrace(error, match);
    }

    throw error;
}
