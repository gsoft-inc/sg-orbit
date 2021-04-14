import { Counter } from "@react-components/counter";
import { IconList, InfoIcon, MailIcon, WarningIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { cloneElement } from "react";

function Checkbox({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createCheckboxTestSuite(element, stories) {
    return stories
        .add("labeled", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Checkbox size="sm" element={element}>Milky Way</Checkbox>
                    <Checkbox element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline verticalAlign="end">
                    <Checkbox size="sm" element={element}>
                        <Text>Milky Way</Text>
                        <MailIcon />
                    </Checkbox>
                    <Checkbox element={element}>
                        <Text>Milky Way</Text>
                        <MailIcon />
                    </Checkbox>
                </Inline>
                <Inline verticalAlign="end">
                    <Checkbox size="sm" element={element}>
                        <Text>Milky Way</Text>
                        <IconList>
                            <MailIcon /><MailIcon /><MailIcon />
                        </IconList>
                    </Checkbox>
                    <Checkbox element={element}>
                        <Text>Milky Way</Text>
                        <IconList>
                            <MailIcon /><MailIcon /><MailIcon />
                        </IconList>
                    </Checkbox>
                </Inline>
                <Inline verticalAlign="end">
                    <Checkbox size="sm" element={element}>
                        <Text>Milky Way</Text>
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox element={element}>
                        <Text>Milky Way</Text>
                        <Counter>60</Counter>
                    </Checkbox>
                </Inline>
                <Inline verticalAlign="end">
                    <Checkbox size="sm" element={element}>
                        <Text>Milky Way</Text>
                        <MailIcon />
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox element={element}>
                        <Text>Milky Way</Text>
                        <MailIcon />
                        <Counter>60</Counter>
                    </Checkbox>
                </Inline>
            </Stack>
        )
        .add("no label", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Checkbox size="sm" element={element} />
                    <Checkbox element={element} />
                </Inline>
                <Inline verticalAlign="end">
                    <Checkbox size="sm" element={element}>
                        <MailIcon />
                    </Checkbox>
                    <Checkbox element={element}>
                        <MailIcon />
                    </Checkbox>
                    <Checkbox disabled element={element}>
                        <MailIcon />
                    </Checkbox>
                </Inline>
                <Inline verticalAlign="end">
                    <Checkbox size="sm" element={element}>
                        <IconList>
                            <MailIcon /><MailIcon /><MailIcon />
                        </IconList>
                    </Checkbox>
                    <Checkbox element={element}>
                        <IconList>
                            <MailIcon /><MailIcon /><MailIcon />
                        </IconList>
                    </Checkbox>
                </Inline>
                <Inline verticalAlign="end">
                    <Checkbox size="sm" element={element}>
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox element={element}>
                        <Counter>60</Counter>
                    </Checkbox>
                </Inline>
                <Inline verticalAlign="end">
                    <Checkbox size="sm" element={element}>
                        <MailIcon />
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox element={element}>
                        <MailIcon />
                        <Counter>60</Counter>
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
                        <Text>Milky Way</Text>
                        <IconList>
                            <MailIcon /><InfoIcon /><WarningIcon />
                        </IconList>
                    </Checkbox>
                    <Checkbox reverse element={element}>
                        <IconList>
                            <MailIcon /><InfoIcon /><WarningIcon />
                        </IconList>
                    </Checkbox>
                </Inline>
                <Inline>
                    <Checkbox reverse element={element}>
                        <Text>Milky Way</Text>
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox reverse element={element}>
                        <Counter>60</Counter>
                    </Checkbox>
                </Inline>
                <Inline>
                    <Checkbox reverse element={element}>
                        <Text>Milky Way</Text>
                        <IconList>
                            <MailIcon /><InfoIcon /><WarningIcon />
                        </IconList>
                        <Counter>60</Counter>
                    </Checkbox>
                    <Checkbox reverse element={element}>
                        <IconList><MailIcon /><InfoIcon /><WarningIcon /></IconList>
                        <Counter>60</Counter>
                    </Checkbox>
                </Inline>
            </Stack>
        )
        .add("validation", () =>
            <Stack>
                <Inline>
                    <Checkbox validationState="invalid" element={element}>Milky Way</Checkbox>
                    <Checkbox validationState="valid" element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline>
                    <Checkbox validationState="invalid" element={element}>
                        <Text>Milky Way</Text>
                        <MailIcon />
                    </Checkbox>
                    <Checkbox validationState="invalid" element={element}>
                        <Text>Milky Way</Text>
                        <Counter>60</Counter>
                    </Checkbox>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Checkbox active size="sm" element={element}>Milky Way</Checkbox>
                    <Checkbox active element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline verticalAlign="end">
                    <Checkbox focus size="sm" element={element}>Milky Way</Checkbox>
                    <Checkbox focus element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline verticalAlign="end">
                    <Checkbox hover size="sm" element={element}>Milky Way</Checkbox>
                    <Checkbox hover element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline verticalAlign="end">
                    <Checkbox focus hover size="sm" element={element}>Milky Way</Checkbox>
                    <Checkbox focus hover element={element}>Milky Way</Checkbox>
                </Inline>
                <Inline verticalAlign="end">
                    <Checkbox disabled size="sm" element={element}>Milky Way</Checkbox>
                    <Checkbox disabled element={element}>Milky Way</Checkbox>
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
                        <Text>PA-99-N2 event and possible exoplanet in galaxy</Text>
                        <IconList>
                            <MailIcon /><MailIcon />
                        </IconList>
                    </Checkbox>
                </div>
                <div className="flex items-end mw5">
                    <Checkbox element={element}>
                        <Text>PA-99-N2 event and possible exoplanet in galaxy</Text>
                        <Counter>60</Counter>
                    </Checkbox>
                </div>
            </Stack>
        );
}
