import { TextInput } from "@react-components/text-input";
import { useCallback, useState } from "react";

export function ControlledTextInput() {
    const [value, setValue] = useState("Deep space");

    const handleChange = useCallback(event => {
        setValue(event.target.value);
    }, [setValue]);

    return (
        <TextInput
            value={value}
            placeholder="Search..."
            onChange={handleChange}
        />
    );
}
