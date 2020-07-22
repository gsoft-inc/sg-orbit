import { Checkbox } from "@react-components/checkbox";
import { useState } from "react";

export function ControlledCheckbox() {
    const [isChecked, setIsChecked] = useState(false);

    console.log(isChecked);

    return (
        <Checkbox
            checked={isChecked}
            onChange={() => { setIsChecked(x => !x); }}
        >
            {isChecked ? "On" : "Off"}
        </Checkbox>
    );
}
