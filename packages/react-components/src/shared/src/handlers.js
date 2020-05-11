import { isFunction, isNil } from "lodash";

export function withHandlerProxy(component, handlerName, optional = true) {
    return event => {
        const handler = component.props[handlerName];

        if (!optional || !isNil(handler)) {
            if (isFunction(handler)) {
                handler(event, component.props);
            } else {
                throw new Error(`withHandlerProxy - ${handlerName} must be a function.`);
            }
        }
    };
}
