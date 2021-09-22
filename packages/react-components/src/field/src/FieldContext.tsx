import { ElementType, ReactNode, createContext, useContext } from "react";
import { HtmlLabel, Span } from "../../html";
import { isNil } from "../../shared";

export interface FieldContextType {
    disabled?: boolean;
    fluid?: boolean;
    hasLabel?: boolean;
    hasMessage?: boolean;
    id?: string;
    inputClassName?: string;
    inputId?: string;
    isGroup?: boolean;
    labelClassName?: string;
    labelId?: string;
    messageClassName?: string;
    messageId?: string;
    required?: boolean;
    validationState?: "valid" | "invalid";
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

export interface ClearFieldContextProps {
    children?: ReactNode;
}

export function ClearFieldContext({ children }: ClearFieldContextProps) {
    return (
        <FieldContext.Provider value={null}>
            {children}
        </FieldContext.Provider>
    );
}

export interface UseFieldLabelProps {
    as?: ElementType;
}

export interface UseFieldLabelPropsReturn {
    as?: ElementType;
    className?: string;
    htmlFor?: string;
    id?: string;
    required?: boolean;
}

export function useFieldLabelProps({ as: asProp }: UseFieldLabelProps): [UseFieldLabelPropsReturn, boolean] {
    const [{ inputId, isGroup, labelClassName, labelId, required }, isInField] = useFieldContext();

    const as = isNil(asProp)
        ? isGroup ? Span : HtmlLabel
        : asProp;

    const props = isInField && {
        as,
        className: labelClassName,
        htmlFor: as === HtmlLabel ? inputId : undefined,
        id: labelId,
        required
    };

    return [props || {}, isInField];
}

export interface UseFieldInputPropsReturn {
    "aria-describedby"?: string;
    "aria-labelledby"?: string;
    className?: string;
    disabled?: boolean;
    fluid?: boolean;
    id?: string;
    required?: boolean;
    validationState?: "valid" | "invalid";
}

export function useFieldInputProps(): [UseFieldInputPropsReturn, boolean] {
    const [{
        disabled,
        fluid,
        id,
        inputClassName,
        inputId,
        isGroup,
        labelId,
        messageId,
        required,
        validationState
    }, isInField] = useFieldContext();

    const props = isInField && {
        "aria-describedby": !isGroup ? (!isNil(messageId) ? messageId : undefined) : undefined,
        "aria-labelledby": !isGroup ? (!isNil(labelId) ? labelId : undefined) : undefined,
        className: inputClassName,
        disabled,
        fluid,
        id: !isGroup ? inputId : undefined,
        name: id,
        required,
        validationState
    };

    return [props || {}, isInField];
}

export interface UseFieldMessagePropsReturn {
    "aria-live"?: "polite";
    className?: string;
    fluid?: boolean;
    id?: string;
    validationState?: "valid" | "invalid";
}

export function useFieldMessageProps(): [UseFieldMessagePropsReturn, boolean] {
    const [{
        fluid,
        messageClassName,
        messageId,
        validationState
    }, isInField] = useFieldContext();

    const props: UseFieldMessagePropsReturn = isInField && {
        "aria-live": "polite",
        className: messageClassName,
        fluid,
        id: messageId,
        validationState
    };

    return [props || {}, isInField];
}
