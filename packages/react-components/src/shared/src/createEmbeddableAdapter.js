import { SIZE } from "./size";
import { augmentElement } from "./augmentElement";

export function createEmbeddableAdapter(sizeAdapter) {
    return (element, props = {}) => {
        const newProps = {
            ...props,
            size: sizeAdapter[props.size || SIZE.medium]
        };

        return augmentElement(element, newProps);
    };
}
