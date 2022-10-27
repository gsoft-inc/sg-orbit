import { Badge } from "@components/badge";
import { CircleBadge, IconBadge, SquareBadge, TextBadge } from "./BadgeUtils";
import { Inline } from "@components/layout";

export default {
    component: Badge,
    title: "Chromatic/Badge/dot"
};


export const Default = {
    render: () => <SquareBadge variant="dot" />
};

export const Overlap = {
    render: () => <Inline gap={8}>
        <SquareBadge variant="dot" />
        <CircleBadge variant="dot" />
        <IconBadge variant="dot" />
        <TextBadge variant="dot" />
    </Inline>
};

export const Styling = {
    render: () => <Inline>
        <SquareBadge variant="dot" border="warning-7" />
        <SquareBadge variant="dot" className="border-red" />
        <SquareBadge variant="dot" style={{ border: "1px solid red" }} />
    </Inline>
};

Default.storyName = "default";
Overlap.storyName = "overlap";
Styling.storyName = "styling";
