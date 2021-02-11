import { IS_PRODUCTION } from "../OLD_env";
import { isNil } from "lodash";

export function throwWhenUnsupportedPropIsProvided(props: Record<string, any>, unsupportedProps: string[], componentName: string): void {
    if (!IS_PRODUCTION) {
        unsupportedProps.forEach(x => {
            if (!isNil(props[x])) {
                throw new Error(`UnsupportedSemanticPropError: The Semantic UI prop "${x}" is not supported by Orbit component "${componentName}".`);
            }
        });
    }
}
