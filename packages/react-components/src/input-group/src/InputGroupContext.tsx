import { ReactNode, createContext, useContext } from "react";
import { UseFieldInputPropsReturn } from "../../field";
import { UseToolbarPropsReturn } from "../../toolbar";
import { isNil, mergeProps } from "../../shared";

export type InputGroupContextType = {
    disabled?: boolean;
    fluid?: boolean;
    readOnly?: boolean;
} & UseFieldInputPropsReturn & UseToolbarPropsReturn;

export const InputGroupContext = createContext<InputGroupContextType>(null);

export function useInputGroupContext(): [InputGroupContextType, boolean] {
    const context = useContext(InputGroupContext);

    return !isNil(context)
        ? [context, true]
        : [{}, false];
}

export interface ClearInputGroupContextProps {
    children?: ReactNode;
}

export function ClearInputGroupContext({ children }: ClearInputGroupContextProps) {
    return (
        <InputGroupContext.Provider value={null}>
            {children}
        </InputGroupContext.Provider>
    );
}

/* Inputs */

export type UseInputGroupPropsReturn = {
    className?: string;
    disabled?: boolean;
    fluid?: boolean;
    readOnly?: boolean;
} & UseFieldInputPropsReturn & UseToolbarPropsReturn;

export function useInputGroupProps(): [UseInputGroupPropsReturn, boolean] {
    const [context, isInInputGroup] = useInputGroupContext();

    const props = isInInputGroup && mergeProps(context, {
        className: "o-ui-input-group-input"
    });

    return [props || {}, isInInputGroup];
}

export function useInputGroupTextInputProps(): [UseInputGroupPropsReturn, boolean] {
    const [context, isInInputGroup] = useInputGroupContext();

    const props = isInInputGroup && mergeProps(context, {
        className: "o-ui-input-group-input o-ui-input-group-text-input"
    });

    return [props || {}, isInInputGroup];
}

/* Addons */

export interface UseInputGroupAddonPropsReturn {
    className?: string;
    disabled?: boolean;
}

export function useInputGroupAddonProps(): [UseInputGroupAddonPropsReturn, boolean] {
    const [{ disabled }, isInInputGroup] = useInputGroupContext();

    const props = isInInputGroup && {
        className: "o-ui-input-group-addon",
        disabled
    };

    return [props || {}, isInInputGroup];
}

export interface UseInputGroupButtonAddonPropsReturn {
    className?: string;
    disabled?: boolean;
    shape?: string;
}

export function useInputGroupButtonAddonProps(): [UseInputGroupButtonAddonPropsReturn, boolean] {
    const [{ disabled }, isInInputGroup] = useInputGroupContext();

    const props = isInInputGroup && {
        className: "o-ui-input-group-addon",
        disabled,
        shape: "rounded"
    };

    return [props || {}, isInInputGroup];
}

export interface UseInputGroupMenuAddonPropsReturn {
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
}

export function useInputGroupMenuAddonProps(): [UseInputGroupMenuAddonPropsReturn, boolean] {
    const [{ disabled, readOnly }, isInInputGroup] = useInputGroupContext();

    const props = isInInputGroup && {
        className: "o-ui-input-group-addon",
        disabled,
        readOnly
    };

    return [props || {}, isInInputGroup];
}

export interface UseInputGroupSelectAddonPropsReturn {
    allowResponsiveMenuWidth?: boolean;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
}

export function useInputGroupSelectAddonProps(): [UseInputGroupSelectAddonPropsReturn, boolean] {
    const [{ disabled, readOnly }, isInInputGroup] = useInputGroupContext();

    const props = isInInputGroup && {
        allowResponsiveMenuWidth: false,
        className: "o-ui-input-group-addon o-ui-input-group-select-addon",
        disabled,
        readOnly
    };

    return [props || {}, isInInputGroup];
}
