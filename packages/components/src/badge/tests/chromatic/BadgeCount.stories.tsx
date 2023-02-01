import { Badge } from "@components/badge";
import { Div } from "@components/html";
import { Inline } from "@components/layout";
import { CircleBadge, IconBadge, SquareBadge } from "./BadgeUtils";
import { Text } from "@components/typography";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    component: Badge,
    title: "Chromatic/Badge/count"
} as ComponentMeta<typeof Badge>;

type BadgeStory = ComponentStoryObj<typeof Badge>;

export const Default: BadgeStory = {
    storyName: "default",
    render: () => (
        <Inline gap={8}>
            <SquareBadge>
                <Text>5</Text>
            </SquareBadge>
            <SquareBadge>
                <Text>5+</Text>
            </SquareBadge>
            <SquareBadge>
                <Text>50</Text>
            </SquareBadge>
            <SquareBadge>
                <Text>500</Text>
            </SquareBadge>
            <SquareBadge>
                <Text>500+</Text>
            </SquareBadge>
        </Inline>
    )
};

export const Overlap: BadgeStory = {
    storyName: "overlap",
    render: () => (
        <Inline gap={8}>
            <SquareBadge>
                <Text>50</Text>
            </SquareBadge>
            <CircleBadge>
                <Text>50</Text>
            </CircleBadge>
            <IconBadge>
                <Text>50</Text>
            </IconBadge>
        </Inline>
    )
};

export const Zoom: BadgeStory = {
    storyName: "zoom",
    render: () => (
        <Inline gap={8}>
            <Div className="zoom-in">
                <SquareBadge>
                    <Text>5</Text>
                </SquareBadge>
            </Div>
            <Div className="zoom-out">
                <SquareBadge>
                    <Text>5</Text>
                </SquareBadge>
            </Div>
        </Inline>
    )
};

export const Styling: BadgeStory = {
    storyName: "styling",
    render: () => (
        <Inline gap={8}>
            <SquareBadge border="warning-7">
                <Text>100</Text>
            </SquareBadge>
            <SquareBadge className="border-red">
                <Text>100</Text>
            </SquareBadge>
            <SquareBadge style={{ border: "0.0625rem solid red" }}>
                <Text>100</Text>
            </SquareBadge>
        </Inline>
    )
};
