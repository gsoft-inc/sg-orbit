import { Checkbox } from "@react-components/checkbox";
import { useState } from "react";

export function ControlledCheckbox() {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <>
            <div className="mb6">
                <span className="dib fw6">checked:</span> {isChecked ? "true" : "false"}
            </div>
            <Checkbox
                checked={isChecked}
                color={isChecked ? "primary" : undefined}
                onChange={() => { setIsChecked(x => !x); }}
            >
                {isChecked ? "On" : "Off"}
            </Checkbox>
        </>
    );
}
