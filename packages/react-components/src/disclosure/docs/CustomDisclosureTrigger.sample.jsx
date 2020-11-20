import { Box } from "@react-components/box";
import { ChevronIcon } from "@react-components/icons";
import { Content } from "@react-components/view";
import { Disclosure } from "@react-components/disclosure";
import { useDisclosureContext } from "@react-components/disclosure";
import cx from "classnames";

export function CustomTrigger({ children, ...rest }) {
    const { isOpen } = useDisclosureContext();

    return (
        <Box
            {...rest}
            className="flex items-center"
            role="button"
        >
            {children}
            <ChevronIcon
                className={cx(
                    isOpen ? "rotate-270" : "rotate-90",
                    "ml1"
                )}
            />
        </Box>
    );
}

export function CustomDisclosureTrigger() {
    return (
        <Disclosure>
            <CustomTrigger>EVE Online</CustomTrigger>
            <Content>Eve Online is a space-based, persistent world massively multiplayer online role-playing game (MMORPG) developed and published by CCP Games. Players of Eve Online can participate in a number of in-game professions and activities, including mining, piracy, manufacturing, trading, exploration, and combat (both player versus environment and player versus player). The game contains a total of 7,800 star systems that can be visited by players.</Content>
        </Disclosure>
    );
}
