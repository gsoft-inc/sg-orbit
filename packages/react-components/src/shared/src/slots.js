import { Children, useMemo } from "react";
import { augmentElement, resolveChildren } from "../../shared";
import { isNil, isString, isUndefined } from "lodash";

const SLOT_KEY = "__slot__";

function slotDecorator(slotName, ElementType) {
    ElementType[SLOT_KEY] = slotName;

    return ElementType;
}

export { slotDecorator as slot };

function findSlots(children, slots) {
    return Children.toArray(children).reduce((acc, x) => {
        if (!isNil(x)) {
            const slotKey = (x.props && x.props["slot"]) ?? (x.type && x.type[SLOT_KEY]);

            if (!isNil(slotKey) && slots.includes(slotKey)) {
                acc[slotKey] = x;
            }
        }

        return acc;
    }, {});
}

export function parseSlots(children, slots) {
    if (isNil(children)) {
        return {};
    }

    children = resolveChildren(children);

    if (!isString(children)) {
        return findSlots(children, slots);
    }

    return {
        stringValue: children
    };
}

export function getSlots(children, { _ = {}, ...slots }) {
    if (isNil(children)) {
        return {};
    }

    let slotElements = {};

    children = resolveChildren(children);

    if (!isString(children)) {
        slotElements = findSlots(children, Object.keys(slots));
    }

    const { required, defaultWrapper: Wrapper } = _;

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

    if (!isNil(Wrapper)) {
        if (Object.keys(slotElements).length === 0 && !isNil(children)) {
            const wrapperSlot = Wrapper[SLOT_KEY];

            if (isNil(wrapperSlot)) {
                throw new Error("A default wrapper should have a slot key.");
            }

            slotElements[wrapperSlot] = (
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
