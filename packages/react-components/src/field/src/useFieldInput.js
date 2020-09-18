import { isNil } from "lodash";
import { useFieldContext } from "./FieldContext";

export function useFieldInput() {
    const {
        isInField,
        validationState,
        inputId,
        labelId,
        messageId,
        required,
        fluid,
        size,
        disabled
    } = useFieldContext();

    if (isInField) {
        return {
            isInField,
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
    }

    return {
        isInField
    };
}
