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
    const slotElements = {};

    if (!isString(children)) {
        const slotsKeys = Object.keys(slots);

        Children.forEach(children, x => {
            if (!isNil(x)) {
                const slot = (x.props && x.props["slot"]) ?? (x.type && x.type[SLOT_KEY]);

                if (!isNil(slot) && slotsKeys.includes(slot)) {
                    slotElements[slot] = x;
                }
            }
        });
    }

    const { required, default: defaultMetadata } = _;

    if (!isNil(required)) {
        const unfulfilledSlots = [];

        required.forEach(x => {
            if (isUndefined(slotElements[x])) {
                unfulfilledSlots.push(x);

            }
        });

        if (unfulfilledSlots.length !== 0) {
            throw new Error(`Required slot${unfulfilledSlots.length > 1 ? "s" : ""} ${unfulfilledSlots.map(x => `"${x}"`).join(", ")} must receive a component.`);
        }
    }

    if (!isNil(defaultMetadata)) {
        if (Object.keys(slotElements).length === 0) {
            const { slot: defaultSlot, wrapper: Wrapper } = defaultMetadata;

            if (isNil(defaultSlot)) {
                throw new Error("Slot default metadata requires a `slot` property.");
            }

            if (isNil(Wrapper)) {
                throw new Error("Slot default metadata requires a `wrapper` property.");
            }

            slotElements[defaultSlot] = (
                <Wrapper>
                    {children}
                </Wrapper>
            );
        }
    }

    Object.keys(slotElements).forEach(x => {
        const slotProps = slots[x];

        if (!isNil(slotProps)) {
            slotElements[x] = augmentElement(slotElements[x], slotProps);
        }
    });

    return slotElements;
}

export function useSlots(children, slots) {
    return useMemo(() => getSlots(children, slots), [children, slots]);
}
