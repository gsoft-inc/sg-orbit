import "./ButtonPresets.css";

import { RadioGroup } from "../../radio";
import { SyntheticEvent } from "react";
import { ToggleButton } from "../../button";
import { isNil, useEventCallback } from "../../shared";

export interface ButtonPresetsProps {
    values: string[];
    selectedIndex?: number;
    onSelectionChange: (event: SyntheticEvent, index: number) => void;
    disabled?: boolean;
    /**
     * Defines a string value that labels the current element.
     * @ignore
     */
    "aria-label"?: string;
    /**
     * Identifies the element (or elements) that labels the current element.
     * @ignore
     */
    "aria-labelledby"?: string;
    /**
     * Identifies the element (or elements) that describes the object.
     * @ignore
     */
    "aria-describedby"?: string;
    /**
     * Identifies the element (or elements) that provide a detailed, extended description for the object.
     * @ignore
     */
    "aria-details"?: string;
}

export function ButtonPresets({
    values,
    selectedIndex,
    onSelectionChange
}: ButtonPresetsProps) {
    const handleSelectPreset = useEventCallback((event: SyntheticEvent, value: string) => {
        onSelectionChange(event, parseInt(value));
    });

    return (
        <RadioGroup
            className="o-ui-date-input-button-presets"
            value={!isNil(selectedIndex) ? selectedIndex.toString() : null}
            onChange={handleSelectPreset}
            orientation="horizontal"
            gap={2}
            aria-label="Date presets"
        >
            {values.map((x, index) => (
                <ToggleButton
                    value={index.toString()}
                    variant="outline"
                    size="sm"
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                >
                    {x}
                </ToggleButton>
            ))}
        </RadioGroup>
    );
}
