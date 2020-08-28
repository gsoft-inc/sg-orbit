import { Counter } from "@react-components/counter";
import { EmailIcon, IconGroup, InfoIcon, WarningIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Label } from "@react-components/text";
import { cloneElement } from "react";

function Checkbox({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(element, stories) {
    return stories
        .add("labeled", () =>
            <Stack>
                <Inline align="end">
                    <Checkbox size="small" element={element}>Milky Way</Checkbox>
                    <Checkbox element={element}>Milky Way</Checkbox>
                    <Checkbox size="large" element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" element={element}>
                        <Label>Milky Way</Label>
                        <EmailIcon />
                    </Checkbox>
                    <Checkbox element={element}>
                        <Label>Milky Way</Label>
                        <EmailIcon />
                    </Checkbox>
                    <Checkbox size="large" element={element}>
                        <Label>Milky Way</Label>
                        <EmailIcon />
                    </Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" element={element}>
                        <Label>Milky Way</Label>
                        <IconGroup>
                            <EmailIcon /><EmailIcon /><EmailIcon />
                        </IconGroup>
                    </Checkbox>
                    <Checkbox element={element}>
                        <Label>Milky Way</Label>
                        <IconGroup>
                            <EmailIcon /><EmailIcon /><EmailIcon />
                        </IconGroup>
                    </Checkbox>
                    <Checkbox size="large" element={element}>
                        <Label>Milky Way</Label>
                        <IconGroup>
                            <EmailIcon /><EmailIcon /><EmailIcon />
                        </IconGroup>
                    </Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" element={element}>
                        <Label>Milky Way</Label>
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox element={element}>
                        <Label>Milky Way</Label>
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox size="large" element={element}>
                        <Label>Milky Way</Label>
                        <Counter>60</Counter>
                    </Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" element={element}>
                        <Label>Milky Way</Label>
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                    <Checkbox element={element}>
                        <Label>Milky Way</Label>
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                    <Checkbox size="large" element={element}>
                        <Label>Milky Way</Label>
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" element={element}>
                        <Label>Milky Way</Label>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox element={element}>
                        <Label>Milky Way</Label>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox size="large" element={element}>
                        <Label>Milky Way</Label>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" element={element}>
                        <Label>Milky Way</Label>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                    <Checkbox element={element}>
                        <Label>Milky Way</Label>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                    <Checkbox size="large" element={element}>
                        <Label>Milky Way</Label>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
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
                    <Checkbox size="small" element={element}>
                        <EmailIcon />
                    </Checkbox>
                    <Checkbox element={element}>
                        <EmailIcon />
                    </Checkbox>
                    <Checkbox size="large" element={element}>
                        <EmailIcon />
                    </Checkbox>
                    <Checkbox disabled element={element}>
                        <EmailIcon />
                    </Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" element={element}>
                        <IconGroup>
                            <EmailIcon /><EmailIcon /><EmailIcon />
                        </IconGroup>
                    </Checkbox>
                    <Checkbox element={element}>
                        <IconGroup>
                            <EmailIcon /><EmailIcon /><EmailIcon />
                        </IconGroup>
                    </Checkbox>
                    <Checkbox size="large" element={element}>
                        <IconGroup>
                            <EmailIcon /><EmailIcon /><EmailIcon />
                        </IconGroup>
                    </Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" element={element}>
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox element={element}>
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox size="large" element={element}>
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox disabled element={element}>
                        <Counter>60</Counter>
                    </Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" element={element}>
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                    <Checkbox element={element}>
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                    <Checkbox size="large" element={element}>
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" element={element}>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox element={element}>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox size="large" element={element}>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Checkbox>
                </Inline>
                <Inline align="end">
                    <Checkbox size="small" element={element}>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                    <Checkbox element={element}>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                    <Checkbox size="large" element={element}>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                </Inline>
            </Stack>
        )
        .add("reverse", () =>
            <Stack>
                <div>
                    <Checkbox reverse element={element}>Milky Way</Checkbox>
                </div>
                <Inline>
                    <Checkbox reverse element={element}>
                        <Label>Milky Way</Label>
                        <IconGroup>
                            <EmailIcon /><InfoIcon /><WarningIcon />
                        </IconGroup>
                    </Checkbox>
                    <Checkbox reverse element={element}>
                        <IconGroup>
                            <EmailIcon /><InfoIcon /><WarningIcon />
                        </IconGroup>
                    </Checkbox>
                </Inline>
                <Inline>
                    <Checkbox reverse element={element}>
                        <Label>Milky Way</Label>
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox reverse element={element}>
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox reverse element={element}>
                        <Label>Milky Way</Label>
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                    <Checkbox reverse element={element}>
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                </Inline>
                <Inline>
                    <Checkbox reverse element={element}>
                        <Label>Milky Way</Label>
                        <IconGroup>
                            <EmailIcon /><InfoIcon /><WarningIcon />
                        </IconGroup>
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox reverse element={element}>
                        <IconGroup>
                            <EmailIcon /><InfoIcon /><WarningIcon />
                        </IconGroup>
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox reverse element={element}>
                        <Label>Milky Way</Label>
                        <IconGroup>
                            <EmailIcon /><InfoIcon /><WarningIcon />
                        </IconGroup>
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                    <Checkbox reverse element={element}>
                        <IconGroup><EmailIcon /><InfoIcon /><WarningIcon /></IconGroup>
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <Checkbox active size="small" element={element}></Checkbox>
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
                <div className="flex items-end mw5">
                    <Checkbox element={element}>PA-99-N2 event and possible exoplanet in galaxy</Checkbox>
                </div>
                <div className="flex items-end mw5">
                    <Checkbox element={element}>
                        <Label>PA-99-N2 event and possible exoplanet in galaxy</Label>
                        <IconGroup>
                            <EmailIcon /><EmailIcon />
                        </IconGroup>
                    </Checkbox>
                </div>
                <div className="flex items-end mw5">
                    <Checkbox element={element}>
                        <Label>PA-99-N2 event and possible exoplanet in galaxy</Label>
                        <Counter variant="divider">60</Counter>
                    </Checkbox>
                </div>
                <div className="flex items-end mw5">
                    <Checkbox element={element}>
                        <Label>PA-99-N2 event and possible exoplanet in galaxy</Label>
                        <Counter>60</Counter>
                    </Checkbox>
                </div>
            </Stack>
        );
}
