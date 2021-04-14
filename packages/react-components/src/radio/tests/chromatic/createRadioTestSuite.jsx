import { Counter } from "@react-components/counter";
import { IconList, InfoIcon, MailIcon, WarningIcon } from "@react-components/icons";
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
                <div>
                    <Radio value="any" element={element}>Milky Way</Radio>
                </div>
                <Inline verticalAlign="end">
                    <Radio value="any" element={element}>
                        <Text>Milky Way</Text>
                        <MailIcon />
                    </Radio>
                    <Radio disabled value="any" element={element}>
                        <Text>Milky Way</Text>
                        <MailIcon />
                    </Radio>
                </Inline>
                <div>
                    <Radio value="any" element={element}>
                        <Text>Milky Way</Text>
                        <IconList>
                            <MailIcon /><MailIcon /><MailIcon />
                        </IconList>
                    </Radio>
                </div>
                <Inline verticalAlign="end">
                    <Radio value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter>60</Counter>
                    </Radio>
                    <Radio disabled value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter>60</Counter>
                    </Radio>
                </Inline>
                <div>
                    <Radio value="any" element={element}>
                        <Text>Milky Way</Text>
                        <MailIcon />
                        <Counter>60</Counter>
                    </Radio>
                </div>
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
                        <IconList>
                            <MailIcon /><InfoIcon /><WarningIcon />
                        </IconList>
                    </Radio>
                </div>
                <div>
                    <Radio reverse value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter>60</Counter>
                    </Radio>
                </div>
                <div>
                    <Radio reverse value="any" element={element}>
                        <Text>Milky Way</Text>
                        <IconList>
                            <MailIcon /><InfoIcon /><WarningIcon />
                        </IconList>
                        <Counter>60</Counter>
                    </Radio>
                </div>
            </Stack>
        )
        .add("validation", () =>
            <Stack>
                <Inline>
                    <Radio validationState="invalid" value="any" element={element}>Milky Way</Radio>
                    <Radio validationState="valid" value="any" element={element}>Milky Way</Radio>
                </Inline>
                <Inline>
                    <Radio validationState="invalid" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <MailIcon />
                    </Radio>
                    <Radio validationState="invalid" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter>60</Counter>
                    </Radio>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <div>
                    <Radio active value="any" element={element}>Milky Way</Radio>
                </div>
                <div>
                    <Radio focus value="any" element={element}>Milky Way</Radio>
                </div>
                <div>
                    <Radio hover value="any" element={element}>Milky Way</Radio>
                </div>
                <div>
                    <Radio focus hover value="any" element={element}>Milky Way</Radio>
                </div>
                <div>
                    <Radio disabled value="any" element={element}>Milky Way</Radio>
                </div>
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
                        <IconList>
                            <MailIcon /><MailIcon />
                        </IconList>
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
