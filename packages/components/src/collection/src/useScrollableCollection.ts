import { RefObject, useLayoutEffect, useState } from "react";
import { isNil } from "../../shared";

interface UseScrollableCollectionOptions {
    borderHeight?: number;
    disabled?: boolean;
    dividerSelector?: string;
    itemSelector?: string;
    maxHeight?: number;
    paddingHeight?: number;
    sectionSelector?: string;
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
    borderHeight = 0,
    disabled,
    dividerSelector,
    itemSelector,
    maxHeight = 500,
    paddingHeight = 0,
    sectionSelector
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