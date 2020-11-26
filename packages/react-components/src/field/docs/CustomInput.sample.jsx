import { ErrorMessage, Field, Label, useFieldInputProps } from "@react-components/field";
import { mergeClasses } from "@react-components/shared";
import { useCallback, useState } from "react";

function CustomInput(props) {
    const [{ validationState, ...fieldProps }] = useFieldInputProps();

    return (
        <input
            {...props}
            {...fieldProps}
            type="text"
            className={mergeClasses(
                "ba w-20",
                validationState === "invalid" && "b--alert-500"
            )}
        />
    );
}

export function CustomInputField() {
    const [value, setValue] = useState("");

    const isValid = value.length < 2;

    const handleChange = useCallback(event => {
        setValue(event.target.value);
        console.log(event.target.value);
    }, [setValue]);

    return (
        <Field validationState={isValid ? "valid" : "invalid"}>
            <Label>Short input</Label>
            <CustomInput
                value={value}
                onChange={handleChange}
            />
            <ErrorMessage>Input is too long.</ErrorMessage>
        </Field>
    );
}
