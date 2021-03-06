import { ComponentProps } from "react";
import { isNil, mergeProps } from "../../shared";

export interface HiddenSelectProps extends ComponentProps<"input"> {
    /**
     * Name of the element. Used by the server to identify the fields in form submits. View [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes).
     */
    name?: string;
    /**
     * A controlled selected key.
     */
    selectedKey?: string;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the select should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
}

export function HiddenSelect({ name, selectedKey, required, validationState, ...rest }: HiddenSelectProps) {
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
                    "aria-required": required ? true : undefined,
                    "aria-invalid": validationState === "invalid" ? true : undefined
                }
            )}
        />
    );
}

HiddenSelect.displayName = "HiddenSelect";
