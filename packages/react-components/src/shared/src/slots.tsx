import { Children, ComponentType, ReactElement, ReactNode, useMemo } from "react";
import { augmentElement, isFunction, isNil, isString, isUndefined, resolveChildren } from "../../shared";

const SlotKey = "__slot__";

interface SlotableType {
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
                const slotKey = (x.props && x.props["slot"]) ?? (x.type && (x.type as SlotableType)[SlotKey]);

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

interface SlotOptions {
    _: {
        defaultWrapper?: ComponentType<any>;
        required?: string[];
    };
}

type SlotElements<T extends SlotOptions> = {
    [key in keyof Omit<T, "_">]?: ReactElement;
}

export function getSlots<T extends SlotOptions>(children: ReactNode, { _ = {}, ...slots }: T): SlotElements<T> {
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
            const wrapperSlot = (Wrapper as SlotableType)[SlotKey];

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
        let slotProps = (slots as Record<string, any>)[x];

        if (isFunction(slotProps)) {
            slotProps = slotProps(slotElements[x], slotElements);
        }

        if (!isNil(slotProps)) {
            slotElements[x] = augmentElement(slotElements[x], slotProps);
        }
    });

    return slotElements as SlotElements<T>;
}

export function useSlots<T extends SlotOptions>(children: ReactNode, slots: T) {
    return useMemo(() => getSlots(children, slots), [children, slots]);
}
