import { ExtendableError } from "./throwable-errors";
import { isNil } from "lodash";
import { isNullOrEmpty } from "./types";

export class UnsupportedSemanticPropError extends ExtendableError {
    /**
     * @param {string} propName
     */
    constructor(propName) {
        const message = isNullOrEmpty(propName) ? "UnsupportedSemanticPropError" : `UnsupportedSemanticPropError: The Semantic UI prop "${propName}" is not supported by Orbit.`;

        super(message);
    }
}

export function throwWhenUnsupportedPropIsProvided(props, unsupportedProps) {
    unsupportedProps.forEach(x => {
        if (!isNil(props[x])) {
            throw new UnsupportedSemanticPropError(x);
        }
    });
}
