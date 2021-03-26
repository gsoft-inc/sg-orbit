import { createContext, useContext } from "react";
import { cssModule, normalizeSize } from "../../shared";
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

export function useFieldLabelProps({ as: asProp }) {
    const [{ isGroupField, fieldId, labelId, required, size, labelClassName }, isInField] = useFieldContext();

    const as = isNil(asProp)
        ? isGroupField ? "span" : "label"
        : asProp;

    const props = isInField && {
        id: labelId,
        required,
        size,
        htmlFor: as === "label" ? fieldId : undefined,
        className: cssModule(labelClassName, normalizeSize(size)),
        as
    };

    return [props || {}, isInField];
}

export function useFieldInputProps() {
    const [{
        isGroupField,
        validationState,
        fieldId,
        required,
        fluid,
        size,
        disabled,
        inputClassName
    }, isInField] = useFieldContext();

    const props = isInField && {
        validationState,
        id: !isGroupField ? fieldId : undefined,
        required,
        disabled,
        fluid,
        size,
        className: inputClassName
    };

    return [props || {}, isInField];
}

export function useFieldMessageProps() {
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
        className: cssModule(messageClassName, normalizeSize(size)),
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
