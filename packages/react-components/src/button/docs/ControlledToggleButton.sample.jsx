import { ToggleButton } from "@react-components/button";
import { useState } from "react";

export function ControlledToggleButton() {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <ToggleButton
            checked={isChecked}
            value="isActive"
            color={isChecked ? "primary" : undefined}
            onChange={() => {
                setIsChecked(x => !x);
                console.log(!isChecked);
            }}
        >
            {isChecked ? "On" : "Off"}
        </ToggleButton>
    );
}
