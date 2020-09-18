import { Counter } from "@react-components/counter";
import { EmailIcon, IconGroup, InfoIcon, WarningIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { cloneElement } from "react";

function Radio({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createRadioTestSuite(element, stories) {
    return stories
        .add("labeled", () =>
            <Stack>
                <Inline align="end">
                    <Radio size="sm" value="any" element={element}>Milky Way</Radio>
                    <Radio value="any" element={element}>Milky Way</Radio>
                    <Radio size="lg" value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="sm" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <EmailIcon />
                    </Radio>
                    <Radio value="any" element={element}>
                        <Text>Milky Way</Text>
                        <EmailIcon />
                    </Radio>
                    <Radio size="lg" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <EmailIcon />
                    </Radio>
                    <Radio disabled value="any" element={element}>
                        <Text>Milky Way</Text>
                        <EmailIcon />
                    </Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="sm" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <IconGroup>
                            <EmailIcon /><EmailIcon /><EmailIcon />
                        </IconGroup>
                    </Radio>
                    <Radio value="any" element={element}>
                        <Text>Milky Way</Text>
                        <IconGroup>
                            <EmailIcon /><EmailIcon /><EmailIcon />
                        </IconGroup>
                    </Radio>
                    <Radio size="lg" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <IconGroup>
                            <EmailIcon /><EmailIcon /><EmailIcon />
                        </IconGroup>
                    </Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="sm" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter>60</Counter>
                    </Radio>
                    <Radio value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter>60</Counter>
                    </Radio>
                    <Radio size="lg" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter>60</Counter>
                    </Radio>
                    <Radio disabled value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter>60</Counter>
                    </Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="sm" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter variant="divider">60</Counter>
                    </Radio>
                    <Radio value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter variant="divider">60</Counter>
                    </Radio>
                    <Radio size="lg" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter variant="divider">60</Counter>
                    </Radio>
                    <Radio disabled value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter variant="divider">60</Counter>
                    </Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="sm" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Radio>
                    <Radio value="any" element={element}>
                        <Text>Milky Way</Text>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Radio>
                    <Radio size="lg" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <EmailIcon />
                        <Counter>60</Counter>
                    </Radio>
                </Inline>
                <Inline align="end">
                    <Radio size="sm" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
                    </Radio>
                    <Radio value="any" element={element}>
                        <Text>Milky Way</Text>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
                    </Radio>
                    <Radio size="lg" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <EmailIcon />
                        <Counter variant="divider">60</Counter>
                    </Radio>
                </Inline>
            </Stack>
        )
        .add("reverse", () =>
            <Stack>
                <div>
                    <Radio reverse value="any" element={element}>Milky Way</Radio>
                </div>
                <div>
                    <Radio reverse value="any" element={element}>
                        <Text>Milky Way</Text>
                        <IconGroup>
                            <EmailIcon /><InfoIcon /><WarningIcon />
                        </IconGroup>
                    </Radio>
                </div>
                <Inline>
                    <Radio reverse value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter>60</Counter>
                    </Radio>
                    <Radio reverse value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter variant="divider">60</Counter>
                    </Radio>
                </Inline>
                <Inline>
                    <Radio reverse value="any" element={element}>
                        <Text>Milky Way</Text>
                        <IconGroup>
                            <EmailIcon /><InfoIcon /><WarningIcon />
                        </IconGroup>
                        <Counter>60</Counter>
                    </Radio>
                    <Radio reverse value="any" element={element}>
                        <Text>Milky Way</Text>
                        <IconGroup>
                            <EmailIcon /><InfoIcon /><WarningIcon />
                        </IconGroup>
                        <Counter variant="divider">60</Counter>
                    </Radio>
                </Inline>
            </Stack>
        )
        .add("validation", () =>
            <Inline>
                <Radio validationState="invalid" value="any" element={element}>Milky Way</Radio>
                <Radio validationState="valid" value="any" element={element}>Milky Way</Radio>
            </Inline>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <Radio active size="sm" value="any" element={element}>Milky Way</Radio>
                    <Radio active value="any" element={element}>Milky Way</Radio>
                    <Radio active size="lg" value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio focus size="sm" value="any" element={element}>Milky Way</Radio>
                    <Radio focus value="any" element={element}>Milky Way</Radio>
                    <Radio focus size="lg" value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio hover size="sm" value="any" element={element}>Milky Way</Radio>
                    <Radio hover value="any" element={element}>Milky Way</Radio>
                    <Radio hover size="lg" value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio focus hover size="sm" value="any" element={element}>Milky Way</Radio>
                    <Radio focus hover value="any" element={element}>Milky Way</Radio>
                    <Radio focus hover size="lg" value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline align="end">
                    <Radio disabled size="sm" value="any" element={element}>Milky Way</Radio>
                    <Radio disabled value="any" element={element}>Milky Way</Radio>
                    <Radio disabled size="lg" value="any" element={element}>Milky Way</Radio>
                </Inline>
            </Stack>
        )
        .add("overflow", () =>
            <Stack>
                <div className="flex items-end mw5">
                    <Radio value="any" element={element}>PA-99-N2 event and possible exoplanet in galaxy</Radio>
                </div>
                <div className="flex items-end mw5">
                    <Radio value="any" element={element}>
                        <Text>PA-99-N2 event and possible exoplanet in galaxy</Text>
                        <IconGroup>
                            <EmailIcon /><EmailIcon />
                        </IconGroup>
                    </Radio>
                </div>
                <div className="flex items-end mw5">
                    <Radio value="any" element={element}>
                        <Text>PA-99-N2 event and possible exoplanet in galaxy</Text>
                        <Counter variant="divider">60</Counter>
                    </Radio>
                </div>
                <div className="flex items-end mw5">
                    <Radio value="any" element={element}>
                        <Text>PA-99-N2 event and possible exoplanet in galaxy</Text>
                        <Counter>60</Counter>
                    </Radio>
                </div>
            </Stack>
        );
}
