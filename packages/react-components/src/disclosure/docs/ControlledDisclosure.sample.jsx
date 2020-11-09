import { ArrowIcon } from "@react-components/icons";
import { Content } from "@react-components/view";
import { Disclosure } from "@react-components/disclosure";
import { Text } from "@react-components/text";
import { TextLink } from "@react-components/link";
import { useCallback } from "react";
import { useState } from "react";

export function ControlledDisclosure() {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = useCallback((event, newValue) => {
        setIsOpen(newValue);
    }, [setIsOpen]);

    return (
        <Disclosure
            open={isOpen}
            onChange={handleChange}
        >
            <TextLink as="button">
                <Text>EVE Online</Text>
                <ArrowIcon className={isOpen ? "rotate-270" : "rotate-90"} />
            </TextLink>
            <Content>Eve Online is a space-based, persistent world massively multiplayer online role-playing game (MMORPG) developed and published by CCP Games. Players of Eve Online can participate in a number of in-game professions and activities, including mining, piracy, manufacturing, trading, exploration, and combat (both player versus environment and player versus player). The game contains a total of 7,800 star systems that can be visited by players.</Content>
        </Disclosure>
    );
}
