import { Checkbox, CheckboxGroup } from "@react-components/checkbox";
import { useState } from "react";

export function ControlledCheckboxGroup() {
    const [value, setValue] = useState([]);

    return (
        <CheckboxGroup
            value={value}
            onChange={(event, x) => {
                setValue(x);
                console.log(x);
            }}
        >
            <Checkbox value="milky-way">Milky Way</Checkbox>
            <Checkbox value="andromeda">Andromeda</Checkbox>
            <Checkbox value="medusa">Medusa</Checkbox>
        </CheckboxGroup>
    );
}
