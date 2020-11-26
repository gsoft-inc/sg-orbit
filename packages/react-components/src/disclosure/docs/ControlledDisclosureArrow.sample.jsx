import { DisclosureArrow } from "@react-components/disclosure";
import { Text } from "@react-components/text";
import { TextLink } from "@react-components/link";
import { useCallback } from "react";
import { useState } from "react";

export function ControlledDisclosureArrow() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = useCallback(() => {
        setIsOpen(x => !x);
        console.log(!isOpen);
    }, [isOpen, setIsOpen]);

    return (
        <TextLink as="button" onClick={handleClick}>
            <Text>EVE Online</Text>
            <DisclosureArrow open={isOpen} />
        </TextLink>
    );
}
