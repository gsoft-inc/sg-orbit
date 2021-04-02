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
            <Inline verticalAlign="center">
                <Counter size="sm">15</Counter>
                <Counter>15</Counter>
            </Inline>
            <Inline verticalAlign="center">
                <Text size="sm">
                    <Counter size="inherit">15</Counter>
                </Text>
                <Text>
                    <Counter size="inherit">15</Counter>
                </Text>
                <Text size="lg">
                    <Counter size="inherit">15</Counter>
                </Text>
                <Text size="xl">
                    <Counter size="inherit">15</Counter>
                </Text>
            </Inline>
        </Stack>
    )
    .add("divider", () =>
        <Stack>
            <Inline verticalAlign="center">
                <Counter size="sm" variant="divider">15</Counter>
                <Counter variant="divider">15</Counter>
            </Inline>
            <Inline verticalAlign="center">
                <Text size="sm">
                    <Counter size="inherit" variant="divider">15</Counter>
                </Text>
                <Text>
                    <Counter size="inherit" variant="divider">15</Counter>
                </Text>
                <Text size="lg">
                    <Counter size="inherit" variant="divider">15</Counter>
                </Text>
                <Text size="xl">
                    <Counter size="inherit" variant="divider">15</Counter>
                </Text>
            </Inline>
        </Stack>
    )
    .add("pushed", () =>
        <Stack>
            <Box>
                <Text>Planets Visited</Text>
                <Counter pushed>15</Counter>
            </Box>
            <Box>
                <Text>Planets Visited</Text>
                <Counter pushed variant="divider">15</Counter>
            </Box>
        </Stack>
    )
    .add("reverse", () =>
        <Stack>
            <Box>
                <Counter reverse pushed>15</Counter>
                <Text>Planets Visited</Text>
            </Box>
            <Box>
                <Counter reverse pushed variant="divider">15</Counter>
                <Text>Planets Visited</Text>
            </Box>
        </Stack>
    )
    .add("color", () =>
        <Inline className="bg-sunray-50 sunray-900" verticalAlign="center">
            <Counter color="inherit">15</Counter>
            <Counter variant="divider" color="inherit">15</Counter>
        </Inline>
    )
    .add("highlight", () =>
        <Inline verticalAlign="center">
            <Counter highlight>15</Counter>
            <Counter variant="divider" highlight>15</Counter>
        </Inline>
    )
    .add("disabled", () =>
        <Inline verticalAlign="center">
            <Counter disabled>15</Counter>
            <Counter variant="divider" disabled>15</Counter>
        </Inline>
    )
    .add("styling", () =>
        <Stack>
            <Inline verticalAlign="center">
                <Counter className="bg-red">15</Counter>
                <Counter style={{ backgroundColor: "red" }}>15</Counter>
            </Inline>
            <Inline verticalAlign="center">
                <Counter className="bg-red" variant="divider">15</Counter>
                <Counter style={{ backgroundColor: "red" }} variant="divider">15</Counter>
            </Inline>
        </Stack>
    );
