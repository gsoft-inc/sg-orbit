import { Counter } from "@react-components/counter";
import { IconList, InfoIcon, MailIcon, WarningIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { cloneElement } from "react";

function Switch({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(element, stories) {
    return stories
        .add("labeled", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Switch size="sm" element={element}>Engines</Switch>
                    <Switch element={element}>Engines</Switch>
                </Inline>
                <Inline verticalAlign="end">
                    <Switch size="sm" element={element}>
                        <Text>Engines</Text>
                        <MailIcon />
                    </Switch>
                    <Switch element={element}>
                        <Text>Engines</Text>
                        <MailIcon />
                    </Switch>
                    <Switch disabled element={element}>
                        <Text>Engines</Text>
                        <MailIcon />
                    </Switch>
                </Inline>
                <Inline verticalAlign="end">
                    <Switch size="sm" element={element}>
                        <Text>Engines</Text>
                        <IconList><MailIcon /><MailIcon /><MailIcon /></IconList>
                    </Switch>
                    <Switch element={element}>
                        <Text>Engines</Text>
                        <IconList><MailIcon /><MailIcon /><MailIcon /></IconList>
                    </Switch>
                </Inline>
                <Inline verticalAlign="end">
                    <Switch size="sm" element={element}>
                        <Text>Engines</Text>
                        <Counter>60</Counter>
                    </Switch>
                    <Switch element={element}>
                        <Text>Engines</Text>
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
                <Inline verticalAlign="end">
                    <Switch size="sm" element={element}>
                        <Text>Engines</Text>
                        <MailIcon />
                        <Counter>60</Counter>
                    </Switch>
                    <Switch element={element}>
                        <Text>Engines</Text>
                        <MailIcon />
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
            </Stack>
        )
        .add("no label", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Switch size="sm" element={element} />
                    <Switch element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <Switch size="sm" element={element}>
                        <MailIcon />
                    </Switch>
                    <Switch element={element}>
                        <MailIcon />
                    </Switch>
                </Inline>
                <Inline verticalAlign="end">
                    <Switch size="sm" element={element}>
                        <IconList><MailIcon /><MailIcon /><MailIcon /></IconList>
                    </Switch>
                    <Switch element={element}>
                        <IconList><MailIcon /><MailIcon /><MailIcon /></IconList>
                    </Switch>
                </Inline>
                <Inline verticalAlign="end">
                    <Switch size="sm" element={element}>
                        <Counter>60</Counter>
                    </Switch>
                    <Switch element={element}>
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
                <Inline verticalAlign="end">
                    <Switch size="sm" element={element}>
                        <MailIcon />
                        <Counter>60</Counter>
                    </Switch>
                    <Switch element={element}>
                        <MailIcon />
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
            </Stack>
        )
        .add("reverse", () =>
            <Stack>
                <div>
                    <Switch reverse element={element}>Engines</Switch>
                </div>
                <Inline>
                    <Switch reverse element={element}>
                        <Text>Engines</Text>
                        <IconList>
                            <MailIcon /><InfoIcon /><WarningIcon />
                        </IconList>
                    </Switch>
                    <Switch reverse element={element}>
                        <IconList>
                            <MailIcon /><InfoIcon /><WarningIcon />
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
                            <MailIcon /><InfoIcon /><WarningIcon />
                        </IconList>
                        <Counter>60</Counter>
                    </Switch>
                    <Switch reverse element={element}>
                        <IconList>
                            <MailIcon /><InfoIcon /><WarningIcon />
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
                        <MailIcon />
                    </Switch>
                    <Switch validationState="invalid" element={element}>
                        <Text>Engines</Text>
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Switch active size="sm" element={element}>Engines</Switch>
                    <Switch active element={element}>Engines</Switch>
                </Inline>
                <Inline verticalAlign="end">
                    <Switch focus size="sm" element={element}>Engines</Switch>
                    <Switch focus element={element}>Engines</Switch>
                </Inline>
                <Inline verticalAlign="end">
                    <Switch hover size="sm" element={element}>Engines</Switch>
                    <Switch hover element={element}>Engines</Switch>
                </Inline>
                <Inline verticalAlign="end">
                    <Switch focus hover size="sm" element={element}>Engines</Switch>
                    <Switch focus hover element={element}>Engines</Switch>
                </Inline>
                <Inline verticalAlign="end">
                    <Switch disabled size="sm" element={element}>Engines</Switch>
                    <Switch disabled element={element}>Engines</Switch>
                </Inline>
            </Stack>
        )
        .add("overflow", () =>
            <Stack>
                <div className="mw5">
                    <Switch element={element}>PA-99-N2 event and possible exoplanet in galaxy</Switch>
                </div>
                <div className="mw5">
                    <Switch element={element}>
                        <Text>PA-99-N2 event and possible exoplanet in galaxy</Text>
                        <IconList>
                            <MailIcon /><MailIcon />
                        </IconList>
                    </Switch>
                </div>
                <div className="mw5">
                    <Switch element={element}>
                        <Text>PA-99-N2 event and possible exoplanet in galaxy</Text>
                        <Counter>60</Counter>
                    </Switch>
                </div>
            </Stack>
        );
}
