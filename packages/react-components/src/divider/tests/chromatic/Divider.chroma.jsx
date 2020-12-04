import { Box } from "@react-components/box";
import { Divider } from "@react-components/divider";
import { Dot } from "@react-components/dot";
import { Text } from "@react-components/text";
import { TextLink } from "@react-components/link";
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
        <Box>
            <Text>Apollo 8 - 1968</Text>
            <Divider />
            <Text>Apollo 11 - 1969</Text>
        </Box>
    )
    .add("multiple separators", () =>
        <Box>
            <Text>Apollo 8 - 1968</Text>
            <Divider />
            <Text>Apollo 11 - 1969</Text>
            <Divider />
            <Text>Luna 16 - 1970</Text>
            <Divider />
            <Text>Salyut 1 - 1971</Text>
        </Box>
    )
    .add("labelled", () =>
        <Divider>Since 1978</Divider>
    )
    .add("long label", () =>
        <Divider style={{ height: "500px" }}>Since 1978 there have been more than 10 space exploration missions.</Divider>
    )
    .add("labelled + surrounded", () =>
        <Box>
            <Text>Apollo 11 - 1969</Text>
            <Divider>Since 1978</Divider>
            <Text>Voyager 1 - 1990</Text>
        </Box>
    );

stories("/vertical")
    .add("default", () =>
        <Box style={{ height: "500px" }}>
            <Divider orientation="vertical" />
        </Box>
    )
    .add("dot", () =>
        <Box className="flex">
            <Dot>Engines ready</Dot>
            <Divider orientation="vertical" />
            <Text>Falcon 9</Text>
        </Box>
    )
    .add("multiple separators", () =>
        <Box className="flex">
            <Dot>Starlink</Dot>
            <Divider orientation="vertical" />
            <Text>Delivery #9</Text>
            <Divider orientation="vertical" />
            <TextLink href="#">View details</TextLink>
        </Box>
    )
    .add("labelled", () =>
        <Box style={{ height: "500px" }}>
            <Divider orientation="vertical">Since 1978</Divider>
        </Box>
    )
    .add("long label", () =>
        <Box style={{ height: "500px" }}>
            <Divider orientation="vertical">Since 1978 there have been more than 10 space exploration missions.</Divider>
        </Box>
    )
    .add("labelled + surrounded", () =>
        <Box className="flex" style={{ height: "500px" }}>
            <Text>Mission goals</Text>
            <Divider orientation="vertical">Since 1978</Divider>
            <Text>Mission post mortem</Text>
        </Box>
    )
    .add("align items", () =>
        <Box className="flex items-center">
            <Text>Mission goals</Text>
            <Divider orientation="vertical" />
            <Text size="sm">Mission post mortem</Text>
        </Box>
    );
