import { CheckCircleIcon } from "@components/icons";
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
            <CheckCircleIcon />
        </SquareBadge>
    )
};

export const Overlap: BadgeStory = {
    storyName: "overlap",
    render: () => (
        <Inline gap={8}>
            <SquareBadge variant="icon">
                <CheckCircleIcon />
            </SquareBadge>
            <CircleBadge variant="icon">
                <CheckCircleIcon />
            </CircleBadge>
            <IconBadge variant="icon">
                <CheckCircleIcon />
            </IconBadge>
            <TextBadge variant="icon">
                <CheckCircleIcon />
            </TextBadge>
        </Inline>
    )
};

export const Styling: BadgeStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <SquareBadge border="warning-7" variant="icon">
                <CheckCircleIcon />
            </SquareBadge>
            <SquareBadge className="border-red" variant="icon">
                <CheckCircleIcon />
            </SquareBadge>
            <SquareBadge style={{ border: "0.0625rem solid red" }} variant="icon">
                <CheckCircleIcon />
            </SquareBadge>
        </Inline>
    )
};
