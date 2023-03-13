import { UfoMajorIcon, TelescopeMajorIcon, RocketMajorIcon, IconList, IconListProps } from "@components/icons";
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
            <UfoMajorIcon />
            <TelescopeMajorIcon />
            <RocketMajorIcon />
        </IconList>
    );
}

export const Default: IconListStory = {
    storyName: "default",
    render: () => (
        <Icons />
    )
};

export const Styling: IconListStory = {
    storyName: "styling",
    render: () => (
        <Stack>
            <Icons border="warning-7" />
            <Icons className="border-red" />
            <Icons style={{ border: "0.0625rem solid red" }} />
        </Stack>
    )
};
