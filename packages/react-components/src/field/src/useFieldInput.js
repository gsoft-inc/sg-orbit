import { isNil } from "lodash";
import { useFieldContext } from "./FieldContext";

export function useFieldInput() {
    const [{
        validationState,
        inputId,
        labelId,
        messageId,
        required,
        fluid,
        size,
        disabled
    }, isInField] = useFieldContext();

    const props = isInField && {
        validationState,
        id: inputId,
        required,
        disabled,
        fluid,
        size,
        className: "o-ui-field-input",
        "aria-labelledby": !isNil(labelId) ? labelId : undefined,
        "aria-describedby": !isNil(messageId) ? messageId : undefined
    };

    return [props || {}, isInField];
}
