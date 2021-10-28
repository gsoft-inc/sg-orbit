import { Div } from "@components/html";
import { Divider } from "@components/divider";
import { Dot } from "@components/dot";
import { Flex, Inline, Stack } from "@components/layout";
import { Text } from "@components/typography";
import { TextLink } from "@components/link";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Divider")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Divider />
    )
    .add("surrounded", () =>
        <Div>
            <Text>Apollo 8 - 1968</Text>
            <Divider />
            <Text>Apollo 11 - 1969</Text>
        </Div>
    )
    .add("multiple separators", () =>
        <Div>
            <Text>Apollo 8 - 1968</Text>
            <Divider />
            <Text>Apollo 11 - 1969</Text>
            <Divider />
            <Text>Luna 16 - 1970</Text>
            <Divider />
            <Text>Salyut 1 - 1971</Text>
        </Div>
    )
    .add("labelled", () =>
        <Divider>Since 1978</Divider>
    )
    .add("long label", () =>
        <Divider height={16}>Since 1978 there have been more than 10 space exploration missions.</Divider>
    )
    .add("labelled + surrounded", () =>
        <Div>
            <Text>Apollo 11 - 1969</Text>
            <Divider>Since 1978</Divider>
            <Text>Voyager 1 - 1990</Text>
        </Div>
    )
    .add("zoom", () =>
        <Stack>
            <Div className="zoom-in">
                <Divider>Since 1978</Divider>
            </Div>
            <Div className="zoom-out">
                <Divider>Since 1978</Divider>
            </Div>
        </Stack>
    )
    .add("styling", () =>
        <Stack>
            <Divider border="warning-7" />
            <Divider className="border-red" />
            <Divider style={{ border: "1px solid red" }} />
        </Stack>
    );

stories("/vertical")
    .add("default", () =>
        <Div height={16}>
            <Divider orientation="vertical" />
        </Div>
    )
    .add("dot", () =>
        <Flex>
            <Dot>Engines ready</Dot>
            <Divider orientation="vertical" />
            <Text>Falcon 9</Text>
        </Flex>
    )
    .add("multiple separators", () =>
        <Flex>
            <Dot>Starlink</Dot>
            <Divider orientation="vertical" />
            <Text>Delivery #9</Text>
            <Divider orientation="vertical" />
            <TextLink href="#">View details</TextLink>
        </Flex>
    )
    .add("labelled", () =>
        <Div height={16}>
            <Divider orientation="vertical">Since 1978</Divider>
        </Div>
    )
    .add("long label", () =>
        <Div height={16}>
            <Divider orientation="vertical">Since 1978 there have been more than 10 space exploration missions.</Divider>
        </Div>
    )
    .add("labelled + surrounded", () =>
        <Flex height={16}>
            <Text>Mission goals</Text>
            <Divider orientation="vertical">Since 1978</Divider>
            <Text>Mission post mortem</Text>
        </Flex>
    )
    .add("align items", () =>
        <Flex alignItems="center">
            <Text>Mission goals</Text>
            <Divider orientation="vertical" />
            <Text size="sm">Mission post mortem</Text>
        </Flex>
    )
    .add("zoom", () =>
        <Inline height={16}>
            <Div className="zoom-in">
                <Divider orientation="vertical">Since 1978</Divider>
            </Div>
            <Div className="zoom-out">
                <Divider orientation="vertical">Since 1978</Divider>
            </Div>
        </Inline>
    )
    .add("styling", () =>
        <Inline height={16}>
            <Divider border="warning-7" orientation="vertical" />
            <Divider className="border-red" orientation="vertical" />
            <Divider style={{ border: "1px solid red" }} orientation="vertical" />
        </Inline>
    );
