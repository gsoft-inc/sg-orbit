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

function toPixels(value: string) {
    if (isNil(value)) {
        return 0;
    }

    if (value.endsWith("rem")) {
        return parseFloat(value) * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    return parseInt(value);
}

function getOuterHeight(element: HTMLElement) {
    const clientRect = element.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(element);

    return clientRect.height + toPixels(computedStyle.marginTop) + toPixels(computedStyle.marginBottom);
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

                const elements = !isNil(itemSelector) || !isNil(sectionSelector) || !isNil(dividerSelector)
                    ? containerRef.current.querySelectorAll([itemSelector, sectionSelector, dividerSelector].filter(x => x).join(", "))
                    : Array.from(containerRef.current.children);

                elements.forEach((x: HTMLElement) => {
                    const outerHeight = getOuterHeight(x);

                    if (height + outerHeight > maxHeight) {
                        return false;
                    }

                    height += outerHeight;
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
