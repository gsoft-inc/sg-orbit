import { Badge } from "@react-components/badge";
import { EmailIcon, IconGroup, InfoIcon, WarningIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { cloneElement } from "react";

function Checkbox({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline align="end">
                    <Checkbox size="small" element={element}>Milky Way</Checkbox>
                    <Checkbox element={element}>Milky Way</Checkbox>
                    <Checkbox size="large" element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<EmailIcon />} element={element}>Milky Way</Checkbox>
                    <Checkbox icon={<EmailIcon />} element={element}>Milky Way</Checkbox>
                    <Checkbox size="large" icon={<EmailIcon />} element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element}>Milky Way</Checkbox>
                    <Checkbox icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element}>Milky Way</Checkbox>
                    <Checkbox size="large" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" badge={<Badge>60</Badge>} element={element}>Milky Way</Checkbox>
                    <Checkbox badge={<Badge>60</Badge>} element={element}>Milky Way</Checkbox>
                    <Checkbox size="large" badge={<Badge>60</Badge>} element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" badge={<Badge variant="inline">60</Badge>} element={element}>Milky Way</Checkbox>
                    <Checkbox badge={<Badge variant="inline">60</Badge>} element={element}>Milky Way</Checkbox>
                    <Checkbox size="large" badge={<Badge variant="inline">60</Badge>} element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element}>Milky Way</Checkbox>
                    <Checkbox icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element}>Milky Way</Checkbox>
                    <Checkbox size="large" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element}>Milky Way</Checkbox>
                    <Checkbox icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element}>Milky Way</Checkbox>
                    <Checkbox size="large" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element}>Milky Way</Checkbox>
                </Inline>
            </Stack>
        )
        .add("no label", () =>
            <Stack>
                <Inline align="end">
                    <Checkbox size="small" element={element} />
                    <Checkbox element={element} />
                    <Checkbox size="large" element={element} />
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<EmailIcon />} element={element} />
                    <Checkbox icon={<EmailIcon />} element={element} />
                    <Checkbox size="large" icon={<EmailIcon />} element={element} />
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element} />
                    <Checkbox icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element} />
                    <Checkbox size="large" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={element} />
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" badge={<Badge>60</Badge>} element={element} />
                    <Checkbox badge={<Badge>60</Badge>} element={element} />
                    <Checkbox size="large" badge={<Badge>60</Badge>} element={element} />
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" badge={<Badge variant="inline">60</Badge>} element={element} />
                    <Checkbox badge={<Badge variant="inline">60</Badge>} element={element} />
                    <Checkbox size="large" badge={<Badge variant="inline">60</Badge>} element={element} />
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element} />
                    <Checkbox icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element} />
                    <Checkbox size="large" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={element} />
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element} />
                    <Checkbox icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element} />
                    <Checkbox size="large" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={element} />
                </Inline>
            </Stack>
        )
        .add("reverse", () =>
            <Stack>
                <div>
                    <Checkbox reverse element={element}>Milky Way</Checkbox>
                </div>
                <Inline>
                    <Checkbox icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} reverse element={element}>Milky Way</Checkbox>
                    <Checkbox icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} reverse element={element} />
                </Inline>
                <Inline>
                    <Checkbox badge={<Badge>60</Badge>} reverse element={element}>Milky Way</Checkbox>
                    <Checkbox badge={<Badge>60</Badge>} reverse element={element} />
                    <Checkbox badge={<Badge variant="inline">60</Badge>} reverse element={element}>Milky Way</Checkbox>
                    <Checkbox badge={<Badge variant="inline">60</Badge>} reverse element={element} />
                </Inline>
                <Inline>
                    <Checkbox icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge>60</Badge>} reverse element={element}>Milky Way</Checkbox>
                    <Checkbox icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge>60</Badge>} reverse element={element} />
                    <Checkbox icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge variant="inline">60</Badge>} reverse element={element}>Milky Way</Checkbox>
                    <Checkbox icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge variant="inline">60</Badge>} reverse element={element} />
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <Checkbox active size="small" element={element}>Milky Way</Checkbox>
                    <Checkbox active element={element}>Milky Way</Checkbox>
                    <Checkbox active size="large" element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox focus size="small" element={element}>Milky Way</Checkbox>
                    <Checkbox focus element={element}>Milky Way</Checkbox>
                    <Checkbox focus size="large" element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox hover size="small" element={element}>Milky Way</Checkbox>
                    <Checkbox hover element={element}>Milky Way</Checkbox>
                    <Checkbox hover size="large" element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox focus hover size="small" element={element}>Milky Way</Checkbox>
                    <Checkbox focus hover element={element}>Milky Way</Checkbox>
                    <Checkbox focus hover size="large" element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox disabled size="small" element={element}>Milky Way</Checkbox>
                    <Checkbox disabled element={element}>Milky Way</Checkbox>
                    <Checkbox disabled size="large" element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox readOnly size="small" element={element}>Milky Way</Checkbox>
                    <Checkbox readOnly element={element}>Milky Way</Checkbox>
                    <Checkbox readOnly size="large" element={element}>Milky Way</Checkbox>
                </Inline>
            </Stack>
        )
        .add("overflow", () =>
            <Stack>
                <div className="mw5">
                    <Checkbox element={element}>PA-99-N2 event and possible exoplanet in galaxy</Checkbox>
                </div>
                <div className="mw5">
                    <Checkbox icon={<IconGroup><EmailIcon /><EmailIcon /></IconGroup>} element={element}>PA-99-N2 event and possible exoplanet in galaxy</Checkbox>
                </div>
                <div className="mw5">
                    <Checkbox badge={<Badge variant="inline">60</Badge>} element={element}>PA-99-N2 event and possible exoplanet in galaxy</Checkbox>
                </div>
                <div className="mw5">
                    <Checkbox badge={<Badge>60</Badge>} element={element}>PA-99-N2 event and possible exoplanet in galaxy</Checkbox>
                </div>
            </Stack>
        );
}
