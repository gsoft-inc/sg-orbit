import { Counter } from "@react-components/counter";
import { EmailIcon, IconGroup, InfoIcon, WarningIcon } from "@react-components/icons";
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
                <Inline align="end">
                    <Switch size="small" element={element}>Engines</Switch>
                    <Switch element={element}>Engines</Switch>
                    <Switch size="large" element={element}>Engines</Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" element={element}>
                        <Text>Engines</Text>
                        <EmailIcon />
                    </Switch>
                    <Switch element={element}>
                        <Text>Engines</Text>
                        <EmailIcon />
                    </Switch>
                    <Switch size="large" element={element}>
                        <Text>Engines</Text>
                        <EmailIcon />
                    </Switch>
                    <Switch disabled element={element}>
                        <Text>Engines</Text>
                        <EmailIcon />
                    </Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" element={element}>
                        <Text>Engines</Text>
                        <IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>
                    </Switch>
                    <Switch element={element}>
                        <Text>Engines</Text>
                        <IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>
                    </Switch>
                    <Switch size="large" element={element}>
                        <Text>Engines</Text>
                        <IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>
                    </Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" element={element}>
                        <Text>Engines</Text>
                        <Counter>60</Counter>
                    </Switch>
                    <Switch element={element}>
                        <Text>Engines</Text>
                        <Counter>60</Counter>
                    </Switch>
                    <Switch size="large" element={element}>
                        <Text>Engines</Text>
                        <Counter>60</Counter>
                    </Switch>
                    <Switch disabled element={element}>
                        <Text>Engines</Text>
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" element={element}>
                        <Text>Engines</Text>
                        <Counter variant="divider">60</Counter>
                    </Switch>
                    <Switch element={element}>
                        <Text>Engines</Text>
                        <Counter variant="divider">60</Counter>
                    </Switch>
                    <Switch size="large" element={element}>
                        <Text>Engines</Text>
                        <Counter variant="divider">60</Counter>
                    </Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" element={element}>
                        <Text>Engines</Text>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Switch>
                    <Switch element={element}>
                        <Text>Engines</Text>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Switch>
                    <Switch size="large" element={element}>
                        <Text>Engines</Text>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" element={element}>
                        <Text>Engines</Text>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
                    </Switch>
                    <Switch element={element}>
                        <Text>Engines</Text>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
                    </Switch>
                    <Switch size="large" element={element}>
                        <Text>Engines</Text>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
                    </Switch>
                </Inline>
            </Stack>
        )
        .add("no label", () =>
            <Stack>
                <Inline align="end">
                    <Switch size="small" element={element} />
                    <Switch element={element} />
                    <Switch size="large" element={element} />
                </Inline>
                <Inline align="end">
                    <Switch size="small" element={element}>
                        <EmailIcon />
                    </Switch>
                    <Switch element={element}>
                        <EmailIcon />
                    </Switch>
                    <Switch size="large" element={element}>
                        <EmailIcon />
                    </Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" element={element}>
                        <IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>
                    </Switch>
                    <Switch element={element}>
                        <IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>
                    </Switch>
                    <Switch size="large" element={element}>
                        <IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>
                    </Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" element={element}>
                        <Counter>60</Counter>
                    </Switch>
                    <Switch element={element}>
                        <Counter>60</Counter>
                    </Switch>
                    <Switch size="large" element={element}>
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" element={element}>
                        <Counter variant="divider">60</Counter>
                    </Switch>
                    <Switch element={element}>
                        <Counter variant="divider">60</Counter>
                    </Switch>
                    <Switch size="large" element={element}>
                        <Counter variant="divider">60</Counter>
                    </Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" element={element}>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Switch>
                    <Switch element={element}>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Switch>
                    <Switch size="large" element={element}>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" element={element}>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
                    </Switch>
                    <Switch element={element}>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
                    </Switch>
                    <Switch size="large" element={element}>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
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
                        <IconGroup>
                            <EmailIcon /><InfoIcon /><WarningIcon />
                        </IconGroup>
                    </Switch>
                    <Switch reverse element={element}>
                        <IconGroup>
                            <EmailIcon /><InfoIcon /><WarningIcon />
                        </IconGroup>
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
                    <Switch reverse element={element}>
                        <Text>Engines</Text>
                        <Counter variant="divider">60</Counter>
                    </Switch>
                    <Switch reverse element={element}>
                        <Counter variant="divider">60</Counter>
                    </Switch>
                </Inline>
                <Inline>
                    <Switch reverse element={element}>
                        <Text>Engines</Text>
                        <IconGroup>
                            <EmailIcon /><InfoIcon /><WarningIcon />
                        </IconGroup>
                        <Counter>60</Counter>
                    </Switch>
                    <Switch reverse element={element}>
                        <IconGroup>
                            <EmailIcon /><InfoIcon /><WarningIcon />
                        </IconGroup>
                        <Counter>60</Counter>
                    </Switch>
                    <Switch reverse element={element}>
                        <Text>Engines</Text>
                        <IconGroup>
                            <EmailIcon /><InfoIcon /><WarningIcon />
                        </IconGroup>
                        <Counter variant="divider">60</Counter>
                    </Switch>
                    <Switch reverse element={element}>
                        <IconGroup>
                            <EmailIcon /><InfoIcon /><WarningIcon />
                        </IconGroup>
                        <Counter variant="divider">60</Counter>
                    </Switch>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <Switch active size="small" element={element}>Engines</Switch>
                    <Switch active element={element}>Engines</Switch>
                    <Switch active size="large" element={element}>Engines</Switch>
                </Inline>
                <Inline align="end">
                    <Switch focus size="small" element={element}>Engines</Switch>
                    <Switch focus element={element}>Engines</Switch>
                    <Switch focus size="large" element={element}>Engines</Switch>
                </Inline>
                <Inline align="end">
                    <Switch hover size="small" element={element}>Engines</Switch>
                    <Switch hover element={element}>Engines</Switch>
                    <Switch hover size="large" element={element}>Engines</Switch>
                </Inline>
                <Inline align="end">
                    <Switch focus hover size="small" element={element}>Engines</Switch>
                    <Switch focus hover element={element}>Engines</Switch>
                    <Switch focus hover size="large" element={element}>Engines</Switch>
                </Inline>
                <Inline align="end">
                    <Switch disabled size="small" element={element}>Engines</Switch>
                    <Switch disabled element={element}>Engines</Switch>
                    <Switch disabled size="large" element={element}>Engines</Switch>
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
                        <IconGroup>
                            <EmailIcon /><EmailIcon />
                        </IconGroup>
                    </Switch>
                </div>
                <div className="mw5">
                    <Switch element={element}>
                        <Text>PA-99-N2 event and possible exoplanet in galaxy</Text>
                        <Counter variant="divider">60</Counter>
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
