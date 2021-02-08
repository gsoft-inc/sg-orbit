import { augmentElement, resolveChildren } from "..";
import { isNil, isString, isUndefined } from "lodash";
import React, { Children, ComponentType, ReactElement, ReactNode, useMemo } from "react";

const SLOT_KEY = "__slot__";

interface SlottedElement {
    [SLOT_KEY]?: string;
}

function slotDecorator<P>(slotName: string, ElementType: P) {
    (ElementType as Record<string, unknown>)[SLOT_KEY] = slotName;

    return ElementType;
}

export { slotDecorator as slot };

interface Slots {
    _: {
        defaultWrapper?: ComponentType;
        required?: string[];
    },
    [x: string]: any;
}

export function getSlots(children: ReactNode, { _ = {}, ...slots }: Slots) {
    const slotElements: Record<string, unknown> = {};

    children = resolveChildren(children);

    if (!isString(children)) {
        const slotsKeys = Object.keys(slots);

        Children.forEach(children, x => {
            if (!isNil(x)) {
                const reactComponent = x as ReactElement;
                const slot = (reactComponent.props && reactComponent.props["slot"]) ?? (reactComponent.type && (reactComponent.type as SlottedElement)[SLOT_KEY]);

                if (!isNil(slot) && slotsKeys.includes(slot)) {
                    slotElements[slot] = x;
                }
            }
        });
    }

    const { required, defaultWrapper: Wrapper } = _;

    if (!isNil(required)) {
        const unfulfilledSlots: string[] = [];

        required.forEach(x => {
            if (isUndefined(slotElements[x])) {
                unfulfilledSlots.push(x);
            }
        });

        if (unfulfilledSlots.length !== 0) {
            throw new Error(`Required slot${unfulfilledSlots.length > 1 ? "s" : ""} ${unfulfilledSlots.map(x => `"${x}"`).join(", ")} must receive a component.`);
        }
    }

    if (!isNil(Wrapper)) {
        if (Object.keys(slotElements).length === 0 && !isNil(children)) {
            const wrapperSlot = (Wrapper as SlottedElement)[SLOT_KEY];

            if (isNil(wrapperSlot)) {
                throw new Error("A default wrapper should have a slot key.");
            }

            slotElements[wrapperSlot] = <Wrapper>{children}</Wrapper>;
        }
    }

    Object.keys(slotElements).forEach(x => {
        const slotProps = slots[x];

        if (!isNil(slotProps)) {
            slotElements[x] = augmentElement(slotElements[x] as ReactElement, slotProps);
        }
    });

    return slotElements;
}

export function useSlots(children: ReactElement, slots: Slots) {
    return useMemo(() => getSlots(children, slots), [children, slots]);
}
