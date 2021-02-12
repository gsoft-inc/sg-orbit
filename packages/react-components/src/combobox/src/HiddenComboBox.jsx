import { bool, oneOf, string } from "prop-types";
import { isNil } from "lodash";
import { mergeProps } from "../../shared";

const propTypes = {
    /**
     * Name of the element. Used by the server to identify the fields in form submits. View [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes).
     */
    name: string,
    /**
     * A controlled selected key.
     */
    selectedKey: string,
    /**
     * Whether or not a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether or not the select should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"])
};

export function HiddenComboBox({ name, selectedKey, required, validationState, ...rest }) {
    if (isNil(name)) {
        return null;
    }

    return (
        <input
            {...mergeProps(
                rest,
                {
                    type: "hidden",
                    value: selectedKey ?? "",
                    "aria-required": required,
                    "aria-invalid": validationState === "invalid"
                }
            )}
        />
    );
}

HiddenComboBox.propTypes = propTypes;
HiddenComboBox.displayName = "HiddenComboBox";
