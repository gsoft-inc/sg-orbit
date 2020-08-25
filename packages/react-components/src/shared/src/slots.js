// Copied from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/utils/src/Slots.tsx.
// For more info about the slots architecture please read https://github.com/adobe/react-spectrum/blob/main/rfcs/2019-v3-slots.md.

import { SIZE } from "./size";
import { createContext, useContext } from "react";
import { mergeProps } from "./mergeProps";

export const SlotContext = createContext({});

export function useSlotProps(props, defaultSlot) {
    const key = props.slot || defaultSlot;
    const { [key]: slotProps = {} } = useContext(SlotContext);

    return mergeProps(props, slotProps);
}

export function SlotProvider({ slots, children }) {
    const parentSlots = useContext(SlotContext);

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

export function createSizeAdapterSlotFactory(sizeAdapter) {
    return ({ size, ...rest }) => {
        return {
            ...rest,
            size: sizeAdapter[size || SIZE.medium]
        };
    };
}
