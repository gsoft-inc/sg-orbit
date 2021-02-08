import { createContext, useContext } from "react";
import { isNil } from "lodash";

interface CheckableContextProps {
    checkedValue?: boolean;
    [x: string]: any;
}

export const CheckableContext = createContext<CheckableContextProps>();

export function useCheckableContext() {
    const context = useContext(CheckableContext);

    if (!isNil(context)) {
        return [context, true];
    }

    return [context, false];
}

export function useCheckableProps({ value }: { value: boolean }): [{ checked: boolean } & any, boolean] {
    const [context, isCheckable] = useCheckableContext();

    if (isCheckable) {
        const { checkedValue, ...rest } = context;

        const props = {
            checked: Array.isArray(checkedValue) ? checkedValue.includes(value) : checkedValue === value,
            ...rest
        };

        return [props, true];
    }

    return [{}, false];
}
