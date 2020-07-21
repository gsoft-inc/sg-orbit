import { Badge } from "@react-components/badge";
import { EmailIcon, IconGroup, InfoIcon, WarningIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { cloneElement } from "react";

function Checkbox({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(checkbox, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline align="end">
                    <Checkbox size="small" element={checkbox}>Milky Way</Checkbox>
                    <Checkbox element={checkbox}>Milky Way</Checkbox>
                    <Checkbox size="large" element={checkbox}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<EmailIcon />} element={checkbox}>Milky Way</Checkbox>
                    <Checkbox icon={<EmailIcon />} element={checkbox}>Milky Way</Checkbox>
                    <Checkbox size="large" icon={<EmailIcon />} element={checkbox}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={checkbox}>Milky Way</Checkbox>
                    <Checkbox icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={checkbox}>Milky Way</Checkbox>
                    <Checkbox size="large" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={checkbox}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" badge={<Badge>60</Badge>} element={checkbox}>Milky Way</Checkbox>
                    <Checkbox badge={<Badge>60</Badge>} element={checkbox}>Milky Way</Checkbox>
                    <Checkbox size="large" badge={<Badge>60</Badge>} element={checkbox}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" badge={<Badge variant="inline">60</Badge>} element={checkbox}>Milky Way</Checkbox>
                    <Checkbox badge={<Badge variant="inline">60</Badge>} element={checkbox}>Milky Way</Checkbox>
                    <Checkbox size="large" badge={<Badge variant="inline">60</Badge>} element={checkbox}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={checkbox}>Milky Way</Checkbox>
                    <Checkbox icon={<EmailIcon />} badge={<Badge>60</Badge>} element={checkbox}>Milky Way</Checkbox>
                    <Checkbox size="large" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={checkbox}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={checkbox}>Milky Way</Checkbox>
                    <Checkbox icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={checkbox}>Milky Way</Checkbox>
                    <Checkbox size="large" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={checkbox}>Milky Way</Checkbox>
                </Inline>
            </Stack>
        )
        .add("no label", () =>
            <Stack>
                <Inline align="end">
                    <Checkbox size="small" element={checkbox} />
                    <Checkbox element={checkbox} />
                    <Checkbox size="large" element={checkbox} />
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<EmailIcon />} element={checkbox} />
                    <Checkbox icon={<EmailIcon />} element={checkbox} />
                    <Checkbox size="large" icon={<EmailIcon />} element={checkbox} />
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={checkbox} />
                    <Checkbox icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={checkbox} />
                    <Checkbox size="large" icon={<IconGroup><EmailIcon /><EmailIcon /><EmailIcon /></IconGroup>} element={checkbox} />
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" badge={<Badge>60</Badge>} element={checkbox} />
                    <Checkbox badge={<Badge>60</Badge>} element={checkbox} />
                    <Checkbox size="large" badge={<Badge>60</Badge>} element={checkbox} />
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" badge={<Badge variant="inline">60</Badge>} element={checkbox} />
                    <Checkbox badge={<Badge variant="inline">60</Badge>} element={checkbox} />
                    <Checkbox size="large" badge={<Badge variant="inline">60</Badge>} element={checkbox} />
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={checkbox} />
                    <Checkbox icon={<EmailIcon />} badge={<Badge>60</Badge>} element={checkbox} />
                    <Checkbox size="large" icon={<EmailIcon />} badge={<Badge>60</Badge>} element={checkbox} />
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={checkbox} />
                    <Checkbox icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={checkbox} />
                    <Checkbox size="large" icon={<EmailIcon />} badge={<Badge variant="inline">60</Badge>} element={checkbox} />
                </Inline>
            </Stack>
        )
        .add("reverse", () =>
            <Stack>
                <div>
                    <Checkbox reverse element={checkbox}>Milky Way</Checkbox>
                </div>
                <Inline>
                    <Checkbox icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} reverse element={checkbox}>Milky Way</Checkbox>
                    <Checkbox icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} reverse element={checkbox} />
                </Inline>
                <Inline>
                    <Checkbox badge={<Badge>60</Badge>} reverse element={checkbox}>Milky Way</Checkbox>
                    <Checkbox badge={<Badge>60</Badge>} reverse element={checkbox} />
                    <Checkbox badge={<Badge variant="inline">60</Badge>} reverse element={checkbox}>Milky Way</Checkbox>
                    <Checkbox badge={<Badge variant="inline">60</Badge>} reverse element={checkbox} />
                </Inline>
                <Inline>
                    <Checkbox icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge>60</Badge>} reverse element={checkbox}>Milky Way</Checkbox>
                    <Checkbox icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge>60</Badge>} reverse element={checkbox} />
                    <Checkbox icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge variant="inline">60</Badge>} reverse element={checkbox}>Milky Way</Checkbox>
                    <Checkbox icon={<IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>} badge={<Badge variant="inline">60</Badge>} reverse element={checkbox} />
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <Checkbox active size="small" element={checkbox}>Milky Way</Checkbox>
                    <Checkbox active element={checkbox}>Milky Way</Checkbox>
                    <Checkbox active size="large" element={checkbox}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox focus size="small" element={checkbox}>Milky Way</Checkbox>
                    <Checkbox focus element={checkbox}>Milky Way</Checkbox>
                    <Checkbox focus size="large" element={checkbox}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox hover size="small" element={checkbox}>Milky Way</Checkbox>
                    <Checkbox hover element={checkbox}>Milky Way</Checkbox>
                    <Checkbox hover size="large" element={checkbox}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox focus hover size="small" element={checkbox}>Milky Way</Checkbox>
                    <Checkbox focus hover element={checkbox}>Milky Way</Checkbox>
                    <Checkbox focus hover size="large" element={checkbox}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox disabled size="small" element={checkbox}>Milky Way</Checkbox>
                    <Checkbox disabled element={checkbox}>Milky Way</Checkbox>
                    <Checkbox disabled size="large" element={checkbox}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox readOnly size="small" element={checkbox}>Milky Way</Checkbox>
                    <Checkbox readOnly element={checkbox}>Milky Way</Checkbox>
                    <Checkbox readOnly size="large" element={checkbox}>Milky Way</Checkbox>
                </Inline>
            </Stack>
        )
        .add("overflow", () =>
            <Stack>
                <div className="mw5">
                    <Checkbox element={checkbox}>PA-99-N2 event and possible exoplanet in galaxy</Checkbox>
                </div>
                <div className="mw5">
                    <Checkbox icon={<IconGroup><EmailIcon /><EmailIcon /></IconGroup>}element={checkbox}>PA-99-N2 event and possible exoplanet in galaxy</Checkbox>
                </div>
                <div className="mw5">
                    <Checkbox badge={<Badge inline>60</Badge>} element={checkbox}>PA-99-N2 event and possible exoplanet in galaxy</Checkbox>
                </div>
                <div className="mw5">
                    <Checkbox badge={<Badge>60</Badge>} element={checkbox}>PA-99-N2 event and possible exoplanet in galaxy</Checkbox>
                </div>
            </Stack>
        );
}
