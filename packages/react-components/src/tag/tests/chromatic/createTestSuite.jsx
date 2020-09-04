import { CheckCircleIcon, CrossIcon, IconGroup } from "@react-components/icons";
import { Counter } from "@react-components/counter";
import { Dot } from "@react-components/dot";
import { IconButton } from "@react-components/button";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { cloneElement } from "react";

function Tag({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline align="end">
                    <Tag size="small" element={element}>Falcon 9</Tag>
                    <Tag element={element}>Falcon 9</Tag>
                    <Tag size="large" element={element}>Falcon 9</Tag>
                </Inline>
                <Inline>
                    <Tag fluid element={element}>Falcon 9</Tag>
                </Inline>
                <Inline className="w-10">
                    <Tag fluid element={element}>Falcon 9</Tag>
                </Inline>
            </Stack>
        )
        .add("icon", () =>
            <Stack>
                <Inline align="end">
                    <Tag size="small" element={element}>
                        <CheckCircleIcon />
                        <Text>Falcon 9</Text>
                    </Tag>
                    <Tag element={element}>
                        <CheckCircleIcon />
                        <Text>Falcon 9</Text>
                    </Tag>
                    <Tag size="large" element={element}>
                        <CheckCircleIcon />
                        <Text>Falcon 9</Text>
                    </Tag>
                </Inline>
                <Inline align="end">
                    <Tag size="small" element={element}>
                        <IconGroup>
                            <CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon />
                        </IconGroup>
                        <Text>Falcon 9</Text>
                    </Tag>
                    <Tag element={element}>
                        <IconGroup>
                            <CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon />
                        </IconGroup>
                        <Text>Falcon 9</Text>
                    </Tag>
                    <Tag size="large" element={element}>
                        <IconGroup>
                            <CheckCircleIcon /><CheckCircleIcon /><CheckCircleIcon />
                        </IconGroup>
                        <Text>Falcon 9</Text>
                    </Tag>
                </Inline>
                <Inline>
                    <Tag fluid element={element}>
                        <CheckCircleIcon />
                        <Text>Falcon 9</Text>
                    </Tag>
                </Inline>
                <Inline className="w-10">
                    <Tag fluid element={element}>
                        <CheckCircleIcon />
                        <Text>Falcon 9</Text>
                    </Tag>
                </Inline>
            </Stack>
        )
        .add("dot", () =>
            <Stack>
                <Inline align="end">
                    <Tag size="small" element={element}>
                        <Dot />
                        <Text>Falcon 9</Text>
                    </Tag>
                    <Tag element={element}>
                        <Dot />
                        <Text>Falcon 9</Text>
                    </Tag>
                    <Tag size="large" element={element}>
                        <Dot />
                        <Text>Falcon 9</Text>
                    </Tag>
                </Inline>
                <Inline>
                    <Tag fluid element={element}>
                        <Dot />
                        <Text>Falcon 9</Text>
                    </Tag>
                </Inline>
                <Inline className="w-10">
                    <Tag fluid element={element}>
                        <Dot />
                        <Text>Falcon 9</Text>
                    </Tag>
                </Inline>
            </Stack>
        )
        .add("counter", () =>
            <Stack>
                <Inline align="end">
                    <Tag size="small" element={element}>
                        <Text>Falcon 9</Text>
                        <Counter>60</Counter>
                    </Tag>
                    <Tag element={element}>
                        <Text>Falcon 9</Text>
                        <Counter>60</Counter>
                    </Tag>
                    <Tag size="large" element={element}>
                        <Text>Falcon 9</Text>
                        <Counter>60</Counter>
                    </Tag>
                </Inline>
                <Inline>
                    <Tag fluid element={element}>
                        <Text>Falcon 9</Text>
                        <Counter>60</Counter>
                    </Tag>
                </Inline>
                <Inline className="w-10">
                    <Tag fluid element={element}>
                        <Text>Falcon 9</Text>
                        <Counter>60</Counter>
                    </Tag>
                </Inline>
            </Stack>
        )
        .add("button", () =>
            <Stack>
                <Inline align="end">
                    <Tag size="small" element={element}>
                        <Text>Falcon 9</Text>
                        <IconButton>
                            <CrossIcon />
                        </IconButton>
                    </Tag>
                    <Tag element={element}>
                        <Text>Falcon 9</Text>
                        <IconButton>
                            <CrossIcon />
                        </IconButton>
                    </Tag>
                    <Tag size="large" element={element}>
                        <Text>Falcon 9</Text>
                        <IconButton>
                            <CrossIcon />
                        </IconButton>
                    </Tag>
                </Inline>
                <Inline>
                    <Tag fluid element={element}>
                        <Text>Falcon 9</Text>
                        <IconButton>
                            <CrossIcon />
                        </IconButton>
                    </Tag>
                </Inline>
                <Inline className="w-10">
                    <Tag fluid element={element}>
                        <Text>Falcon 9</Text>
                        <IconButton>
                            <CrossIcon />
                        </IconButton>
                    </Tag>
                </Inline>
            </Stack>
        )
        .add("as link", () =>
            <Inline>
                <Tag as="a" element={element} href="#a">Falcon 9</Tag>
                <Tag as="a" active element={element} href="#a">Falcon 9</Tag>
                <Tag as="a" focus element={element} href="#a">Falcon 9</Tag>
                <Tag as="a" hover element={element} href="#a">Falcon 9</Tag>
                <Tag as="a" focus hover element={element} href="#a">Falcon 9</Tag>
                <Tag as="a" disabled element={element} href="#a">Falcon 9</Tag>
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
