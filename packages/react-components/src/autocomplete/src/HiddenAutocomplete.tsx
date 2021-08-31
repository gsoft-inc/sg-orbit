import { ComponentProps } from "react";
import { isNil, mergeProps } from "../../shared";

export interface HiddenAutocompleteProps extends ComponentProps<"input"> {
    /**
     * Name of the element. Used by the server to identify the fields in form submits.
     */
    name?: string;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * A controlled selected key.
     */
    selectedKey?: string;
    /**
     * Whether or not the select should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
}

export function HiddenAutocomplete({ name, required, validationState, value, ...rest }: HiddenAutocompleteProps) {
    if (isNil(name)) {
        return null;
    }

    return (
        <input
            {...mergeProps(
                rest,
                {
                    "aria-invalid": validationState === "invalid" ? true : undefined,
                    "aria-required": required ? true : undefined,
                    type: "hidden",
                    value: value ?? ""
                }
            )}
        />
    );
}
