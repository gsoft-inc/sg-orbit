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
                    <Radio size="small" value="any" element={element}>Milky Way</Radio>
                    <Radio value="any" element={element}>Milky Way</Radio>
                    <Radio size="large" value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="small" icon={<EmailIcon />} value="any" element={element}>Milky Way</Radio>
                    <Radio icon={<EmailIcon />} value="any" element={element}>Milky Way</Radio>
                    <Radio size="large" icon={<EmailIcon />} value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="small" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} value="any" element={element}>Milky Way</Radio>
                    <Radio icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} value="any" element={element}>Milky Way</Radio>
                    <Radio size="large" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="small" badge={<Badge>60</Badge>} value="any" element={element}>Milky Way</Radio>
                    <Radio badge={<Badge>60</Badge>} value="any" element={element}>Milky Way</Radio>
                    <Radio size="large" badge={<Badge>60</Badge>} value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="small" badge={<Badge variant="inline">60</Badge>} value="any" element={element}>Milky Way</Radio>
                    <Radio badge={<Badge variant="inline">60</Badge>} value="any" element={element}>Milky Way</Radio>
                    <Radio size="large" badge={<Badge variant="inline">60</Badge>} value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="small" icon={<EmailIcon />} badge={<Badge>60</Badge>} value="any" element={element}>Milky Way</Radio>
                    <Radio icon={<EmailIcon />} badge={<Badge>60</Badge>} value="any" element={element}>Milky Way</Radio>
                    <Radio size="large" icon={<EmailIcon />} badge={<Badge>60</Badge>} value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="small" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} value="any" element={element}>Milky Way</Radio>
                    <Radio icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} value="any" element={element}>Milky Way</Radio>
                    <Radio size="large" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} value="any" element={element}>Milky Way</Radio>
                </Inline>
            </Stack>
        )
        .add("reverse", () =>
            <Stack>
                <div>
                    <Radio reverse value="any" element={element}>Milky Way</Radio>
                </div>
                <div>
                    <Radio icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} reverse value="any" element={element}>Milky Way</Radio>
                </div>
                <Inline>
                    <Radio badge={<Badge>60</Badge>} reverse value="any" element={element}>Milky Way</Radio>
                    <Radio badge={<Badge variant="inline">60</Badge>} reverse value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline>
                    <Radio icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge>60</Badge>} reverse value="any" element={element}>Milky Way</Radio>
                    <Radio icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge variant="inline">60</Badge>} reverse value="any" element={element}>Milky Way</Radio>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <Radio active size="small" value="any" element={element}>Milky Way</Radio>
                    <Radio active value="any" element={element}>Milky Way</Radio>
                    <Radio active size="large" value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio focus size="small" value="any" element={element}>Milky Way</Radio>
                    <Radio focus value="any" element={element}>Milky Way</Radio>
                    <Radio focus size="large" value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio hover size="small" value="any" element={element}>Milky Way</Radio>
                    <Radio hover value="any" element={element}>Milky Way</Radio>
                    <Radio hover size="large" value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio focus hover size="small" value="any" element={element}>Milky Way</Radio>
                    <Radio focus hover value="any" element={element}>Milky Way</Radio>
                    <Radio focus hover size="large" value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio disabled size="small" value="any" element={element}>Milky Way</Radio>
                    <Radio disabled value="any" element={element}>Milky Way</Radio>
                    <Radio disabled size="large" value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio readOnly size="small" value="any" element={element}>Milky Way</Radio>
                    <Radio readOnly value="any" element={element}>Milky Way</Radio>
                    <Radio readOnly size="large" value="any" element={element}>Milky Way</Radio>
                </Inline>
            </Stack>
        )
        .add("overflow", () =>
            <Stack>
                <div className="flex items-end mw5">
                    <Radio value="any" element={element}>PA-99-N2 event and possible exoplanet in galaxy</Radio>
                </div>
                <div className="flex items-end mw5">
                    <Radio icon={<IconGroup><EmailIcon /><EmailIcon /></IconGroup>} value="any" element={element}>PA-99-N2 event and possible exoplanet in galaxy</Radio>
                </div>
                <div className="flex items-end mw5">
                    <Radio badge={<Badge variant="inline">60</Badge>} value="any" element={element}>PA-99-N2 event and possible exoplanet in galaxy</Radio>
                </div>
                <div className="flex items-end mw5">
                    <Radio badge={<Badge>60</Badge>} value="any" element={element}>PA-99-N2 event and possible exoplanet in galaxy</Radio>
                </div>
            </Stack>
        );
}
