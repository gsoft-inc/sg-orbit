import { Div } from "@components/html";
import { Divider } from "@components/divider";
import { Stack } from "@components/layout";
import { Text } from "@components/typography";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Divider",
    component: Divider
} as ComponentMeta<typeof Divider>;

type DividerStory = ComponentStoryObj<typeof Divider>;

export const Default: DividerStory = {
    storyName: "default",
    render:() => (
        <Divider />
    )
};

export const Surrounded: DividerStory = {
    storyName: "surrounded",
    render:() => (
        <Div>
            <Text>Apollo 8 - 1968</Text>
            <Divider />
            <Text>Apollo 11 - 1969</Text>
        </Div>
    )
};

export const MultipleSeparators: DividerStory = {
    storyName: "multiple separators",
    render:() => (
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
};

export const Labelled: DividerStory = {
    storyName: "labelled",
    render:() => (
        <Divider>Since 1978</Divider>
    )
};

export const LongLabel: DividerStory = {
    storyName: "long label",
    render:() => (
        <Divider height={16}>Since 1978 there have been more than 10 space exploration missions.</Divider>
    )
};

export const LabelledSurrounded: DividerStory = {
    storyName: "labelled surrounded",
    render:() => (
        <Div>
            <Text>Apollo 11 - 1969</Text>
            <Divider>Since 1978</Divider>
            <Text>Voyager 1 - 1990</Text>
        </Div>
    )
};

export const Zoom: DividerStory = {
    storyName: "zoom",
    render:() => (
        <Stack>
            <Div className="zoom-in">
                <Divider>Since 1978</Divider>
            </Div>
            <Div className="zoom-out">
                <Divider>Since 1978</Divider>
            </Div>
        </Stack>
    )
};

export const Styling: DividerStory = {
    storyName: "styling",
    render:() => (
        <Stack>
            <Divider border="warning-7" />
            <Divider className="border-red" />
            <Divider style={{ border: "1px solid red" }} />
        </Stack>
    )
};
