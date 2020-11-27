import { TextArea } from "@react-components/input";
import { useCallback, useMemo, useState } from "react";

const MAX = 25;

export function LengthValidation() {
    const [value, setValue] = useState("");

    const handleChange = useCallback(event => {
        setValue(event.target.value);
        console.log(event.target.value);
    }, [setValue]);

    const isValid = useMemo(() => value.length <= MAX,[value]);

    return (
        <TextArea
            validationState={isValid ? "valid" : "invalid"}
            value={value}
            placeholder={`Why should you go to space? (max ${MAX} characters)`}
            help={`${MAX - value.length} characters left.`}
            onChange={handleChange}
        />
    );
}
