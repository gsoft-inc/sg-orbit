import { isNil } from "lodash";

export function HiddenSelect({ name, selectedKey, required, validationState, ...rest }) {
    if (isNil(name)) {
        return null;
    }

    return (
        <input
            {...rest}
            type="hidden"
            value={selectedKey ?? ""}
            aria-required={required}
            aria-invalid={validationState === "invalid"}
        />
    );
}
