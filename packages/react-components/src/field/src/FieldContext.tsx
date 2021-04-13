import { ElementType, ReactNode, createContext, useContext } from "react";
import { cssModule, normalizeSize } from "../../shared";
import { isNil } from "lodash";

export interface FieldContextType {
    inputId?: string;
    labelId?: string;
    messageId?: string;
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
    const [{ isGroup, inputId, labelId, required, size, labelClassName }, isInField] = useFieldContext();

    const as = isNil(asProp)
        ? isGroup ? "span" : "label"
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

export type UseFieldInputPropsReturn = {
    validationState?: "valid" | "invalid";
    id?: string;
    required?: boolean;
    disabled?: boolean;
    fluid?: boolean;
    size?: "sm" | "md";
    className?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
};

export function useFieldInputProps(): [UseFieldInputPropsReturn, boolean] {
    const [{
        isGroup,
        validationState,
        inputId,
        required,
        fluid,
        size,
        disabled,
        inputClassName
    }, isInField] = useFieldContext();

    const props = isInField && {
        validationState,
        id: !isGroup ? inputId : undefined,
        required,
        disabled,
        fluid,
        size,
        className: inputClassName
    };

    return [props || {}, isInField];
}

export type UseFieldMessagePropsReturn = {
    id?: string;
    size?: "sm" | "md";
    fluid?: boolean;
    validationState?: "valid" | "invalid";
    className?: string;
    "aria-live"?: "polite";
}

export function useFieldMessageProps(): [UseFieldMessagePropsReturn, boolean] {
    const [{
        messageId,
        size,
        fluid,
        validationState,
        messageClassName
    }, isInField] = useFieldContext();

    const props: UseFieldMessagePropsReturn = isInField && {
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
