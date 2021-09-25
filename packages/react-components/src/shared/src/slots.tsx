import { Children, ComponentType, ReactElement, ReactNode, useMemo } from "react";
import { augmentElement } from "./augmentElement";
import { isEmptyArray, isFunction, isNil, isString, isUndefined } from "./assertions";
import { resolveChildren } from "./resolveChildren";

const SlotKey = "__slot__";

export interface SlotableType {
    [SlotKey]?: string;
}

function slotDecorator<P>(slotName: string, ElementType: P) {
    (ElementType as Record<string, unknown>)[SlotKey] = slotName;

    return ElementType;
}

export { slotDecorator as slot };

export function getSlotKey(element: ReactElement) {
    return (element.props && element.props["slot"]) ?? (element.type && (element.type as SlotableType)[SlotKey]);
}

export type SlotElements = Record<string, ReactElement>;

function findSlots(children: ReactNode, slots: string[]) {
    return Children
        .toArray(children)
        .reduce((acc: SlotElements, x: ReactElement) => {
            if (!isNil(x)) {
                const slotKey = getSlotKey(x);

                if (!isNil(slotKey) && slots.includes(slotKey)) {
                    acc[slotKey] = x;
                }
            }

            return acc;
        }, {}) as SlotElements;
}

export function getRawSlots(children: ReactNode, slots: string[]): Record<string, any> {
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

export interface SlotOptions {
    _: {
        defaultWrapper?: ComponentType<any>;
        required?: string[] | ((slotElements: SlotElements) => string[]);
    };
}

type GetSlotsReturn<T extends SlotOptions> = {
    [key in keyof Omit<T, "_">]?: ReactElement;
};

export function getSlots<T extends SlotOptions>(children: ReactNode, { _ = {}, ...slots }: T): GetSlotsReturn<T> {
    if (isNil(children)) {
        return {};
    }

    let slotElements: SlotElements = {};

    children = resolveChildren(children);

    if (!isString(children)) {
        slotElements = findSlots(children, Object.keys(slots));
    }

    const { defaultWrapper: Wrapper, required } = _;

    if (!isNil(required)) {
        let unfulfilledSlots: string[] = [];

        if (isFunction(required)) {
            unfulfilledSlots = required(slotElements);
        } else {
            required.forEach(x => {
                if (isUndefined(slotElements[x])) {
                    unfulfilledSlots.push(x);
                }
            });
        }

        if (!isNil(unfulfilledSlots) && unfulfilledSlots.length !== 0) {
            throw new Error(`Required slot${unfulfilledSlots.length > 1 ? "s" : ""} ${unfulfilledSlots.map(x => `"${x}"`).join(", ")} must receive a component.`);
        }
    }

    if (!isNil(Wrapper)) {
        if (isEmptyArray(Object.keys(slotElements)) && !isNil(children)) {
            const wrapperSlot = (Wrapper as SlotableType)[SlotKey];

            if (isNil(wrapperSlot)) {
                throw new Error("A default wrapper must have a slot key.");
            }

            slotElements[wrapperSlot] = (
                <Wrapper>
                    {children}
                </Wrapper>
            );
        }
    }

    Object.keys(slotElements).forEach(x => {
        let slotProps = (slots as Record<string, any>)[x];

        if (isFunction(slotProps)) {
            slotProps = slotProps(slotElements[x], slotElements);
        }

        if (!isNil(slotProps)) {
            slotElements[x] = augmentElement(slotElements[x] as ReactElement, slotProps);
        }
    });

    return slotElements as GetSlotsReturn<T>;
}

type UseSlotsReturn<T extends SlotOptions> = GetSlotsReturn<T>;

export function useSlots<T extends SlotOptions>(children: ReactNode, slots: T): UseSlotsReturn<T> {
    return useMemo(() => getSlots(children, slots), [children, slots]);
}
