import { ToggleButton, ToggleButtonGroup } from "@react-components/button";
import { useState } from "react";

export function ControlledToggleButtonGroup() {
    const [value, setValue] = useState([]);

    console.log(value);

    return (
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
    );
}
