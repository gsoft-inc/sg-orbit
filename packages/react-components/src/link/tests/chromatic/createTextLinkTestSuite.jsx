import { ArrowIcon, InfoIcon } from "@react-components/icons";
import { Div } from "@react-components/html";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/typography";
import { cloneElement } from "react";

function TextLink({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTextLinkTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline alignY="end">
                    <TextLink size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink href="#" element={element}>Flight details</TextLink>
                </Inline>
                <Div fontSize={5}>
                    <TextLink size="inherit" href="#" element={element}>Flight details</TextLink>
                </Div>
                <Div width="400px">
                    <TextLink href="#" element={element}>
                        NASA selected SpaceX to develop a lunar optimized Starship to transport crew between lunar orbit and the surface of the Moon as part of NASA’s Artemis program.
                    </TextLink>
                </Div>
            </Stack>
        )
        .add("icon", () =>
            <Stack>
                <Inline alignY="end">
                    <TextLink size="sm" href="#" element={element}>
                        <Text>Flight details</Text>
                        <ArrowIcon />
                    </TextLink>
                    <TextLink href="#" element={element}>
                        <Text>Flight details</Text>
                        <ArrowIcon />
                    </TextLink>
                </Inline>
                <Div width="400px">
                    <TextLink href="#" element={element}>
                        <Text>NASA selected SpaceX to develop a lunar optimized Starship to transport crew between lunar orbit and the surface of the Moon as part of NASA’s Artemis program.</Text>
                        <ArrowIcon />
                    </TextLink>
                </Div>
            </Stack>
        )
        .add("start icon", () =>
            <Stack>
                <Inline alignY="end">
                    <TextLink size="sm" href="#" element={element}>
                        <InfoIcon slot="start-icon" />
                        <Text>Flight details</Text>
                    </TextLink>
                    <TextLink href="#" element={element}>
                        <InfoIcon slot="start-icon" />
                        <Text>Flight details</Text>
                    </TextLink>
                </Inline>
                <Div width="400px">
                    <TextLink href="#" element={element}>
                        <InfoIcon slot="start-icon" />
                        <Text>NASA selected SpaceX to develop a lunar optimized Starship to transport crew between lunar orbit and the surface of the Moon as part of NASA’s Artemis program.</Text>
                    </TextLink>
                </Div>
            </Stack>
        )
        .add("external", () =>
            <Stack>
                <Inline alignY="end">
                    <TextLink external size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink external href="#" element={element}>Flight details</TextLink>
                </Inline>
                <Div width="400px">
                    <TextLink external href="#" element={element}>
                        NASA selected SpaceX to develop a lunar optimized Starship to transport crew between lunar orbit and the surface of the Moon as part of NASA’s Artemis program.
                    </TextLink>
                </Div>
            </Stack>
        )
        .add("new tab", () =>
            <TextLink target="_blank" href="#" element={element}>Flight details</TextLink>
        );
}
