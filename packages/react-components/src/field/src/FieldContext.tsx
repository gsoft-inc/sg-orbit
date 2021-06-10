import { ElementType, ReactNode, createContext, useContext } from "react";
import { isNil } from "../../shared";

export interface FieldContextType {
    id?: string;
    inputId?: string;
    labelId?: string;
    messageId?: string;
    required?: boolean;
    disabled?: boolean;
    fluid?: boolean;
    validationState?: "valid" | "invalid";
    hasLabel?: boolean;
    hasMessage?: boolean;
    labelClassName?: string;
    inputClassName?: string;
    messageClassName?: string;
    isGroup?: boolean;
}

export const FieldContext = createContext<FieldContextType>(null);

export function useFieldContext(): [FieldContextType, boolean] {
    const context = useContext(FieldContext);

    if (!isNil(context)) {
        const { isGroup = false, ...rest } = context;

        const props = {
            ...rest,
            isGroup
        };

        return [props, true];
    }

    return [{}, false];
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

export interface UseFieldLabelProps {
    as?: ElementType;
}

export interface UseFieldLabelPropsReturn {
    id?: string;
    required?: boolean;
    htmlFor?: string;
    className?: string;
    as?: ElementType;
}

export function useFieldLabelProps({ as: asProp }: UseFieldLabelProps): [UseFieldLabelPropsReturn, boolean] {
    const [{ inputId, labelId, required, labelClassName, isGroup }, isInField] = useFieldContext();

    const as = isNil(asProp)
        ? isGroup ? "span" : "label"
        : asProp;

    const props = isInField && {
        id: labelId,
        required,
        htmlFor: as === "label" ? inputId : undefined,
        className: labelClassName,
        as
    };

    return [props || {}, isInField];
}

export interface UseFieldInputPropsReturn {
    validationState?: "valid" | "invalid";
    id?: string;
    required?: boolean;
    disabled?: boolean;
    fluid?: boolean;
    className?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
}

export function useFieldInputProps(): [UseFieldInputPropsReturn, boolean] {
    const [{
        id,
        inputId,
        labelId,
        messageId,
        validationState,
        required,
        fluid,
        disabled,
        inputClassName,
        isGroup
    }, isInField] = useFieldContext();

    const props = isInField && {
        validationState,
        id: !isGroup ? inputId : undefined,
        name: id,
        required,
        disabled,
        fluid,
        className: inputClassName,
        "aria-labelledby": !isGroup ? (!isNil(labelId) ? labelId : undefined) : undefined,
        "aria-describedby": !isGroup ? (!isNil(messageId) ? messageId : undefined) : undefined
    };

    return [props || {}, isInField];
}

export interface UseFieldMessagePropsReturn {
    id?: string;
    fluid?: boolean;
    validationState?: "valid" | "invalid";
    className?: string;
    "aria-live"?: "polite";
}

export function useFieldMessageProps(): [UseFieldMessagePropsReturn, boolean] {
    const [{
        messageId,
        fluid,
        validationState,
        messageClassName
    }, isInField] = useFieldContext();

    const props: UseFieldMessagePropsReturn = isInField && {
        id: messageId,
        fluid,
        validationState,
        className: messageClassName,
        "aria-live": "polite"
    };

    return [props || {}, isInField];
}
