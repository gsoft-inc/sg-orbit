import { Counter } from "@react-components/counter";
import { Div } from "@react-components/html";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/typography";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Counter")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <Inline alignY="center">
                <Counter size="sm">15</Counter>
                <Counter>15</Counter>
            </Inline>
            <Inline alignY="center">
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
            <Inline alignY="center">
                <Counter size="sm" variant="divider">15</Counter>
                <Counter variant="divider">15</Counter>
            </Inline>
            <Inline alignY="center">
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
            <Div>
                <Text>Planets Visited</Text>
                <Counter pushed>15</Counter>
            </Div>
            <Div>
                <Text>Planets Visited</Text>
                <Counter pushed variant="divider">15</Counter>
            </Div>
        </Stack>
    )
    .add("reverse", () =>
        <Stack>
            <Div>
                <Counter reverse pushed>15</Counter>
                <Text>Planets Visited</Text>
            </Div>
            <Div>
                <Counter reverse pushed variant="divider">15</Counter>
                <Text>Planets Visited</Text>
            </Div>
        </Stack>
    )
    .add("color", () =>
        <Inline color="sunray-10" backgroundColor="sunray-1" alignY="center">
            <Counter color="inherit">15</Counter>
            <Counter variant="divider" color="inherit">15</Counter>
        </Inline>
    )
    .add("highlight", () =>
        <Inline alignY="center">
            <Counter highlight>15</Counter>
            <Counter variant="divider" highlight>15</Counter>
        </Inline>
    )
    .add("disabled", () =>
        <Inline alignY="center">
            <Counter disabled>15</Counter>
            <Counter variant="divider" disabled>15</Counter>
        </Inline>
    )
    .add("styling", () =>
        <Stack>
            <Inline alignY="center">
                <Counter className="bg-red">15</Counter>
                <Counter style={{ backgroundColor: "red" }}>15</Counter>
            </Inline>
            <Inline alignY="center">
                <Counter className="bg-red" variant="divider">15</Counter>
                <Counter style={{ backgroundColor: "red" }} variant="divider">15</Counter>
            </Inline>
        </Stack>
    );
