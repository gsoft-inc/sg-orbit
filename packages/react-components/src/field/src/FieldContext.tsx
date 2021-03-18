import { ElementType, ReactNode, createContext, useContext } from "react";
import { cssModule, normalizeSize } from "../../shared";
import { isNil } from "lodash";

export interface CommonFieldContextType {
    inputId?: string;
    labelId?: string;
    messageId?: string
    required?: boolean;
    disabled?: boolean;
    size?: "sm" | "md";
    fluid?: boolean;
    validationState?: "valid" | "invalid";
    hasLabel?: boolean;
    hasMessage?: boolean;
    labelClassName?: string;
    inputClassName?: string;
    messageClassName?: string;
}

export interface FieldContextType extends CommonFieldContextType {
    isGroup?: boolean;
}

export interface UseFieldContextType extends CommonFieldContextType {
    isGroupField?: boolean;
}

export const FieldContext = createContext<FieldContextType>(null);

export function useFieldContext(): [UseFieldContextType, boolean] {
    const context = useContext(FieldContext);

    if (!isNil(context)) {
        const { isGroup: isGroupField = false, ...rest } = context;

        const props = {
            ...rest,
            isGroupField
        };

        return [props, true];
    }

    return [{}, false];
}

export interface UseFieldLabelProps {
    as?: ElementType;
}

export type UseFieldLabelPropsReturn = [{
    id?: string;
    required?: boolean;
    size?: "sm" | "md";
    htmlFor?: string;
    className?: string;
    as?: ElementType;
}, boolean]

export function useFieldLabelProps({ as: asProp }: UseFieldLabelProps): UseFieldLabelPropsReturn {
    const [{ isGroupField, inputId, labelId, required, size, labelClassName }, isInField] = useFieldContext();

    const as = isNil(asProp)
        ? isGroupField ? "span" : "label"
        : asProp;

    const props = isInField && {
        id: labelId,
        required,
        size,
        htmlFor: as === "label" ? inputId : undefined,
        className: cssModule(labelClassName, normalizeSize(size)),
        as
    };

    return [props || {}, isInField];
}

export type UseFieldInputPropsReturn = [{
    validationState?: "valid" | "invalid";
    id?: string;
    required?: boolean;
    disabled?: boolean;
    fluid?: boolean;
    size?: "sm" | "md";
    className?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
}, boolean];

export function useFieldInputProps(): UseFieldInputPropsReturn {
    const [{
        validationState,
        inputId,
        labelId,
        messageId,
        required,
        fluid,
        size,
        disabled,
        inputClassName
    }, isInField] = useFieldContext();

    const props = isInField && {
        validationState,
        id: inputId,
        required,
        disabled,
        fluid,
        size,
        className: inputClassName,
        "aria-labelledby": !isNil(labelId) ? labelId : undefined,
        "aria-describedby": !isNil(messageId) ? messageId : undefined
    };

    return [props || {}, isInField];
}

export type UseFieldMessagePropsReturn = [{
    id?: string;
    size?: "sm" | "md";
    fluid?: boolean;
    validationState?: "valid" | "invalid";
    className?: string;
    "aria-live"?: "polite";
}, boolean]

export function useFieldMessageProps(): UseFieldMessagePropsReturn {
    const [{
        messageId,
        size,
        fluid,
        validationState,
        messageClassName
    }, isInField] = useFieldContext();

    const props: UseFieldMessagePropsReturn[0] = isInField && {
        id: messageId,
        size,
        fluid,
        validationState,
        className: cssModule(messageClassName, normalizeSize(size)),
        "aria-live": "polite"
    };

    return [props || {}, isInField];
}

interface ClearFieldContextProps {
    children?: ReactNode;
}

export function ClearFieldContext({ children }: ClearFieldContextProps) {
    return (
        <FieldContext.Provider value={null}>
            { children}
        </FieldContext.Provider>
    );
}
