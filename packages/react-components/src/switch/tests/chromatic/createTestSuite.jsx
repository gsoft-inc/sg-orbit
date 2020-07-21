import { Badge } from "@react-components/badge";
import { EmailIcon, IconGroup, InfoIcon, WarningIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { cloneElement } from "react";

function Switch({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(element, stories) {
    return stories
        .add("default", () =>
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
                    <Switch size="small" badge={<Badge>60</Badge>} element={element}>Engines</Switch>
                    <Switch badge={<Badge>60</Badge>} element={element}>Engines</Switch>
                    <Switch size="large" badge={<Badge>60</Badge>} element={element}>Engines</Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" badge={<Badge variant="inline">60</Badge>} element={element}>Engines</Switch>
                    <Switch badge={<Badge variant="inline">60</Badge>} element={element}>Engines</Switch>
                    <Switch size="large" badge={<Badge variant="inline">60</Badge>} element={element}>Engines</Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element}>Engines</Switch>
                    <Switch icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element}>Engines</Switch>
                    <Switch size="large" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element}>Engines</Switch>
                </Inline>
                <Inline align="end">
                    <Switch size="small" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element}>Engines</Switch>
                    <Switch icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element}>Engines</Switch>
                    <Switch size="large" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element}>Engines</Switch>
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
                    <Switch size="small" badge={<Badge>60</Badge>} element={element} />
                    <Switch badge={<Badge>60</Badge>} element={element} />
                    <Switch size="large" badge={<Badge>60</Badge>} element={element} />
                </Inline>
                <Inline align="end">
                    <Switch size="small" badge={<Badge variant="inline">60</Badge>} element={element} />
                    <Switch badge={<Badge variant="inline">60</Badge>} element={element} />
                    <Switch size="large" badge={<Badge variant="inline">60</Badge>} element={element} />
                </Inline>
                <Inline align="end">
                    <Switch size="small" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element} />
                    <Switch icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element} />
                    <Switch size="large" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element} />
                </Inline>
                <Inline align="end">
                    <Switch size="small" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element} />
                    <Switch icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element} />
                    <Switch size="large" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element} />
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
                    <Switch badge={<Badge>60</Badge>} reverse element={element}>Engines</Switch>
                    <Switch badge={<Badge>60</Badge>} reverse element={element} />
                    <Switch badge={<Badge variant="inline">60</Badge>} reverse element={element}>Engines</Switch>
                    <Switch badge={<Badge variant="inline">60</Badge>} reverse element={element} />
                </Inline>
                <Inline>
                    <Switch icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge>60</Badge>} reverse element={element}>Engines</Switch>
                    <Switch icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge>60</Badge>} reverse element={element} />
                    <Switch icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge variant="inline">60</Badge>} reverse element={element}>Engines</Switch>
                    <Switch icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge variant="inline">60</Badge>} reverse element={element} />
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
                    <Switch badge={<Badge variant="inline">60</Badge>} element={element}>PA-99-N2 event and possible exoplanet in galaxy</Switch>
                </div>
                <div className="mw5">
                    <Switch badge={<Badge>60</Badge>} element={element}>PA-99-N2 event and possible exoplanet in galaxy</Switch>
                </div>
            </Stack>
        );
}
