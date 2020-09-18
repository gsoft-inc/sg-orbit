import { Checkbox } from "@react-components/checkbox";
import { useState } from "react";

export function CheckedValidation() {
    const [isChecked, setIsChecked] = useState(false);

    const isValid = isChecked;

    return (
        <Checkbox
            validationState={isValid ? "valid" : "invalid"}
            checked={isChecked}
            onChange={() => {
                setIsChecked(x => !x);
                console.log(!isChecked);
            }}
        >
            Milky Way
        </Checkbox>
    );
}
