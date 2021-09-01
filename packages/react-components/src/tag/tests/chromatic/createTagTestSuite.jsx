import { CheckCircleIcon, IconList } from "@react-components/icons";
import { Counter } from "@react-components/counter";
import { Dot } from "@react-components/dot";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/typography";
import { cloneElement } from "react";

function Tag({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTagTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline alignY="end">
                    <Tag size="sm" element={element}>Falcon 9</Tag>
                    <Tag element={element}>Falcon 9</Tag>
                </Inline>
                <Tag fluid element={element}>Falcon 9</Tag>
                <div className="w-10">
                    <Tag fluid element={element}>Falcon 9</Tag>
                </div>
            </Stack>
        )
        .add("icon", () =>
            <Stack>
                <Inline alignY="end">
                    <Tag size="sm" element={element}>
                        <CheckCircleIcon />
                        <Text>Falcon 9</Text>
                    </Tag>
                    <Tag element={element}>
                        <CheckCircleIcon />
                        <Text>Falcon 9</Text>
                    </Tag>
                </Inline>
                <Inline alignY="end">
                    <Tag size="sm" element={element}>
                        <IconList>
                            <CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon />
                        </IconList>
                        <Text>Falcon 9</Text>
                    </Tag>
                    <Tag element={element}>
                        <IconList>
                            <CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon />
                        </IconList>
                        <Text>Falcon 9</Text>
                    </Tag>
                </Inline>
                <Tag fluid element={element}>
                    <CheckCircleIcon />
                    <Text>Falcon 9</Text>
                </Tag>
                <div className="w-10">
                    <Tag fluid element={element}>
                        <CheckCircleIcon />
                        <Text>Falcon 9</Text>
                    </Tag>
                </div>
                <Inline alignY="end">
                    <Tag size="sm" element={element}>
                        <Text>Falcon 9</Text>
                        <IconList slot="end-icon">
                            <CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon />
                        </IconList>
                    </Tag>
                    <Tag element={element}>
                        <Text>Falcon 9</Text>
                        <IconList slot="end-icon">
                            <CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon />
                        </IconList>
                    </Tag>
                </Inline>
                <Tag fluid element={element}>
                    <Text>Falcon 9</Text>
                    <IconList slot="end-icon">
                        <CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon />
                    </IconList>
                </Tag>
                <div className="w-10">
                    <Tag fluid element={element}>
                        <Text>Falcon 9</Text>
                        <IconList slot="end-icon">
                            <CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon />
                        </IconList>
                    </Tag>
                </div>
                <Tag element={element}>
                    <CheckCircleIcon />
                    <Text>Falcon 9</Text>
                    <IconList slot="end-icon">
                        <CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon />
                    </IconList>
                </Tag>
                <Tag fluid element={element}>
                    <CheckCircleIcon />
                    <Text>Falcon 9</Text>
                    <IconList slot="end-icon">
                        <CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon />
                    </IconList>
                </Tag>
            </Stack>
        )
        .add("dot", () =>
            <Stack>
                <Inline alignY="end">
                    <Tag size="sm" element={element}>
                        <Dot />
                        <Text>Falcon 9</Text>
                    </Tag>
                    <Tag element={element}>
                        <Dot />
                        <Text>Falcon 9</Text>
                    </Tag>
                </Inline>
                <Tag fluid element={element}>
                    <Dot />
                    <Text>Falcon 9</Text>
                </Tag>
                <div className="w-10">
                    <Tag fluid element={element}>
                        <Dot />
                        <Text>Falcon 9</Text>
                    </Tag>
                </div>
            </Stack>
        )
        .add("alignment", () =>
            <Stack>
                <Tag fluid size="sm" element={element}>
                    <Dot />
                    <Text>Falcon 9</Text>
                </Tag>
                <Tag fluid size="sm" element={element}>
                    <Text>Falcon 9</Text>
                </Tag>
                <Tag size="sm" fluid element={element}>
                    <CheckCircleIcon />
                    <Text>Falcon 9</Text>
                </Tag>
                <Tag fluid element={element}>
                    <Dot />
                    <Text>Falcon 9</Text>
                </Tag>
                <Tag fluid element={element}>
                    <Text>Falcon 9</Text>
                </Tag>
                <Tag fluid element={element}>
                    <CheckCircleIcon />
                    <Text>Falcon 9</Text>
                </Tag>
                <div className="w-10">
                    <Stack>
                        <Inline>
                            <Tag fluid size="sm" element={element}>
                                <Dot />
                                <Text>Falcon 9</Text>
                            </Tag>
                            <Tag fluid element={element}>
                                <Dot />
                                <Text>Falcon 9</Text>
                            </Tag>
                        </Inline>
                        <Inline>
                            <Tag fluid size="sm" element={element}>
                                <Text>Falcon 9</Text>
                            </Tag>
                            <Tag fluid element={element}>
                                <Text>Falcon 9</Text>
                            </Tag>
                        </Inline>
                        <Inline>
                            <Tag size="sm" fluid element={element}>
                                <CheckCircleIcon />
                                <Text>Falcon 9</Text>
                            </Tag>
                            <Tag fluid element={element}>
                                <CheckCircleIcon />
                                <Text>Falcon 9</Text>
                            </Tag>
                        </Inline>

                    </Stack>
                </div>
            </Stack>
        )
        .add("counter", () =>
            <Stack>
                <Inline alignY="end">
                    <Tag size="sm" element={element}>
                        <Text>Falcon 9</Text>
                        <Counter variant="divider">60</Counter>
                    </Tag>
                    <Tag element={element}>
                        <Text>Falcon 9</Text>
                        <Counter variant="divider">60</Counter>
                    </Tag>
                </Inline>
                <Tag fluid element={element}>
                    <Text>Falcon 9</Text>
                    <Counter>60</Counter>
                </Tag>
                <div className="w-10">
                    <Tag fluid element={element}>
                        <Text>Falcon 9</Text>
                        <Counter variant="divider">60</Counter>
                    </Tag>
                </div>
            </Stack>
        )
        .add("remove button", () =>
            <Stack>
                <Inline alignY="end">
                    <Tag size="sm" onRemove={() => {}} element={element}>
                        Falcon 9
                    </Tag>
                    <Tag onRemove={() => {}} element={element}>
                        Falcon 9
                    </Tag>
                </Inline>
                <Tag fluid onRemove={() => {}} element={element}>
                        Falcon 9
                </Tag>
                <div className="w-10">
                    <Tag fluid onRemove={() => {}} element={element}>
                        Falcon 9
                    </Tag>
                </div>
            </Stack>
        )
        .add("as link", () =>
            <Inline>
                <Tag as="a" element={element} href="#">Falcon 9</Tag>
                <Tag as="a" active element={element} href="#">Falcon 9</Tag>
                <Tag as="a" focus element={element} href="#">Falcon 9</Tag>
                <Tag as="a" hover element={element} href="#">Falcon 9</Tag>
                <Tag as="a" focus hover element={element} href="#">Falcon 9</Tag>
                <Tag as="a" disabled element={element} href="#">Falcon 9</Tag>
            </Inline>
        )
        .add("as button", () =>
            <Inline>
                <Tag as="button" element={element}>Falcon 9</Tag>
                <Tag as="button" active element={element}>Falcon 9</Tag>
                <Tag as="button" focus element={element}>Falcon 9</Tag>
                <Tag as="button" hover element={element}>Falcon 9</Tag>
                <Tag as="button" focus hover element={element}>Falcon 9</Tag>
                <Tag as="button" disabled element={element}>Falcon 9</Tag>
            </Inline>
        );
}
