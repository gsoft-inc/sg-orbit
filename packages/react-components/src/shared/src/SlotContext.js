// Original code have been copied from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/utils/src/Slots.tsx.
// For more info about the slots architecture please read https://github.com/adobe/react-spectrum/blob/main/rfcs/2019-v3-slots.md.

import { createContext, useContext, useMemo } from "react";
import { getSize } from "./size";
import { isNil } from "lodash";

export const SlotContext = createContext(null);

export function useSlotContext() {
    return useContext(SlotContext) || {};
}

export function useSlot({ slot: slotProp }, defaultSlot) {
    const slot = slotProp ?? defaultSlot;
    const context = useSlotContext();

    return !isNil(slot)
        ? context[slot] ?? {}
        : {};
}

export function SlotProvider({ slots, children }) {
    const parentContext = useContext(SlotContext);

    const value = useMemo(() => {
        if (isNil(slots)) {
            return parentContext;
        }

        const parentSlots = parentContext ?? {};

        return Object.keys(parentSlots)
            .concat(Object.keys(slots))
            .reduce((acc, key) => {
                acc[key] = {
                    ...(parentSlots[key] ?? {}),
                    ...(slots[key] ?? {})
                };

                return acc;
            }, slots);
    }, [slots, parentContext]);

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
