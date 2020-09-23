// Initial code have been copied from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/utils/src/Slots.tsx.
// For more info about the slots architecture please read https://github.com/adobe/react-spectrum/blob/main/rfcs/2019-v3-slots.md.

import { createContext, useContext } from "react";
import { getSize } from "./size";
import { isNil } from "lodash";
import { mergeProps } from "./mergeProps";

export const SlotContext = createContext(null);

export function useSlotContext(slot) {
    const context = useContext(SlotContext);

    if (!isNil(context)) {
        const slots = Array.isArray(slot) ? slot : [slot];

        const props = slots.reduce((acc, x) => {
            const slotProps = context[x];

            if (!isNil(slotProps)) {
                acc.push(slotProps);
            }

            return acc;
        }, []);

        return mergeProps(...props);
    }

    return {};
}

export function useSlot(slot) {
    return useSlotContext(slot);
}

export function SlotProvider({ slots, children }) {
    const parentSlots = useContext(SlotContext) || {};

    const value = Object.keys(parentSlots)
        .concat(Object.keys(slots))
        .reduce((acc, key) => {
            acc[key] = {
                ...(parentSlots[key] ?? {}),
                ...(slots[key] ?? {})
            };

            return acc;
        }, slots);

    return (
        <SlotContext.Provider value={value}>
            {children}
        </SlotContext.Provider>
    );
}

export function ClearSlots({ children }) {
    return (
        <SlotContext.Provider value={null}>
            {children}
        </SlotContext.Provider>
    );
}

export function createSizeAdapterSlotFactory(sizeAdapter) {
    return ({ size, ...rest }) => {
        return {
            ...rest,
            size: sizeAdapter[getSize(size)]
        };
    };
}
