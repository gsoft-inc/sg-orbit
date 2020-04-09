import { Radio } from "@react-components/radio";
import { useState } from "react";

export function ControlledRadioGroup() {
    const [value, setValue] = useState();

    const handleChange = (event, { value: newValue }) => {
        setValue(newValue);
    };

    return (
        <>
            <span className="dib mb4">Where are you heading?</span>
            <div className="flex flex-column">
                <Radio text="Earth" name="checkboxRadioGroup" value="earth" onChange={handleChange} checked={value === "earth"} className="mb2" />
                <Radio text="Moon" name="checkboxRadioGroup" value="moon" onChange={handleChange} checked={value === "moon"} className="mb2" />
                <Radio text="Mars" name="checkboxRadioGroup" value="mars" onChange={handleChange} checked={value === "mars"} />
            </div>
        </>
    );
}
