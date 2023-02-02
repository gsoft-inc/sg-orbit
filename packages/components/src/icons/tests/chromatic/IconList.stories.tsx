import { PencilMajorIcon, IconList, IconListProps } from "@components/icons";
import { Stack } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/IconList",
    component: IconList
} as ComponentMeta<typeof IconList>;

type IconListStory = ComponentStoryObj<typeof IconList>;

function Icons(props: Omit<IconListProps, "children">) {
    return (
        <IconList {...props}>
            <PencilMajorIcon />
            <PencilMajorIcon />
            <PencilMajorIcon />
        </IconList>
    );
}

export const Default: IconListStory = {
    storyName: "default",
    render: () => (
        <Icons />
    )
};

export const Size: IconListStory = {
    storyName: "size",
    render: () => (
        <Stack>
            <Icons size="2xs" />
            <Icons size="xs" />
            <Icons size="sm" />
            <Icons />
            <Icons size="lg" />
        </Stack>
    )
};

export const Styling: IconListStory = {
    storyName: "styling",
    render: () => (
        <Stack>
            <Icons border="warning-7" />
            <Icons className="border-red" />
            <Icons style={{ border: "1px solid red" }} />
        </Stack>
    )
};
