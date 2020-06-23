import { augmentElement } from "./augmentElement";
import { isString } from "lodash";
import { isValidElementType } from "react-is";

export function createOrAugmentElement() {
    return (element, props = {}) => {
        if (isValidElementType(element) && !isString(element)) {
            const Type = element;

            return <Type {...props} />;
        }

        return augmentElement(element, props);
    };
}
