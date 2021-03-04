import { Children, ComponentType, ReactElement, ReactNode, useMemo } from "react";
import { augmentElement, resolveChildren } from "../../shared";
import { isNil, isString, isUndefined } from "lodash";

const SlotKey = "__slot__";

interface SlottableType {
    [SlotKey]?: string;
}

function slotDecorator<P>(slotName: string, ElementType: P) {
    (ElementType as Record<string, unknown>)[SlotKey] = slotName;

    return ElementType;
}

export { slotDecorator as slot };

function findSlots(children: ReactNode, slots: string[]) {
    return Children
        .toArray(children)
        .reduce((acc: Record<string, any>, x: ReactElement) => {
            if (!isNil(x)) {
                const slotKey = (x.props && x.props["slot"]) ?? (x.type && (x.type as SlottableType)[SlotKey]);

                if (!isNil(slotKey) && slots.includes(slotKey)) {
                    acc[slotKey] = x;
                }
            }

            return acc;
        }, {}) as Record<string, any>;
}

export function getRawSlots(children: ReactNode, slots: string[]) {
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

export function useRawSlots(children: ReactNode, slots: string[]) {
    return useMemo(() => getRawSlots(children, slots), [children, slots]);
}

interface Slots {
    _: {
        defaultWrapper?: ComponentType;
        required?: string[];
    },
    [x: string]: any;
}

export function getSlots(children: ReactNode, { _ = {}, ...slots }: Slots) {
    if (isNil(children)) {
        return {};
    }

    let slotElements: Record<string, any> = {};

    children = resolveChildren(children);

    if (!isString(children)) {
        slotElements = findSlots(children, Object.keys(slots));
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
            const wrapperSlot = (Wrapper as SlottableType)[SlotKey];

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

export function useSlots(children: ReactElement, slots: Slots) {
    return useMemo(() => getSlots(children, slots), [children, slots]);
}
