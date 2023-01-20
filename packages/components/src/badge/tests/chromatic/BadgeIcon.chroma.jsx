import { PlaceholderMajorIcon } from "@components/icons";
import { Badge } from "@components/badge";
import { CircleBadge, IconBadge, SquareBadge, TextBadge } from "./BadgeUtils";
import { Inline } from "@components/layout";

export default {
    component: Badge,
    title: "Chromatic/Badge/icon"
};

export const Default = () => (
    <SquareBadge variant="icon">
        <PlaceholderMajorIcon />
    </SquareBadge>
);

Default.storyName = "default";

export const Overlap = () => (
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
);

Overlap.storyName = "overlap";

export const Styling = () => (
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
);

Styling.storyName = "styling";
