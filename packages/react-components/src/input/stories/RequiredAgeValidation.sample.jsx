import { Button } from "@react-components/button";
import { Inline } from "@react-components/layout";
import { NumberInput } from "@react-components/input";
import { useCallback, useMemo, useState } from "react";

export function RequiredAgeValidation() {
    const [value, setValue] = useState(18);

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    }, [setValue]);

    const handleClick = useCallback(() => {
        setValue("");
    }, [setValue]);

    const isValid = useMemo(
        () => value !== "",
        [value]
    );

    return (
        <Inline align="center">
            <NumberInput
                validationState={isValid ? "valid" : "invalid"}
                value={value}
                min={1}
                placeholder="Age"
                onChange={handleChange}
            />
            <Button
                variant="link"
                onClick={handleClick}
            >
                clear
            </Button>
        </Inline>
    );
}
