import { IS_PRODUCTION } from "../OLD_env";
import { isNil } from "lodash";

export function throwWhenUnsupportedPropIsProvided(props, unsupportedProps, componentName) {
    if (!IS_PRODUCTION) {
        unsupportedProps.forEach(x => {
            if (!isNil(props[x])) {
                throw new Error(`UnsupportedSemanticPropError: The Semantic UI prop "${x}" is not supported by Orbit component "${componentName}".`);
            }
        });
    }
}
