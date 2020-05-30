import { cloneElement } from "react";
import { isElement } from "react-is";
import { isFunction, isNil } from "lodash";
import { isPlainObject } from "lodash";

export function createShorthandFactory(ComponentType) {
    return (shorthand, props, customFactory) => {
        if (isElement(shorthand)) {
            return cloneElement(shorthand, props);
        }

        if (isPlainObject(shorthand)) {
            const { content, ...rest } = shorthand;

            return <ComponentType {...rest} {...props} children={!isNil(content) ? content : undefined} />;
        }

        if (isFunction(customFactory)) {
            const component = customFactory(shorthand, props);

            if (!isNil(component)) {
                return component;
            }
        }

        throw new Error(`createShorthand - Cannot create an instance of ${ComponentType} from shorthand. Unknown format: "${shorthand}".`);
    };
}
