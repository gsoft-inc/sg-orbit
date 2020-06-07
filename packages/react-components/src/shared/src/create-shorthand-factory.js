import { SIZE } from "./size";
import { augmentElement, augmentElementProps } from "./augment-element";
import { isElement, isValidElementType } from "react-is";
import { isFunction, isNil } from "lodash";
import { isPlainObject } from "lodash";

export function createShorthandFactory(ComponentType, customFactory) {
    return (shorthand, props = {}) => {
        if (isNil(shorthand)) {
            return null;
        }

        // Handling custom element type for convenience.
        if (isValidElementType(shorthand)) {
            const Type = shorthand;

            return <Type {...props} />;
        }

        if (isElement(shorthand)) {
            return augmentElement(shorthand, props);
        }

        if (isPlainObject(shorthand)) {
            const { children } = props;
            const { content, ...rest } = shorthand;

            const agumentedProps = augmentElementProps(rest, {
                ...props,
                children: !isNil(content) ? content : children
            });

            return <ComponentType {...agumentedProps} />;
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
