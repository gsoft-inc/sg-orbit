import { Children, ComponentType, ReactElement, ReactNode, useMemo } from "react";
import { augmentElement, resolveChildren } from "../../shared";
import { isNil, isString, isUndefined } from "lodash";

const SLOT_KEY = "__slot__";

interface SlottedElement {
    [SLOT_KEY]?: string;
}

function slotDecorator<P>(slotName: string, ElementType: P): P {
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


function findSlots(children: ReactNode, slots: string[]): Record<string, any> {
    return Children.toArray(children).reduce((acc: Record<string, any>, x: ReactNode) => {
        if (!isNil(x)) {
            const reactElement = x as ReactElement;
            const slotKey = (reactElement.props && reactElement.props["slot"]) ?? (reactElement.type && (reactElement.type as SlottedElement)[SLOT_KEY]);

            if (!isNil(slotKey) && slots.includes(slotKey)) {
                acc[slotKey] = x;
            }
        }

        return acc;
    }, {}) as Record<string, any>;
}

export function parseSlots(children: ReactNode, slots: string[]): Record<string, any> {
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

export function getSlots(children: ReactNode, { _ = {}, ...slots }: Slots): Record<string, any> {
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
            const wrapperSlot = (Wrapper as SlottedElement)[SLOT_KEY];

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

export function useSlots(children: ReactElement, slots: Slots): Record<string, any> {
    return useMemo(() => getSlots(children, slots), [children, slots]);
}
