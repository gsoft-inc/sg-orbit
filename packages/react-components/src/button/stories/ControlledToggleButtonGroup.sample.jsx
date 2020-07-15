import { ToggleButton, ToggleButtonGroup } from "@react-components/button";
import { useState } from "react";

export function ControlledToggleButtonGroup() {
    const [value, setValue] = useState(null);

    const labelStyle = {
        width: "80px"
    };

    return (
        <>
            <div className="mb6">
                <span className="dib fw6" style={labelStyle}>value:</span> {JSON.stringify(value, null, 4)}
            </div>
            <ToggleButtonGroup
                value={value}
                onChange={(event, x) => { setValue(x); }}
            >
                <ToggleButton value="none" variant="outline">None</ToggleButton>
                <ToggleButton value="1" variant="outline" circular>1</ToggleButton>
                <ToggleButton value="2" variant="outline" circular>2</ToggleButton>
                <ToggleButton value="3" variant="outline" circular>3</ToggleButton>
                <ToggleButton value="4+" variant="outline" circular>4+</ToggleButton>
            </ToggleButtonGroup>
        </>
    );
}
