import { RefObject, useLayoutEffect, useState } from "react";
import { isNil } from "../../shared";

interface UseScrollableCollectionOptions {
    maxHeight?: number;
    borderHeight?: number;
    paddingHeight?: number;
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
    maxHeight = 500,
    borderHeight = 0,
    paddingHeight = 0,
    itemSelector,
    sectionSelector,
    dividerSelector,
    disabled
}: UseScrollableCollectionOptions = {}) {
    const [collectionHeight, setCollectionHeight] = useState<string>();

    useLayoutEffect(() => {
        if (!disabled) {
            if (!isNil(containerRef.current)) {
                const adjustedMaxHeight = maxHeight + borderHeight + paddingHeight;

                let height = borderHeight + paddingHeight;

                const elements = !isNil(itemSelector) || !isNil(sectionSelector) || !isNil(dividerSelector)
                    ? containerRef.current.querySelectorAll([itemSelector, sectionSelector, dividerSelector].filter(x => x).join(", "))
                    : Array.from(containerRef.current.children);

                elements.forEach((x: HTMLElement) => {
                    const outerHeight = getOuterHeight(x);

                    if (height + outerHeight > adjustedMaxHeight) {
                        return false;
                    }

                    height += outerHeight;
                });

                setCollectionHeight(`${height}px`);
            }
        }
    }, [containerRef, maxHeight, borderHeight, paddingHeight, itemSelector, sectionSelector, dividerSelector, disabled]);

    return isNil(collectionHeight) ? {} : {
        style: {
            height: collectionHeight
        }
    };
}
