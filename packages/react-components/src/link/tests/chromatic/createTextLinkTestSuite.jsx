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
        .add("primary", () =>
            <Inline alignY="end">
                <TextLink variant="primary" size="sm" href="#" element={element}>Flight details</TextLink>
                <TextLink variant="primary" href="#" element={element}>Flight details</TextLink>
            </Inline>
        )
        .add("secondary", () =>
            <Inline alignY="end">
                <TextLink variant="secondary" size="sm" href="#" element={element}>Flight details</TextLink>
                <TextLink variant="secondary" href="#" element={element}>Flight details</TextLink>
            </Inline>
        )
        .add("danger", () =>
            <Inline alignY="end">
                <TextLink variant="danger" size="sm" href="#" element={element}>Flight details</TextLink>
                <TextLink variant="danger" href="#" element={element}>Flight details</TextLink>
            </Inline>
        )
        .add("inherit color", () =>
            <Inline alignY="end" color="alias-primary-1">
                <TextLink color="inherit" size="sm" href="#" element={element}>Flight details</TextLink>
                <TextLink color="inherit" href="#" element={element}>Flight details</TextLink>
            </Inline>
        )
        .add("states", () =>
            <Stack>
                <Inline alignY="end">
                    <TextLink active size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink active href="#" element={element}>Flight details</TextLink>
                </Inline>
                <Inline alignY="end">
                    <TextLink focus size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink focus href="#" element={element}>Flight details</TextLink>
                </Inline>
                <Inline alignY="end">
                    <TextLink hover size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink hover href="#" element={element}>Flight details</TextLink>
                </Inline>
                <Inline alignY="end">
                    <TextLink focus hover size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink focus hover href="#" element={element}>Flight details</TextLink>
                </Inline>
            </Stack>
        )
        .add("disabled states", () =>
            <Stack>
                <Inline alignY="end">
                    <TextLink disabled size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink disabled href="#" element={element}>Flight details</TextLink>
                </Inline>
                <Inline alignY="end">
                    <TextLink disabled active size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink disabled active href="#" element={element}>Flight details</TextLink>
                </Inline>
                <Inline alignY="end">
                    <TextLink disabled focus size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink disabled focus href="#" element={element}>Flight details</TextLink>
                </Inline>
                <Inline alignY="end">
                    <TextLink disabled hover size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink disabled hover href="#" element={element}>Flight details</TextLink>
                </Inline>
                <Inline alignY="end">
                    <TextLink disabled focus hover size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink disabled focus hover href="#" element={element}>Flight details</TextLink>
                </Inline>
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
