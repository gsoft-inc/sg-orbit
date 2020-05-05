import { ExtendableError } from "../throwable-errors";
import { isNil } from "lodash";

export class UnsupportedSemanticPropError extends ExtendableError {
    /**
     * @param {string} propName
     * @param {string} componentName
     */
    constructor(propName, componentName) {
        super(`UnsupportedSemanticPropError: The Semantic UI prop "${propName}" is not supported by Orbit component "${componentName}".`);
    }
}

export function throwWhenUnsupportedPropIsProvided(props, unsupportedProps, componentName) {
    unsupportedProps.forEach(x => {
        if (!isNil(props[x])) {
            throw new UnsupportedSemanticPropError(x, componentName);
        }
    });
}
