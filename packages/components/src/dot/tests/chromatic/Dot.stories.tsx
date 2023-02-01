import { Div } from "@components/html";
import { Dot } from "@components/dot";
import { Inline, Stack } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Dot",
    component: Dot
} as ComponentMeta<typeof Dot>;

type DotStory = ComponentStoryObj<typeof Dot>;

export const Default: DotStory = {
    storyName: "default",
    render: () => (
        <Dot color="alias-hard-break" />
    )
};

export const Label: DotStory = {
    storyName: "label",
    render: () => (
        <Dot color="alias-hard-break">Habitable</Dot>
    )
};

export const Color: DotStory = {
    storyName: "color",
    render: () => (
        <Stack>
            <Dot color="hsl(25, 69%, 41%)"></Dot>
            <Dot color="hsla(25, 69%, 41%, 0.5)"></Dot>
            <Dot color="#a4b5dd"></Dot>
            <Dot color="rgb(128,0,0)"></Dot>
            <Dot color="rgb(128,0,0,0.5)"></Dot>
            <Dot color="alias-accent"></Dot>
            <Dot color="red"></Dot>
            <Dot color="--o-ui-neutral-6"></Dot>
        </Stack>
    )
};

export const Zoom: DotStory = {
    storyName: "zoom",
    render: () => (
        <Inline>
            <Div className="zoom-in">
                <Dot color="alias-hard-break" />
            </Div>
            <Div className="zoom-out">
                <Dot color="alias-hard-break" />
            </Div>
        </Inline>
    )
};

export const Styling: DotStory = {
    storyName: "styling",
    render: () => (
        <Stack>
            <Inline>
                <Dot border="warning-7" color="alias-hard-break"></Dot>
                <Dot className="border-red" color="alias-hard-break"></Dot>
                <Dot style={{ border: "0.0625rem solid red" }} color="alias-hard-break"></Dot>
            </Inline>
            <Inline>
                <Dot border="warning-7" color="alias-hard-break">Habitable</Dot>
                <Dot className="border-red" color="alias-hard-break">Habitable</Dot>
                <Dot style={{ border: "0.0625rem solid red" }} color="alias-hard-break">Habitable</Dot>
            </Inline>
        </Stack>
    )
};
