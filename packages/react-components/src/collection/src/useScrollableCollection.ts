import { RefObject, useLayoutEffect, useState } from "react";
import { isNil } from "../../shared";

interface UseScrollableCollectionOptions {
    getMaxHeight?: () => number;
    getBorderHeight?: () => number;
    getPaddingHeight?: () => number;
    itemSelector?: string;
    sectionSelector?: string;
    dividerSelector?: string;
    disabled?: boolean;
}

export function useScrollableCollection(containerRef: RefObject<Element>, {
    getMaxHeight,
    getBorderHeight,
    getPaddingHeight,
    itemSelector,
    sectionSelector,
    dividerSelector,
    disabled
}: UseScrollableCollectionOptions = {}) {
    const [collectionHeight, setCollectionHeight] = useState<string>();

    useLayoutEffect(() => {
        if (!disabled) {
            if (!isNil(containerRef.current)) {
                const borderHeight = !isNil(getBorderHeight) ? getBorderHeight() : 0;
                const paddingHeight = !isNil(getPaddingHeight) ? getPaddingHeight() : 0;
                const maxHeight = !isNil(getMaxHeight) ? getMaxHeight() + borderHeight + paddingHeight : 500;

                let height = borderHeight + paddingHeight;

                containerRef.current.querySelectorAll([itemSelector, sectionSelector, dividerSelector].filter(x => x).join(", ")).forEach((x: Element) => {
                    const elementHeight = x.getBoundingClientRect().height;

                    if (height + elementHeight > maxHeight) {
                        return false;
                    }

                    height += elementHeight;
                });

                setCollectionHeight(`${height}px`);
            }
        }
    }, [containerRef, getMaxHeight, getBorderHeight, getPaddingHeight, itemSelector, sectionSelector, dividerSelector, disabled]);

    return isNil(collectionHeight) ? {} : {
        style: {
            height: collectionHeight
        }
    };
}
