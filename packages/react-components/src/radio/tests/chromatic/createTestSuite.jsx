import { Badge } from "@react-components/badge";
import { EmailIcon, IconGroup, InfoIcon, WarningIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { cloneElement } from "react";

function Radio({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(element, stories) {
    return stories
        .add("labeled", () =>
            <Stack>
                <Inline align="end">
                    <Radio size="small" element={element}>Milky Way</Radio>
                    <Radio element={element}>Milky Way</Radio>
                    <Radio size="large" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="small" icon={<EmailIcon />} element={element}>Milky Way</Radio>
                    <Radio icon={<EmailIcon />} element={element}>Milky Way</Radio>
                    <Radio size="large" icon={<EmailIcon />} element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="small" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element}>Milky Way</Radio>
                    <Radio icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element}>Milky Way</Radio>
                    <Radio size="large" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="small" badge={<Badge>60</Badge>} element={element}>Milky Way</Radio>
                    <Radio badge={<Badge>60</Badge>} element={element}>Milky Way</Radio>
                    <Radio size="large" badge={<Badge>60</Badge>} element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="small" badge={<Badge variant="inline">60</Badge>} element={element}>Milky Way</Radio>
                    <Radio badge={<Badge variant="inline">60</Badge>} element={element}>Milky Way</Radio>
                    <Radio size="large" badge={<Badge variant="inline">60</Badge>} element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="small" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element}>Milky Way</Radio>
                    <Radio icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element}>Milky Way</Radio>
                    <Radio size="large" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="small" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element}>Milky Way</Radio>
                    <Radio icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element}>Milky Way</Radio>
                    <Radio size="large" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element}>Milky Way</Radio>
                </Inline>
            </Stack>
        )
        .add("no label", () =>
            <Stack>
                <Inline align="end">
                    <Radio size="small" element={element} />
                    <Radio element={element} />
                    <Radio size="large" element={element} />
                </Inline>
                <Inline align="end">
                    <Radio size="small" icon={<EmailIcon />} element={element} />
                    <Radio icon={<EmailIcon />} element={element} />
                    <Radio size="large" icon={<EmailIcon />} element={element} />
                </Inline>
                <Inline align="end">
                    <Radio size="small" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element} />
                    <Radio icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element} />
                    <Radio size="large" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element} />
                </Inline>
                <Inline align="end">
                    <Radio size="small" badge={<Badge>60</Badge>} element={element} />
                    <Radio badge={<Badge>60</Badge>} element={element} />
                    <Radio size="large" badge={<Badge>60</Badge>} element={element} />
                </Inline>
                <Inline align="end">
                    <Radio size="small" badge={<Badge variant="inline">60</Badge>} element={element} />
                    <Radio badge={<Badge variant="inline">60</Badge>} element={element} />
                    <Radio size="large" badge={<Badge variant="inline">60</Badge>} element={element} />
                </Inline>
                <Inline align="end">
                    <Radio size="small" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element} />
                    <Radio icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element} />
                    <Radio size="large" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element} />
                </Inline>
                <Inline align="end">
                    <Radio size="small" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element} />
                    <Radio icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element} />
                    <Radio size="large" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element} />
                </Inline>
            </Stack>
        )
        .add("reverse", () =>
            <Stack>
                <div>
                    <Radio reverse element={element}>Milky Way</Radio>
                </div>
                <Inline>
                    <Radio icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} reverse element={element}>Milky Way</Radio>
                    <Radio icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} reverse element={element} />
                </Inline>
                <Inline>
                    <Radio badge={<Badge>60</Badge>} reverse element={element}>Milky Way</Radio>
                    <Radio badge={<Badge>60</Badge>} reverse element={element} />
                    <Radio badge={<Badge variant="inline">60</Badge>} reverse element={element}>Milky Way</Radio>
                    <Radio badge={<Badge variant="inline">60</Badge>} reverse element={element} />
                </Inline>
                <Inline>
                    <Radio icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge>60</Badge>} reverse element={element}>Milky Way</Radio>
                    <Radio icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge>60</Badge>} reverse element={element} />
                    <Radio icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge variant="inline">60</Badge>} reverse element={element}>Milky Way</Radio>
                    <Radio icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge variant="inline">60</Badge>} reverse element={element} />
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <Radio active size="small" element={element}>Milky Way</Radio>
                    <Radio active element={element}>Milky Way</Radio>
                    <Radio active size="large" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio focus size="small" element={element}>Milky Way</Radio>
                    <Radio focus element={element}>Milky Way</Radio>
                    <Radio focus size="large" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio hover size="small" element={element}>Milky Way</Radio>
                    <Radio hover element={element}>Milky Way</Radio>
                    <Radio hover size="large" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio focus hover size="small" element={element}>Milky Way</Radio>
                    <Radio focus hover element={element}>Milky Way</Radio>
                    <Radio focus hover size="large" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio disabled size="small" element={element}>Milky Way</Radio>
                    <Radio disabled element={element}>Milky Way</Radio>
                    <Radio disabled size="large" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio readOnly size="small" element={element}>Milky Way</Radio>
                    <Radio readOnly element={element}>Milky Way</Radio>
                    <Radio readOnly size="large" element={element}>Milky Way</Radio>
                </Inline>
            </Stack>
        )
        .add("overflow", () =>
            <Stack>
                <div className="flex items-end mw5">
                    <Radio element={element}>PA-99-N2 event and possible exoplanet in galaxy</Radio>
                </div>
                <div className="flex items-end mw5">
                    <Radio icon={<IconGroup><EmailIcon /><EmailIcon /></IconGroup>} element={element}>PA-99-N2 event and possible exoplanet in galaxy</Radio>
                </div>
                <div className="flex items-end mw5">
                    <Radio badge={<Badge variant="inline">60</Badge>} element={element}>PA-99-N2 event and possible exoplanet in galaxy</Radio>
                </div>
                <div className="flex items-end mw5">
                    <Radio badge={<Badge>60</Badge>} element={element}>PA-99-N2 event and possible exoplanet in galaxy</Radio>
                </div>
            </Stack>
        );
}
