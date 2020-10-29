import { CheckCircleIcon, IconList } from "@react-components/icons";
import { Counter } from "@react-components/counter";
import { Dot } from "@react-components/dot";
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
                <Inline verticalAlign="end">
                    <Tag size="sm" element={element}>Falcon 9</Tag>
                    <Tag element={element}>Falcon 9</Tag>
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
                <Inline verticalAlign="end">
                    <Tag size="sm" element={element}>
                        <CheckCircleIcon />
                        <Text>Falcon 9</Text>
                    </Tag>
                    <Tag element={element}>
                        <CheckCircleIcon />
                        <Text>Falcon 9</Text>
                    </Tag>
                </Inline>
                <Inline verticalAlign="end">
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
                <Inline verticalAlign="end">
                    <Tag size="sm" element={element}>
                        <Dot />
                        <Text>Falcon 9</Text>
                    </Tag>
                    <Tag element={element}>
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
                <Inline verticalAlign="end">
                    <Tag size="sm" element={element}>
                        <Text>Falcon 9</Text>
                        <Counter>60</Counter>
                    </Tag>
                    <Tag element={element}>
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
        .add("remove button", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <Tag size="sm" onRemove={() => {}} element={element}>
                        Falcon 9
                    </Tag>
                    <Tag onRemove={() => {}} element={element}>
                        Falcon 9
                    </Tag>
                </Inline>
                <Inline>
                    <Tag fluid onRemove={() => {}} element={element}>
                        Falcon 9
                    </Tag>
                </Inline>
                <Inline className="w-10">
                    <Tag fluid onRemove={() => {}} element={element}>
                        Falcon 9
                    </Tag>
                </Inline>
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
