import "./MotionPreview.css";

import { Button } from "@react-components/button";
import { Field, Label } from "@react-components/field";
import { H4 } from "@react-components/typography";
import { Inline } from "@react-components/layout";
import { Item } from "@react-components/collection";
import { Select } from "@react-components/select";
import { useState } from "react";

export function MotionPreview() {
    const [isAnimated, setAnimated] = useState(false);
    const [duration, setDuration] = useState("duration-1");
    const [easing, setEasing] = useState("expressive");

    const handleClick = () => {
        setAnimated(!isAnimated);
    };

    const handleSelectDuration = (event, selectedKey) => {
        setDuration(selectedKey);
    };

    const handleSelectEasing = (event, selectedKey) => {
        setEasing(selectedKey);
    };

    return (
        <div className="o-ui-sb-motion-preview bt b--cloud-2">
            <H4>Motion Preview</H4>
            <Inline className="mb4" verticalAlign="end">
                <Field>
                    <Label data-testid="label">Easing</Label>
                    <Select placeholder="Easing" aria-label="Easing" defaultSelectedKey={easing} onSelectionChange={handleSelectEasing}>
                        <Item key="focus">Focus</Item>
                        <Item key="productive">Productive</Item>
                        <Item key="expressive">Expressive</Item>
                    </Select>
                </Field>
                <Field>
                    <Label data-testid="label">Duration</Label>
                    <Select placeholder="Duration" aria-label="Duration" defaultSelectedKey={duration} onSelectionChange={handleSelectDuration}>
                        <Item key="duration-1">100ms</Item>
                        <Item key="duration-2">200ms</Item>
                        <Item key="duration-3">300ms</Item>
                        <Item key="duration-4">500ms</Item>
                        <Item key="duration-5">800ms</Item>
                    </Select>
                </Field>
                <Button shape="rounded" color="primary" onClick={handleClick}>Play this motion</Button>
            </Inline>
            <div style={{ "--o-ui-sb-duration": `var(--o-ui-easing-${duration})`, "--o-ui-sb-easing": `var(--o-ui-easing-${easing})` }} className={`mt6 o-ui-sb-object ${isAnimated ? "o-ui-sb-object-animated" : ""}`}></div>
        </div>
    );
}
