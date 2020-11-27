import { Switch } from "@react-components/switch";
import { useState } from "react";

export function CheckedValidation() {
    const [isChecked, setIsChecked] = useState(false);

    const isValid = isChecked;

    return (
        <Switch
            validationState={isValid ? "valid" : "invalid"}
            checked={isChecked}
            onChange={() => {
                setIsChecked(x => !x);
                console.log(!isChecked);
            }}
        >
            Engines
        </Switch>
    );
}
