import { isNil } from "lodash";
import { mergeProps } from "../../shared";

export function HiddenSelect({ name, selectedKey, required, validationState, ...rest }) {
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
