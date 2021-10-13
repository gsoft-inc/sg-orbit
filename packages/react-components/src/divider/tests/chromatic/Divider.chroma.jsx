import { Div } from "@react-components/html";
import { Divider } from "@react-components/divider";
import { Dot } from "@react-components/dot";
import { Flex, Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/typography";
import { TextLink } from "@react-components/link";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Divider")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Divider />,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
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
        <Divider height="500px">Since 1978 there have been more than 10 space exploration missions.</Divider>
    )
    .add("labelled + surrounded", () =>
        <Div>
            <Text>Apollo 11 - 1969</Text>
            <Divider>Since 1978</Divider>
            <Text>Voyager 1 - 1990</Text>
        </Div>
    )
    .add("styling", () =>
        <Stack>
            <Divider border="sunray-10" />
            <Divider className="border-red" />
            <Divider style={{ border: "1px solid red" }} />
        </Stack>
    );

stories("/vertical")
    .add("default", () =>
        <Div height="500px">
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
        <Div height="500px">
            <Divider orientation="vertical">Since 1978</Divider>
        </Div>
    )
    .add("long label", () =>
        <Div height="500px">
            <Divider orientation="vertical">Since 1978 there have been more than 10 space exploration missions.</Divider>
        </Div>
    )
    .add("labelled + surrounded", () =>
        <Flex height="500px">
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
    .add("styling", () =>
        <Inline height="500px">
            <Divider border="sunray-10" orientation="vertical" />
            <Divider className="border-red" orientation="vertical" />
            <Divider style={{ border: "1px solid red" }} orientation="vertical" />
        </Inline>
    );
