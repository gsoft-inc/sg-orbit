import { PlaceholderMajorIcon } from "@components/icons";
import { Badge } from "@components/badge";
import { CircleBadge, IconBadge, SquareBadge, TextBadge } from "./BadgeUtils";
import { Inline } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    component: Badge,
    title: "Chromatic/Badge/icon"
} as ComponentMeta<typeof Badge>;

type BadgeStory = ComponentStoryObj<typeof Badge>;

export const Default: BadgeStory = {
    storyName: "default",
    render: () => (
        <SquareBadge variant="icon">
            <PlaceholderMajorIcon />
        </SquareBadge>
    )
};

export const Overlap: BadgeStory = {
    storyName: "overlap",
    render: () => (
        <Inline gap={8}>
            <SquareBadge variant="icon">
                <PlaceholderMajorIcon />
            </SquareBadge>
            <CircleBadge variant="icon">
                <PlaceholderMajorIcon />
            </CircleBadge>
            <IconBadge variant="icon">
                <PlaceholderMajorIcon />
            </IconBadge>
            <TextBadge variant="icon">
                <PlaceholderMajorIcon />
            </TextBadge>
        </Inline>
    )
};

export const Styling: BadgeStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <SquareBadge border="warning-7" variant="icon">
                <PlaceholderMajorIcon />
            </SquareBadge>
            <SquareBadge className="border-red" variant="icon">
                <PlaceholderMajorIcon />
            </SquareBadge>
            <SquareBadge style={{ border: "1px solid red" }} variant="icon">
                <PlaceholderMajorIcon />
            </SquareBadge>
        </Inline>
    )
};
