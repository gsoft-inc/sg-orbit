import { Counter } from "@components/counter";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { Text } from "@components/typography";

export default {
    title: "Chromatic/Counter",
    component: Counter
};

export const Default = () => <Stack>
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
</Stack>;

Default.storyName = "default";

export const Divider = () =>
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
    </Stack>;

Divider.storyName = "divider";

export const Pushed = () =>
    <Stack>
        <Div>
            <Text>Planets Visited</Text>
            <Counter pushed>15</Counter>
        </Div>
        <Div>
            <Text>Planets Visited</Text>
            <Counter pushed variant="divider">15</Counter>
        </Div>
    </Stack>;

Pushed.storyName = "pushed";

export const Reverse = () =>
    <Stack>
        <Div>
            <Counter reverse pushed>15</Counter>
            <Text>Planets Visited</Text>
        </Div>
        <Div>
            <Counter reverse pushed variant="divider">15</Counter>
            <Text>Planets Visited</Text>
        </Div>
    </Stack>;

Reverse.storyName = "reverse";

export const Color = () =>
    <Inline color="warning-7" backgroundColor="warning-1" alignY="center">
        <Counter color="inherit">15</Counter>
        <Counter variant="divider" color="inherit">15</Counter>
    </Inline>;

Color.storyName = "color";

export const Highlight = () =>
    <Inline alignY="center">
        <Counter highlight>15</Counter>
        <Counter variant="divider" highlight>15</Counter>
    </Inline>;

Highlight.storyName = "highlight";

export const Disabled = () =>
    <Inline alignY="center">
        <Counter disabled>15</Counter>
        <Counter variant="divider" disabled>15</Counter>
    </Inline>;

Disabled.storyName = "disabled";

export const Zoom = () =>
    <Stack>
        <Div className="zoom-in">
            <Inline>
                <Counter>15</Counter>
                <Counter variant="divider">15</Counter>
            </Inline>
        </Div>
        <Div className="zoom-out">
            <Inline>
                <Counter>15</Counter>
                <Counter variant="divider">15</Counter>
            </Inline>
        </Div>
    </Stack>;

Zoom.storyName = "zoom";

export const Styling = () =>
    <Stack>
        <Inline alignY="center">
            <Counter border="warning-7">15</Counter>
            <Counter className="bg-red">15</Counter>
            <Counter style={{ backgroundColor: "red" }}>15</Counter>
        </Inline>
        <Inline alignY="center">
            <Counter border="warning-7" variant="divider">15</Counter>
            <Counter className="bg-red" variant="divider">15</Counter>
            <Counter style={{ backgroundColor: "red" }} variant="divider">15</Counter>
        </Inline>
    </Stack>;

Styling.storyName = "styling";
