import { Radio } from "@react-components/input";
import { useState } from "react";

export function ControlledRadioGroup() {
    const [value, setValue] = useState();

    const handleChange = (event, { value: newValue }) => {
        setValue(newValue);
    };

    return (
        <>
            <span className="dib mb2">Where are you heading?</span>
            <div className="flex flex-column">
                <Radio text="Mars" name="checkboxRadioGroup" value="mars" onChange={handleChange} checked={value === "mars"} className="mb2" />
                <Radio text="Moon" name="checkboxRadioGroup" value="moon" onChange={handleChange} checked={value === "moon"} />
            </div>
        </>
    );
}
