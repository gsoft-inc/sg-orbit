import { CheckCircleIcon } from "@components/icons";
import { Badge } from "@components/badge";
import { CircleBadge, IconBadge, SquareBadge, TextBadge } from "./BadgeUtils";
import { Inline } from "@components/layout";

export default {
    component: Badge,
    title: "Chromatic/Badge/icon"
};

export const Default = {
    render: () => <SquareBadge variant="icon">
        <CheckCircleIcon />
    </SquareBadge>
};

export const Overlap = {
    render: () => <Inline gap={8}>
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
};

export const Styling = {
    render: () => <Inline>
        <SquareBadge border="warning-7" variant="icon">
            <CheckCircleIcon />
        </SquareBadge>
        <SquareBadge className="border-red" variant="icon">
            <CheckCircleIcon />
        </SquareBadge>
        <SquareBadge style={{ border: "1px solid red" }} variant="icon">
            <CheckCircleIcon />
        </SquareBadge>
    </Inline>
};

Default.storyName = "default";
Overlap.storyName = "overlap";
Styling.storyName = "styling";
