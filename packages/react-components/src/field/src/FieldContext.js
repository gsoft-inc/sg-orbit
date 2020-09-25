import { createContext, useContext } from "react";
import { cssModule, getSizeClass } from "../../shared";
import { isNil } from "lodash";

export const FieldContext = createContext(null);

export function useFieldContext() {
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

export function useFieldLabel({ as: asProp }) {
    const [{ isGroupField, inputId, labelId, required, size, labelClassName }, isInField] = useFieldContext();

    const as = isNil(asProp)
        ? isGroupField ? "span" : "label"
        : asProp;

    const props = isInField && {
        id: labelId,
        required,
        size,
        htmlFor: as === "label" && inputId,
        className: cssModule(labelClassName, getSizeClass(size)),
        as
    };

    return [props || {}, isInField];
}

export function useFieldInput() {
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

export function useFieldMessage() {
    const [{
        messageId,
        size,
        fluid,
        validationState,
        messageClassName
    }, isInField] = useFieldContext();

    const props = isInField && {
        id: messageId,
        size,
        fluid,
        validationState,
        className: cssModule(messageClassName, getSizeClass(size)),
        "aria-live": "polite"
    };

    return [props || {}, isInField];
}

export function ClearFieldContext({ children }) {
    return (
        <FieldContext.Provider value={null}>
            {children}
        </FieldContext.Provider>
    );
}
