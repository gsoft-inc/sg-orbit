import { TextInput } from "@react-components/input";
import { useCallback, useMemo, useState } from "react";

export function EmailValidation() {
    const [value, setValue] = useState("me@spacex.com");

    const isValid = useMemo(
        () => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value),
        [value]
    );

    const handleChange = useCallback(event => {
        setValue(event.target.value);
        console.log(event.target.value);
    }, [setValue]);

    return (
        <TextInput
            validationState={isValid ? "valid" : "invalid"}
            placeholder="Enter your email"
            value={value}
            onChange={handleChange}
        />
    );
}
