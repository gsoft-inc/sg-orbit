import { Box } from "@react-components/box";
import { Counter } from "@react-components/counter";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Counter")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <Inline verticalAlign="end">
                <Counter size="sm">15</Counter>
                <Counter>15</Counter>
            </Inline>
            <Inline>
                <Counter>2</Counter>
                <Counter>9999+</Counter>
            </Inline>
            <Inline>
                <Counter size="lg">2</Counter>
                <Counter size="lg">9999+</Counter>
            </Inline>
        </Stack>
    )
    .add("divider", () =>
        <Inline gap={13}>
            <Stack>
                <Counter size="sm" variant="divider">15</Counter>
                <Counter variant="divider">15</Counter>
                <Counter size="lg" variant="divider">15</Counter>
            </Stack>
            <Stack>
                <Text size="sm" className="flex">
                    <Counter size="inherit" variant="divider">15</Counter>
                </Text>
                <Text className="flex">
                    <Counter size="inherit" variant="divider">15</Counter>
                </Text>
                <Text size="lg" className="flex">
                    <Counter size="inherit" variant="divider">15</Counter>
                </Text>
            </Stack>
        </Inline>
    )
    .add("pushed", () =>
        <Stack>
            <Box className="flex">
                <Text>Planets Visited</Text>
                <Counter pushed>15</Counter>
            </Box>
            <Box className="flex">
                <Text>Planets Visited</Text>
                <Counter pushed size="inherit" variant="divider">15</Counter>
            </Box>
        </Stack>
    )
    .add("reverse", () =>
        <Stack>
            <Box className="flex">
                <Counter reverse pushed>15</Counter>
                <Text>Planets Visited</Text>
            </Box>
            <Box className="flex">
                <Counter reverse pushed variant="divider">15</Counter>
                <Text>Planets Visited</Text>
            </Box>
        </Stack>
    )
    .add("color", () =>
        <Stack>
            <Inline verticalAlign="center">
                <Counter color="light">15</Counter>
                <Counter variant="divider" color="light">15</Counter>
            </Inline>
            <Inline verticalAlign="center">
                <Counter color="bold">15</Counter>
                <Counter variant="divider" color="bold">15</Counter>
            </Inline>
        </Stack>
    )
    .add("disabled", () =>
        <Inline verticalAlign="center">
            <Counter disabled>15</Counter>
            <Counter variant="divider" disabled>15</Counter>
        </Inline>
    )
    .add("styling", () =>
        <Stack>
            <Inline>
                <Counter className="bg-red">15</Counter>
                <Counter style={{ backgroundColor: "red" }}>15</Counter>
            </Inline>
            <Inline>
                <Counter className="bg-red" variant="divider">15</Counter>
                <Counter style={{ backgroundColor: "red" }} variant="divider">15</Counter>
            </Inline>
        </Stack>
    );
