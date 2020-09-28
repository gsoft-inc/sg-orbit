import { ArrowIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { cloneElement } from "react";

function TextLink({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTextLinkTestSuite(element, stories) {
    stories
        .add("default", () =>
            <Stack>
                <Inline align="end">
                    <TextLink size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink href="#" element={element}>Flight details</TextLink>
                    <TextLink size="lg" href="#" element={element}>Flight details</TextLink>
                </Inline>
                <div className="f5">
                    <TextLink size="inherit" href="#" element={element}>Flight details</TextLink>
                </div>
                <div>
                    <TextLink fluid href="#" element={element}>Flight details</TextLink>
                </div>
                <div className="w-10">
                    <TextLink fluid href="#" element={element}>Flight details</TextLink>
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
                <Inline align="end">
                    <TextLink size="sm" href="#" element={element}>
                        <Text>Flight details</Text>
                        <ArrowIcon />
                    </TextLink>
                    <TextLink href="#" element={element}>
                        <Text>Flight details</Text>
                        <ArrowIcon />
                    </TextLink>
                    <TextLink size="lg" href="#" element={element}>
                        <Text>Flight details</Text>
                        <ArrowIcon />
                    </TextLink>
                </Inline>
                <div>
                    <TextLink fluid href="#" element={element}>
                        <Text>Flight details</Text>
                        <ArrowIcon />
                    </TextLink>
                </div>
                <div className="w-10">
                    <TextLink fluid href="#" element={element}>
                        <Text>Flight details</Text>
                        <ArrowIcon />
                    </TextLink>
                </div>
                <div style={{ width: "400px" }}>
                    <TextLink href="#" element={element}>
                        <Text>NASA selected SpaceX to develop a lunar optimized Starship to transport crew between lunar orbit and the surface of the Moon as part of NASA’s Artemis program.</Text>
                        <ArrowIcon />
                    </TextLink>
                </div>
            </Stack>
        )
        .add("external", () =>
            <Stack>
                <Inline align="end">
                    <TextLink external size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink external href="#" element={element}>Flight details</TextLink>
                    <TextLink external size="lg" href="#" element={element}>Flight details</TextLink>
                </Inline>
                <div style={{ width: "400px" }}>
                    <TextLink external href="#" element={element}>
                        NASA selected SpaceX to develop a lunar optimized Starship to transport crew between lunar orbit and the surface of the Moon as part of NASA’s Artemis program.
                    </TextLink>
                </div>
            </Stack>
        )
        .add("primary", () =>
            <Stack>
                <Inline align="end">
                    <TextLink color="primary" size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink color="primary" href="#" element={element}>Flight details</TextLink>
                    <TextLink color="primary" size="lg" href="#" element={element}>Flight details</TextLink>
                </Inline>
                <div>
                    <TextLink color="primary" href="#" element={element}>
                        <Text>Flight details</Text>
                        <ArrowIcon />
                    </TextLink>
                </div>
            </Stack>
        )
        .add("secondary", () =>
            <Stack>
                <Inline align="end">
                    <TextLink color="secondary" size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink color="secondary" href="#" element={element}>Flight details</TextLink>
                    <TextLink color="secondary" size="lg" href="#" element={element}>Flight details</TextLink>
                </Inline>
                <div>
                    <TextLink color="secondary" href="#" element={element}>
                        <Text>Flight details</Text>
                        <ArrowIcon />
                    </TextLink>
                </div>
            </Stack>
        )
        .add("danger", () =>
            <Stack>
                <Inline align="end">
                    <TextLink color="danger" size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink color="danger" href="#" element={element}>Flight details</TextLink>
                    <TextLink color="danger" size="lg" href="#" element={element}>Flight details</TextLink>
                </Inline>
                <div>
                    <TextLink color="danger" href="#" element={element}>
                        <Text>Flight details</Text>
                        <ArrowIcon />
                    </TextLink>
                </div>
            </Stack>
        )
        .add("solid", () =>
            <Inline align="end">
                <TextLink underline="solid" size="sm" href="#" element={element}>Flight details</TextLink>
                <TextLink underline="solid" href="#" element={element}>Flight details</TextLink>
                <TextLink underline="solid" size="lg" href="#" element={element}>Flight details</TextLink>
            </Inline>
        )
        .add("dotted", () =>
            <Inline align="end">
                <TextLink underline="dotted" size="sm" href="#" element={element}>Flight details</TextLink>
                <TextLink underline="dotted" href="#" element={element}>Flight details</TextLink>
                <TextLink underline="dotted" size="lg" href="#" element={element}>Flight details</TextLink>
            </Inline>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <TextLink active size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink active href="#" element={element}>Flight details</TextLink>
                    <TextLink active size="lg" href="#" element={element}>Flight details</TextLink>
                    <div style={{ width: "400px" }}>
                        <TextLink active href="#" element={element}>
                            NASA selected SpaceX to develop a lunar optimized Starship to transport crew between lunar orbit and the surface of the Moon as part of NASA’s Artemis program.
                        </TextLink>
                    </div>
                </Inline>
                <Inline align="end">
                    <TextLink focus size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink focus href="#" element={element}>Flight details</TextLink>
                    <TextLink focus size="lg" href="#" element={element}>Flight details</TextLink>
                    <div style={{ width: "400px" }}>
                        <TextLink focus href="#" element={element}>
                            NASA selected SpaceX to develop a lunar optimized Starship to transport crew between lunar orbit and the surface of the Moon as part of NASA’s Artemis program.
                        </TextLink>
                    </div>
                </Inline>
                <Inline align="end">
                    <TextLink hover size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink hover href="#" element={element}>Flight details</TextLink>
                    <TextLink hover size="lg" href="#" element={element}>Flight details</TextLink>
                    <div style={{ width: "400px" }}>
                        <TextLink hover href="#" element={element}>
                            NASA selected SpaceX to develop a lunar optimized Starship to transport crew between lunar orbit and the surface of the Moon as part of NASA’s Artemis program.
                        </TextLink>
                    </div>
                </Inline>
                <Inline align="end">
                    <TextLink focus hover size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink focus hover href="#" element={element}>Flight details</TextLink>
                    <TextLink focus hover size="lg" href="#" element={element}>Flight details</TextLink>
                    <div style={{ width: "400px" }}>
                        <TextLink focus hover href="#" element={element}>
                            NASA selected SpaceX to develop a lunar optimized Starship to transport crew between lunar orbit and the surface of the Moon as part of NASA’s Artemis program.
                        </TextLink>
                    </div>
                </Inline>
                <Inline align="end">
                    <TextLink visited size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink visited href="#" element={element}>Flight details</TextLink>
                    <TextLink visited size="lg" href="#" element={element}>Flight details</TextLink>
                </Inline>
                <Inline align="end">
                    <TextLink disabled size="sm" href="#" element={element}>Flight details</TextLink>
                    <TextLink disabled href="#" element={element}>Flight details</TextLink>
                    <TextLink disabled size="lg" href="#" element={element}>Flight details</TextLink>
                </Inline>
            </Stack>
        );
}
