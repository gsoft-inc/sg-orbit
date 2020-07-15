import { ToggleButton } from "@react-components/button";
import { useState } from "react";

export function ControlledToggleButton() {
    const [isSelected, setIsSelected] = useState(false);

    const labelStyle = {
        width: "80px"
    };

    return (
        <>
            <div className="mb6">
                <span className="dib fw6" style={labelStyle}>selected:</span> {isSelected ? "true" : "false"}
            </div>
            <ToggleButton
                selected={isSelected}
                value="isActive"
                color={isSelected ? "primary" : undefined}
                onChange={() => { setIsSelected(x => !x); }}
            >
                {isSelected ? "On" : "Off"}
            </ToggleButton>
        </>
    );
}
