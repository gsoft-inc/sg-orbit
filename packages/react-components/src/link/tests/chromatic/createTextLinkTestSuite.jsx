import { ArrowIcon, InfoIcon } from "@react-components/icons";
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
                <div className="f5">
                    <TextLink size="inherit" href="#" element={element}>Flight details</TextLink>
                </div>
                <div style={{ width: "400px" }}>
                    <TextLink href="#" element={element}>
                        NASA selected SpaceX to develop a lunar optimized Starship to transport crew between lunar orbit and the surface of the Moon as part of NASA’s Artemis program.
                    </TextLink>
                </div>
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
                <div style={{ width: "400px" }}>
                    <TextLink href="#" element={element}>
                        <Text>NASA selected SpaceX to develop a lunar optimized Starship to transport crew between lunar orbit and the surface of the Moon as part of NASA’s Artemis program.</Text>
                        <ArrowIcon />
                    </TextLink>
                </div>
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
                <div style={{ width: "400px" }}>
                    <TextLink href="#" element={element}>
                        <InfoIcon slot="start-icon" />
                        <Text>NASA selected SpaceX to develop a lunar optimized Starship to transport crew between lunar orbit and the surface of the Moon as part of NASA’s Artemis program.</Text>
                    </TextLink>
                </div>
            </Stack>
        )
        .add("external", () =>
            <Stack>
                <Inline alignY="end">
                    <TextLink external size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink external href="#" element={element}>Flight details</TextLink>
                </Inline>
                <div style={{ width: "400px" }}>
                    <TextLink external href="#" element={element}>
                        NASA selected SpaceX to develop a lunar optimized Starship to transport crew between lunar orbit and the surface of the Moon as part of NASA’s Artemis program.
                    </TextLink>
                </div>
            </Stack>
        )
        .add("new tab", () =>
            <TextLink target="_blank" href="#" element={element}>Flight details</TextLink>
        );
}
