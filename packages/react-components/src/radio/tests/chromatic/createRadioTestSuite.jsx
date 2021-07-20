import { Box } from "@react-components/box";
import { Counter } from "@react-components/counter";
import { EmailIcon, IconList, InfoIcon, WarningIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/typography";
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
                        <EmailIcon />
                    </Radio>
                    <Radio disabled value="any" element={element}>
                        <Text>Milky Way</Text>
                        <EmailIcon />
                    </Radio>
                </Inline>
                <div>
                    <Radio value="any" element={element}>
                        <Text>Milky Way</Text>
                        <IconList>
                            <EmailIcon /><EmailIcon /><EmailIcon />
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
                        <EmailIcon />
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
                            <EmailIcon /><InfoIcon /><WarningIcon />
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
                            <EmailIcon /><InfoIcon /><WarningIcon />
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
                        <EmailIcon />
                    </Radio>
                    <Radio validationState="invalid" value="any" element={element}>
                        <Text>Milky Way</Text>
                        <Counter>60</Counter>
                    </Radio>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Inline>
                <Stack>
                    <Box>
                        <Radio active value="any" element={element}>Milky Way</Radio>
                    </Box>
                    <Box>
                        <Radio focus value="any" element={element}>Milky Way</Radio>
                    </Box>
                    <Box>
                        <Radio hover value="any" element={element}>Milky Way</Radio>
                    </Box>
                    <Box>
                        <Radio focus hover value="any" element={element}>Milky Way</Radio>
                    </Box>
                </Stack>
                <Stack>
                    <Box>
                        <Radio disabled value="any" element={element}>Milky Way</Radio>
                    </Box>
                    <Box>
                        <Radio disabled active value="any" element={element}>Milky Way</Radio>
                    </Box>
                    <Box>
                        <Radio disabled focus value="any" element={element}>Milky Way</Radio>
                    </Box>
                    <Box>
                        <Radio disabled hover value="any" element={element}>Milky Way</Radio>
                    </Box>
                    <Box>
                        <Radio disabled focus hover value="any" element={element}>Milky Way</Radio>
                    </Box>
                </Stack>
            </Inline>
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
                            <EmailIcon /><EmailIcon />
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
