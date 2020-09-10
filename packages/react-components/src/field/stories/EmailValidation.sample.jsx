import { ErrorMessage, Field, Label, ValidMessage } from "@react-components/field";
import { TextInput } from "@react-components/input";
import { useCallback, useMemo, useState } from "react";

export function EmailValidation() {
    const [value, setValue] = useState("");

    const validationState = useMemo(() => {
        return value === ""
            ? null
            : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ? "valid" : "invalid";
    }, [value]);

    const handleChange = useCallback(event => {
        setValue(event.target.value);
        console.log(event.target.value);
    }, [setValue]);

    return (
        <Field validationState={validationState}>
            <Label>Email</Label>
            <TextInput
                placeholder="a@a.com"
                value={value}
                onChange={handleChange}
            />
            <ErrorMessage>This is an invalid email address.</ErrorMessage>
            <ValidMessage>A confirmation email is on it's way!</ValidMessage>
        </Field>
    );
}
