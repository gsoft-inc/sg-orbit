import { Counter } from "@react-components/counter";
import { EmailIcon, IconGroup, InfoIcon, WarningIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
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
                    <Switch size="small" icon={<EmailIcon />} element={element}>Engines</Switch>
                    <Switch icon={<EmailIcon />} element={element}>Engines</Switch>
                    <Switch size="large" icon={<EmailIcon />} element={element}>Engines</Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element}>Engines</Switch>
                    <Switch icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element}>Engines</Switch>
                    <Switch size="large" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element}>Engines</Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" counter={<Counter>60</Counter>} element={element}>Engines</Switch>
                    <Switch counter={<Counter>60</Counter>} element={element}>Engines</Switch>
                    <Switch size="large" counter={<Counter>60</Counter>} element={element}>Engines</Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" counter={<Counter variant="inline">60</Counter>} element={element}>Engines</Switch>
                    <Switch counter={<Counter variant="inline">60</Counter>} element={element}>Engines</Switch>
                    <Switch size="large" counter={<Counter variant="inline">60</Counter>} element={element}>Engines</Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" icon={<EmailIcon />} counter={<Counter>60</Counter>} element={element}>Engines</Switch>
                    <Switch icon={<EmailIcon />} counter={<Counter>60</Counter>} element={element}>Engines</Switch>
                    <Switch size="large" icon={<EmailIcon />} counter={<Counter>60</Counter>} element={element}>Engines</Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" icon={<EmailIcon />} counter={<Counter variant="inline">60</Counter>} element={element}>Engines</Switch>
                    <Switch icon={<EmailIcon />} counter={<Counter variant="inline">60</Counter>} element={element}>Engines</Switch>
                    <Switch size="large" icon={<EmailIcon />} counter={<Counter variant="inline">60</Counter>} element={element}>Engines</Switch>
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
                    <Switch size="small" icon={<EmailIcon />} element={element} />
                    <Switch icon={<EmailIcon />} element={element} />
                    <Switch size="large" icon={<EmailIcon />} element={element} />
                </Inline>
                <Inline align="end">
                    <Switch size="small" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element} />
                    <Switch icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element} />
                    <Switch size="large" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element} />
                </Inline>
                <Inline align="end">
                    <Switch size="small" counter={<Counter>60</Counter>} element={element} />
                    <Switch counter={<Counter>60</Counter>} element={element} />
                    <Switch size="large" counter={<Counter>60</Counter>} element={element} />
                </Inline>
                <Inline align="end">
                    <Switch size="small" counter={<Counter variant="inline">60</Counter>} element={element} />
                    <Switch counter={<Counter variant="inline">60</Counter>} element={element} />
                    <Switch size="large" counter={<Counter variant="inline">60</Counter>} element={element} />
                </Inline>
                <Inline align="end">
                    <Switch size="small" icon={<EmailIcon />} counter={<Counter>60</Counter>} element={element} />
                    <Switch icon={<EmailIcon />} counter={<Counter>60</Counter>} element={element} />
                    <Switch size="large" icon={<EmailIcon />} counter={<Counter>60</Counter>} element={element} />
                </Inline>
                <Inline align="end">
                    <Switch size="small" icon={<EmailIcon />} counter={<Counter variant="inline">60</Counter>} element={element} />
                    <Switch icon={<EmailIcon />} counter={<Counter variant="inline">60</Counter>} element={element} />
                    <Switch size="large" icon={<EmailIcon />} counter={<Counter variant="inline">60</Counter>} element={element} />
                </Inline>
            </Stack>
        )
        .add("reverse", () =>
            <Stack>
                <div>
                    <Switch reverse element={element}>Engines</Switch>
                </div>
                <Inline>
                    <Switch icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} reverse element={element}>Engines</Switch>
                    <Switch icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} reverse element={element} />
                </Inline>
                <Inline>
                    <Switch counter={<Counter>60</Counter>} reverse element={element}>Engines</Switch>
                    <Switch counter={<Counter>60</Counter>} reverse element={element} />
                    <Switch counter={<Counter variant="inline">60</Counter>} reverse element={element}>Engines</Switch>
                    <Switch counter={<Counter variant="inline">60</Counter>} reverse element={element} />
                </Inline>
                <Inline>
                    <Switch icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} counter={<Counter>60</Counter>} reverse element={element}>Engines</Switch>
                    <Switch icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} counter={<Counter>60</Counter>} reverse element={element} />
                    <Switch icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} counter={<Counter variant="inline">60</Counter>} reverse element={element}>Engines</Switch>
                    <Switch icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} counter={<Counter variant="inline">60</Counter>} reverse element={element} />
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
                <Inline align="end">
                    <Switch readOnly size="small" element={element}>Engines</Switch>
                    <Switch readOnly element={element}>Engines</Switch>
                    <Switch readOnly size="large" element={element}>Engines</Switch>
                </Inline>
            </Stack>
        )
        .add("overflow", () =>
            <Stack>
                <div className="mw5">
                    <Switch element={element}>PA-99-N2 event and possible exoplanet in galaxy</Switch>
                </div>
                <div className="mw5">
                    <Switch icon={<IconGroup><EmailIcon /><EmailIcon /></IconGroup>} element={element}>PA-99-N2 event and possible exoplanet in galaxy</Switch>
                </div>
                <div className="mw5">
                    <Switch counter={<Counter variant="inline">60</Counter>} element={element}>PA-99-N2 event and possible exoplanet in galaxy</Switch>
                </div>
                <div className="mw5">
                    <Switch counter={<Counter>60</Counter>} element={element}>PA-99-N2 event and possible exoplanet in galaxy</Switch>
                </div>
            </Stack>
        );
}
