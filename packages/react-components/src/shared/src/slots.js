// Copied from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/utils/src/Slots.tsx.
// For more info about the slots architecture please read https://github.com/adobe/react-spectrum/blob/main/rfcs/2019-v3-slots.md.

import { SIZE } from "./size";
import { createContext, useContext } from "react";
import { isNil } from "lodash";
import { mergeProps } from "./mergeProps";

export const SlotContext = createContext(null);

// export function useSlotProps(props, defaultSlot) {
//     const key = props.slot || defaultSlot;
//     const { [key]: slotProps = {} } = useContext(SlotContext) || {};

//     return mergeProps(props, slotProps);
// }

// export function useSlotContext(slot) {
//     const context = useContext(SlotContext);

//     if (!isNil(context)) {
//         const slots = Array.isArray(slot) ? slot : [slot];

//         return slots.reduce((slotProps, x) => {


//             // slotProps = isNil(slotProps) ?

//             // if (!isNil(slotProps))

//             // slotProps = mergeProps()
//         }, {});
//     }

//     return {};
// }

// export function useSlotProps(props, defaultSlot) {
//     // const slot = !isNil(props.slot)
//     //     ? [props.slot]
//     //     : !isNil(defaultSlots)
//     //         ? Array.isArray(defaultSlots) ? defaultSlots : [defaultSlots]
//     //         : defaultSlots;

//     const context = useContext(SlotContext);

//     const slotProps = {};

//     if (!isNil(context)) {
//         const slot = props.slot || defaultSlot;
//         const slots = Array.isArray(slot) ? slot : [slot];

//         for (let i = 0; i < slots.length; i += 1) {

//         }
//     }

//     // const { [key]: slotProps = {} } = useContext(SlotContext);

//     return mergeProps(props, slotProps);
// }

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
        <SlotContext.Provider value={{}}>
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
