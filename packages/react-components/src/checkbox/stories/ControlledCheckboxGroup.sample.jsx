import { Checkbox, CheckboxGroup } from "@react-components/checkbox";
import { useState } from "react";

export function ControlledCheckboxGroup() {
    const [value, setValue] = useState([]);

    return (
        <>
            <div className="mb6">
                <span className="dib fw6">value:</span> {JSON.stringify(value, null, 4)}
            </div>
            <CheckboxGroup
                value={value}
                onChange={(event, x) => { setValue(x); }}
            >
                <Checkbox value="milky-way">Milky Way</Checkbox>
                <Checkbox value="andromeda">Andromeda</Checkbox>
                <Checkbox value="medusa">Medusa</Checkbox>
            </CheckboxGroup>
        </>
    );
}
