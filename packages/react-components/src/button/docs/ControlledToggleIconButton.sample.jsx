import { CheckIcon } from "@react-components/icons";
import { ToggleIconButton } from "@react-components/button";
import { useState } from "react";

export function ControlledToggleIconButton() {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <ToggleIconButton
            checked={isChecked}
            value="isActive"
            variant="outline"
            color={isChecked ? "primary" : undefined}
            onChange={() => {
                setIsChecked(x => !x);
                console.log(!isChecked);
            }}
        >
            <CheckIcon />
        </ToggleIconButton>
    );
}
