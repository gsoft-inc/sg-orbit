import { SIZE } from "./size";
import { cloneElement } from "react";
import { isElement } from "react-is";
import { isFunction, isNil } from "lodash";
import { isPlainObject } from "lodash";

export function createShorthandFactory(ComponentType, customFactory) {
    return (shorthand, props) => {
        if (isElement(shorthand)) {
            return cloneElement(shorthand, props);
        }

        if (isPlainObject(shorthand)) {
            const { children } = props;
            const { content, ...rest } = shorthand;

            return <ComponentType
                {...rest}
                {...props}
                children={!isNil(content) ? content : children}
            />;
        }

        if (isFunction(customFactory)) {
            const component = customFactory(shorthand, props);

            if (!isNil(component)) {
                return component;
            }
        }

        throw new Error(`Cannot create an instance of ${ComponentType} from shorthand. Unknown format: "${shorthand}".`);
    };
}

export function createShorthandFactoryForEmbedded(shorthandFactory, sizeChart) {
    return (shorthand, props, ...rest) => {
        const newProps = {
            ...props,
            size: sizeChart[props.size || SIZE.medium]
        };

        return shorthandFactory(shorthand, newProps, ...rest);
    };
}
