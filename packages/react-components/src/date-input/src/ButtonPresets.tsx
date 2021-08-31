import "./ButtonPresets.css";

import { RadioGroup } from "../../radio";
import { SyntheticEvent } from "react";
import { ToggleButton } from "../../button";
import { isNil, useEventCallback } from "../../shared";

export interface ButtonPresetsProps {
    "aria-describedby"?: string;
    "aria-details"?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    disabled?: boolean;
    onSelectionChange: (event: SyntheticEvent, index: number) => void;
    selectedIndex?: number;
    values: string[];
}

export function ButtonPresets({
    onSelectionChange,
    selectedIndex,
    values
}: ButtonPresetsProps) {
    const handleSelectPreset = useEventCallback((event: SyntheticEvent, value: string) => {
        onSelectionChange(event, parseInt(value));
    });

    return (
        <RadioGroup
            aria-label="Date presets"
            className="o-ui-date-input-button-presets"
            gap={2}
            onChange={handleSelectPreset}
            orientation="horizontal"
            value={!isNil(selectedIndex) ? selectedIndex.toString() : null}
        >
            {values.map((x, index) => (
                <ToggleButton
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    size="sm"
                    value={index.toString()}
                    variant="outline"
                >
                    {x}
                </ToggleButton>
            ))}
        </RadioGroup>
    );
}
