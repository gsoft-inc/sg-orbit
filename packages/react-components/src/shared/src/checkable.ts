import { createContext, useContext } from "react";
import { isNil } from "lodash";

interface CheckableContextProps {
    checkedValue?: boolean;
    [x: string]: any;
}

export const CheckableContext = createContext<CheckableContextProps>(null);

export function useCheckableContext() {
    const context = useContext(CheckableContext);

    if (!isNil(context)) {
        return [context, true] as const;
    }

    return [context, false] as const;
}

export function useCheckableProps({ value }: { value: boolean }) {
    const [context, isCheckable] = useCheckableContext();

    if (isCheckable) {
        const { checkedValue, ...rest } = context;

        const props = {
            checked: Array.isArray(checkedValue) ? checkedValue.includes(value) : checkedValue === value,
            ...rest
        };

        return [props, true] as const;
    }

    return [{}, false] as const;
}
