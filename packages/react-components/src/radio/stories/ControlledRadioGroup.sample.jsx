import { Radio, RadioGroup } from "@react-components/radio";
import { useState } from "react";

export function ControlledRadioGroup() {
    const [value, setValue] = useState(null);

    return (
        <RadioGroup
            value={value}
            onChange={(event, x) => {
                setValue(x);
                console.log(x);
            }}
        >
            <Radio value="mars">Mars</Radio>
            <Radio value="jupiter">Jupiter</Radio>
            <Radio value="pluton">Pluton</Radio>
        </RadioGroup>
    );
}
