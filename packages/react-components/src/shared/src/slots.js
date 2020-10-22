import { Children, useMemo } from "react";
import { augmentElement } from "../../shared";
import { isNil, isString, isUndefined } from "lodash";

const SLOT_KEY = "__slot__";

function slotDecorator(slotName, ElementType) {
    ElementType[SLOT_KEY] = slotName;

    return ElementType;
}

export { slotDecorator as slot };

export function getSlots(children, { _ = {}, ...slots }) {
    const elements = {};

    if (!isString(children)) {
        const slotsKeys = Object.keys(slots);

        Children.forEach(children, x => {
            if (!isNil(x)) {
                const slot = (x.props && x.props["slot"]) ?? (x.type && x.type[SLOT_KEY]);

                if (!isNil(slot)) {
                    if (slotsKeys.includes(slot)) {
                        elements[slot] = x;
                    }
                }
            }
        });
    }

    const { required, default: defaultMetadata } = _;

    if (!isNil(required)) {
        const unfulfilledSlots = [];

        required.forEach(x => {
            if (isUndefined(elements[x])) {
                unfulfilledSlots.push(x);

            }
        });

        if (unfulfilledSlots.length !== 0) {
            throw new Error(`Required slot${unfulfilledSlots.length > 1 ? "s" : ""} ${unfulfilledSlots.map(x => `"${x}"`).join(", ")} must receive a component.`);
        }
    }

    if (!isNil(defaultMetadata)) {
        if (Object.keys(elements).length === 0) {
            const { slot: defaultSlot, wrapper: Wrapper } = defaultMetadata;

            elements[defaultSlot] = (
                <Wrapper>
                    {children}
                </Wrapper>
            );
        }
    }

    Object.keys(elements).forEach(x => {
        const slotProps = slots[x];

        if (!isNil(slotProps)) {
            elements[x] = augmentElement(elements[x], slotProps);
        }
    });

    return elements;
}

export function useSlots(children, slots) {
    return useMemo(() => getSlots(children, slots), [children, slots]);
}
