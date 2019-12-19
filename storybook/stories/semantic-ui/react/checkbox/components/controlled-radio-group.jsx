import { Checkbox, Form } from "semantic-ui-react";
import { useState } from "react";

export function ControlledRadioGroup() {
    const [value, setValue] = useState();

    const handleChange = (event, { value: newValue }) => {
        setValue(newValue);
    };

    return (
        <Form>
            <Form.Field>Where are you heading?</Form.Field>
            <Form.Field>
                <Checkbox radio label="Mars" name="checkboxRadioGroup" value="mars" onChange={handleChange} checked={value === "mars"} />
            </Form.Field>
            <Form.Field>
                <Checkbox radio label="Moon" name="checkboxRadioGroup" value="moon" onChange={handleChange} checked={value === "moon"} />
            </Form.Field>
        </Form>
    );
}
