import { DisclosureArrow } from "../../disclosure";
import { IconButton } from "../../button";
import { Item } from "../../collection";
import { Menu, MenuTrigger } from "../../menu";
import { SyntheticEvent, useRef } from "react";
import { useEventCallback } from "../../shared";

export interface MenuPresetsProps {
    "aria-describedby"?: string;
    "aria-details"?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    onSelectionChange: (event: SyntheticEvent, index: number) => void;
    selectedIndex?: number;
    values: string[];
}

export function MenuPresets({
    onSelectionChange,
    selectedIndex,
    values
}: MenuPresetsProps) {
    const presetButtonRef = useRef<HTMLButtonElement>();

    const handleSelectPreset = useEventCallback((event: SyntheticEvent, keys: string[]) => {
        onSelectionChange(event, parseInt(keys[0]));

        presetButtonRef.current?.focus();
    });

    return (
        <MenuTrigger>
            <IconButton
                aria-label="Date presets"
                ref={presetButtonRef}
            >
                <DisclosureArrow />
            </IconButton>
            <Menu
                onSelectionChange={handleSelectPreset}
                selectedKeys={[selectedIndex?.toString()]}
                selectionMode="single"
            >
                {values.map((x, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Item key={index.toString()}>
                        {x}
                    </Item>
                ))}
            </Menu>
        </MenuTrigger>
    );
}
