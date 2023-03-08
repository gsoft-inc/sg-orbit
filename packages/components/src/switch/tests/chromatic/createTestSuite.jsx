import { Counter } from "@components/counter";
import { Div } from "@components/html";
import { EmailMajorIcon, IconList, InfoCircleMajorIcon, WarningMajorIcon } from "@components/icons";
import { Inline, Stack } from "@components/layout";
import { Text } from "@components/typography";
import { cloneElement } from "react";

function Switch({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(element, stories) {
    return stories
        .add("labeled", () =>
            <Stack>
                <Inline alignY="end">
                    <Switch size="sm" element={element}>Engines</Switch>
                    <Switch element={element}>Engines</Switch>
                </Inline>
                <Inline alignY="end">
                    <Switch size="sm" element={element}>
                        <Text>Engines</Text>
                        <EmailMajorIcon />
                    </Switch>
                    <Switch element={element}>
                        <Text>Engines</Text>
                        <EmailMajorIcon />
                    </Switch>
                    <Switch disabled element={element}>
                        <Text>Engines</Text>
                        <EmailMajorIcon />
                    </Switch>
                </Inline>
                <Inline alignY="end">
                    <Switch size="sm" element={element}>
                        <Text>Engines</Text>
                        <IconList><EmailMajorIcon /><EmailMajorIcon /><EmailMajorIcon /></IconList>
                    </Switch>
                    <Switch element={element}>
                        <Text>Engines</Text>
                        <IconList><EmailMajorIcon /><EmailMajorIcon /><EmailMajorIcon /></IconList>
                    </Switch>
                </Inline>
                <Inline alignY="end">
                    <Switch size="sm" element={element}>
                        <Text>Engines</Text>
                        <Counter>60</Counter>
                    </Switch>
                    <Switch element={element}>
                        <Text>Engines</Text>
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
                <Inline alignY="end">
                    <Switch size="sm" element={element}>
                        <Text>Engines</Text>
                        <EmailMajorIcon />
                        <Counter>60</Counter>
                    </Switch>
                    <Switch element={element}>
                        <Text>Engines</Text>
                        <EmailMajorIcon />
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
            </Stack>
        )
        .add("no label", () =>
            <Stack>
                <Inline alignY="end">
                    <Switch size="sm" aria-label="Engines" element={element} />
                    <Switch aria-label="Engines" element={element} />
                </Inline>
                <Inline alignY="end">
                    <Switch size="sm" aria-label="Email" element={element}>
                        <EmailMajorIcon />
                    </Switch>
                    <Switch aria-label="Email" element={element}>
                        <EmailMajorIcon />
                    </Switch>
                </Inline>
                <Inline alignY="end">
                    <Switch size="sm" aria-label="Email" element={element}>
                        <IconList><EmailMajorIcon /><EmailMajorIcon /><EmailMajorIcon /></IconList>
                    </Switch>
                    <Switch aria-label="Email" element={element}>
                        <IconList><EmailMajorIcon /><EmailMajorIcon /><EmailMajorIcon /></IconList>
                    </Switch>
                </Inline>
                <Inline alignY="end">
                    <Switch size="sm" aria-label="Engines" element={element}>
                        <Counter>60</Counter>
                    </Switch>
                    <Switch aria-label="Engines" element={element}>
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
                <Inline alignY="end">
                    <Switch size="sm" aria-label="Email" element={element}>
                        <EmailMajorIcon />
                        <Counter>60</Counter>
                    </Switch>
                    <Switch aria-label="Email" element={element}>
                        <EmailMajorIcon />
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
            </Stack>
        )
        .add("reverse", () =>
            <Stack>
                <Switch reverse element={element}>Engines</Switch>
                <Inline>
                    <Switch reverse element={element}>
                        <Text>Engines</Text>
                        <IconList>
                            <EmailMajorIcon /><InfoCircleMajorIcon /><WarningMajorIcon />
                        </IconList>
                    </Switch>
                    <Switch reverse element={element}>
                        <IconList>
                            <EmailMajorIcon /><InfoCircleMajorIcon /><WarningMajorIcon />
                        </IconList>
                    </Switch>
                </Inline>
                <Inline>
                    <Switch reverse element={element}>
                        <Text>Engines</Text>
                        <Counter>60</Counter>
                    </Switch>
                    <Switch reverse element={element}>
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
                <Inline>
                    <Switch reverse element={element}>
                        <Text>Engines</Text>
                        <IconList>
                            <EmailMajorIcon /><InfoCircleMajorIcon /><WarningMajorIcon />
                        </IconList>
                        <Counter>60</Counter>
                    </Switch>
                    <Switch reverse element={element}>
                        <IconList>
                            <EmailMajorIcon /><InfoCircleMajorIcon /><WarningMajorIcon />
                        </IconList>
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
            </Stack>
        )
        .add("validation", () =>
            <Stack>
                <Inline>
                    <Switch validationState="invalid" element={element}>Engines</Switch>
                    <Switch validationState="valid" active element={element}>Engines</Switch>
                </Inline>
                <Inline>
                    <Switch validationState="invalid" element={element}>
                        <Text>Engines</Text>
                        <EmailMajorIcon />
                    </Switch>
                    <Switch validationState="invalid" element={element}>
                        <Text>Engines</Text>
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Inline>
                <Stack>
                    <Inline alignY="end">
                        <Switch active size="sm" element={element}>Engines</Switch>
                        <Switch active element={element}>Engines</Switch>
                    </Inline>
                    <Inline alignY="end">
                        <Switch focus size="sm" element={element}>Engines</Switch>
                        <Switch focus element={element}>Engines</Switch>
                    </Inline>
                    <Inline alignY="end">
                        <Switch hover size="sm" element={element}>Engines</Switch>
                        <Switch hover element={element}>Engines</Switch>
                    </Inline>
                    <Inline alignY="end">
                        <Switch focus hover size="sm" element={element}>Engines</Switch>
                        <Switch focus hover element={element}>Engines</Switch>
                    </Inline>
                </Stack>
                <Stack>
                    <Inline alignY="end">
                        <Switch disabled size="sm" element={element}>Engines</Switch>
                        <Switch disabled element={element}>Engines</Switch>
                    </Inline>
                    <Inline alignY="end">
                        <Switch disabled active size="sm" element={element}>Engines</Switch>
                        <Switch disabled active element={element}>Engines</Switch>
                    </Inline>
                    <Inline alignY="end">
                        <Switch disabled focus size="sm" element={element}>Engines</Switch>
                        <Switch disabled focus element={element}>Engines</Switch>
                    </Inline>
                    <Inline alignY="end">
                        <Switch disabled hover size="sm" element={element}>Engines</Switch>
                        <Switch disabled hover element={element}>Engines</Switch>
                    </Inline>
                    <Inline alignY="end">
                        <Switch disabled focus hover size="sm" element={element}>Engines</Switch>
                        <Switch disabled focus hover element={element}>Engines</Switch>
                    </Inline>
                </Stack>
            </Inline>
        )
        .add("overflow", () =>
            <Stack>
                <Div maxWidth="16rem">
                    <Switch element={element}>PA-99-N2 event and possible exoplanet in galaxy</Switch>
                </Div>
                <Div maxWidth="16rem">
                    <Switch element={element}>
                        <Text>PA-99-N2 event and possible exoplanet in galaxy</Text>
                        <IconList>
                            <EmailMajorIcon /><EmailMajorIcon />
                        </IconList>
                    </Switch>
                </Div>
                <Div maxWidth="16rem">
                    <Switch element={element}>
                        <Text>PA-99-N2 event and possible exoplanet in galaxy</Text>
                        <Counter>60</Counter>
                    </Switch>
                </Div>
            </Stack>
        )
        .add("zoom", () =>
            <Inline>
                <Div className="zoom-in">
                    <Switch element={element}>Engines</Switch>
                </Div>
                <Div className="zoom-out">
                    <Switch element={element}>Engines</Switch>
                </Div>
            </Inline>
        );
}
