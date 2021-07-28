import { AriaLabelingProps, useEventCallback } from "../../shared";
import { DisclosureArrow } from "../../disclosure";
import { IconButton } from "../../button";
import { Item } from "../../collection";
import { Menu, MenuTrigger } from "../../menu";
import { SyntheticEvent, useRef } from "react";

export interface MenuPresetsProps extends AriaLabelingProps {
    values: string[];
    selectedIndex?: number;
    onSelectionChange: (event: SyntheticEvent, index: number) => void;
}

export function MenuPresets({
    values,
    selectedIndex,
    onSelectionChange
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
                selectionMode="single"
                selectedKeys={[selectedIndex?.toString()]}
                onSelectionChange={handleSelectPreset}
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
