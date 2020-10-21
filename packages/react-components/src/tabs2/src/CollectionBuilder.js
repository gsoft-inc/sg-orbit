// Inspired by https://github.com/adobe/react-spectrum/blob/main/packages/%40react-stately/collections/src/CollectionBuilder.ts

import { Children } from "react";
import { isFunction } from "lodash";

export class CollectionBuilder {
    build(children) {
        return iterable(() => this.iterateCollection(children));
    }

    *iterateCollection(children) {
        const elements = [];

        Children.forEach(children, x => {
            elements.push(x);
        });

        let index = 0;

        for (const element of elements) {
            index++;

            yield this.createItem({
                element,
                index: index
            }, {});
        }
    }

    /*
    - an element could be a "div"
    */
    createItem({ element, index }) {
        if (!isFunction(element.type.getCollectionNode)) {
            throw new Error(`Unknown element <${name}> in collection.`);
        }

        const node = element.type.getCollectionNode(element.props);

        return {
            type: node.type,
            props: node.props,
            ref: element.ref,
            key: element.key ?? index.toString(),
            index
        };
    }
}

function iterable(iterator) {
    const cache = [];

    let current = null;

    return {
        *[Symbol.iterator]() {
            for (const item of cache) {
                yield item;
            }

            if (!current) {
                current = iterator();
            }

            for (const item of current) {
                cache.push(item);
                yield item;
            }
        }
    };
}
