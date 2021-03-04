import { createContext, useContext } from "react";
import { isNil } from "lodash";

type CheckedType = boolean | string | number;

interface CheckableContextType {
    checkedValue?: CheckedType;
    [x: string]: any;
}

export const CheckableContext = createContext<CheckableContextType>(undefined);

export function useCheckableContext(): [CheckableContextType, boolean] {
    const context = useContext(CheckableContext);

    if (!isNil(context)) {
        return [context, true];
    }

    return [context, false];
}

type UseCheckablePropsProps = { value?: CheckedType };
type UseCheckablePropsReturn = [{
    checked?: CheckedType;
    [x: string]: any;
}, boolean];

export function useCheckableProps({ value }: UseCheckablePropsProps): UseCheckablePropsReturn {
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
