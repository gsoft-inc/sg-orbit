import { AriaLabelingProps, isNil, useEventCallback } from "../../shared";
import { RadioGroup } from "../../radio";
import { SyntheticEvent } from "react";
import { ToggleButton } from "../../button";

export interface ButtonPresetsProps extends AriaLabelingProps {
    values: string[];
    selectedIndex?: number;
    onSelectionChange: (event: SyntheticEvent, index: number) => void;
    disabled?: boolean;
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
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                >
                    {x}
                </ToggleButton>
            ))}
        </RadioGroup>
    );
}
