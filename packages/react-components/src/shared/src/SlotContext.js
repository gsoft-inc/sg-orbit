// For more info about slots architecture please read https://github.com/adobe/react-spectrum/blob/main/rfcs/2019-v3-slots.md.

import { createContext, useContext } from "react";
import { isNil } from "lodash";

export const SlotContext = createContext();

export const SlotProvider = SlotContext.Provider;

export function useSlotContext() {
    return useContext(SlotContext);
}

export function useSlotProps({ slot: slotProp }, defaultSlot) {
    const context = useSlotContext();

    if (!isNil(context)) {
        const slot = slotProp ?? defaultSlot;

        const props = !isNil(slot)
            ? context[slot] ?? {}
            : {};

        return [props, true];
    }

    return [{}, false];
}

export function ClearSlots({ children }) {
    return (
        <SlotContext.Provider value={null}>
            {children}
        </SlotContext.Provider>
    );
}
