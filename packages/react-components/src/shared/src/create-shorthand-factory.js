import { cloneElement } from "react";
import { isElement } from "react-is";
import { isFunction, isNil } from "lodash";
import { isPlainObject } from "lodash";

export function createShorthandFactory(ElementType) {
    return (shorthand, props, customFactory) => {
        if (isElement(shorthand)) {
            return cloneElement(shorthand, props);
        }

        if (isPlainObject(shorthand)) {
            const { content, ...rest } = shorthand;

            return <ElementType {...rest} {...props} children={!isNil(content) ? content : undefined} />;
        }

        if (isFunction(customFactory)) {
            const component = customFactory(shorthand, props);

            if (!isNil(component)) {
                return component;
            }
        }

        throw new Error(`createShorthand - Cannot create an instance of ${ElementType} from shorthand. Unknown format: "${shorthand}".`);
    };
}
