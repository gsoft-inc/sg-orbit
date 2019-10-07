import { isFunction, isNil } from "lodash";

export function useHandlerProxy(component, handlerName, optional = true) {
    return event => {
        const handler = component.props[handlerName];

        if (!optional || !isNil(handler)) {
            if (isFunction(handler)) {
                handler(event, component.props);
            } else {
                throw new Error(`useHandlerProxy - ${handlerName} must be a function.`);
            }
        }
    };
}
