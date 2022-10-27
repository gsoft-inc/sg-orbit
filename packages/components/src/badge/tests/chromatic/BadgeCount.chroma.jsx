import { Badge } from "@components/badge";
import { Div } from "@components/html";
import { Inline } from "@components/layout";
import { CircleBadge, IconBadge, SquareBadge } from "./BadgeUtils";
import { Text } from "@components/typography";

export default {
    component: Badge,
    title: "Chromatic/Badge/count"
};

export const Default = {
    render: () => <Inline gap={8}>
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
};

export const Overlap = {
    render: () => <Inline gap={8}>
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
};

export const Zoom = {
    render: () => <Inline gap={8}>
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
};

export const Styling = {
    render: () => <Inline gap={8}>
        <SquareBadge border="warning-7">
            <Text>100</Text>
        </SquareBadge>
        <SquareBadge className="border-red">
            <Text>100</Text>
        </SquareBadge>
        <SquareBadge style={{ border: "1px solid red" }}>
            <Text>100</Text>
        </SquareBadge>
    </Inline>
};

Default.storyName = "default";
Overlap.storyName = "overlap";
Zoom.storyName = "zoom";
Styling.storyName = "styling";
