import { isFunction, isNil } from "lodash";

export function useHandlerProxy(component, handlerName) {
    return event => {
        const handler = component.props[handlerName];

        if (!isNil(handler)) {
            if (isFunction(handler)) {
                handler(event, component.props);
            } else {
                throw new Error(`useHandlerProxy - ${handlerName} must be a function.`);
            }
        }

    };
}
