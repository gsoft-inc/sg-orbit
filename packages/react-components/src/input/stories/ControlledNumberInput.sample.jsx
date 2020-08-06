import { NumberInput } from "@react-components/input";
import { useCallback, useState } from "react";

export function ControlledNumberInput() {
    const [value, setValue] = useState(null);

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    }, [setValue]);

    return (
        <NumberInput
            value={value}
            placeholder="# of tickets"
            onChange={handleChange}
        />
    );
}
