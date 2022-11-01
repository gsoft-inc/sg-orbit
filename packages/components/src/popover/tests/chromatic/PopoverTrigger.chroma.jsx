import { Popover, PopoverTrigger } from "@components/popover";

import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";

export default {
    title: "Chromatic/PopoverTrigger",
    component: PopoverTrigger,
    decorators: [
        Story => (
            <div style={{ padding: "150px 350px" }}>
                <Story />
            </div>
        )
    ],
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
};

export const Default = () => (
    <PopoverTrigger>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

Default.storyName = "default";

export const DefaultOpen = () => (
    <PopoverTrigger defaultOpen>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

DefaultOpen.storyName = "default open";

export const NotDismissable = () => (
    <PopoverTrigger defaultOpen dismissable={false}>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

NotDismissable.storyName = "not dismissable";

export const Position = () => (
    <PopoverTrigger position={{ md: "top", lg: "top" }}>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

Position.storyName = "position";

export const PositionAuto = () => (
    <PopoverTrigger position="auto" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionAuto.storyName = "position auto";

export const PositionAutoStart = () => (
    <PopoverTrigger position="auto-start" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionAutoStart.storyName = "position auto-start";

export const PositionAutoEnd = () => (
    <PopoverTrigger position="auto-end" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionAutoEnd.storyName = "position auto-end";

export const PositionTop = () => (
    <PopoverTrigger position="top" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionTop.storyName = "position top";

export const PositionTopStart = () => (
    <PopoverTrigger position="top-start" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionTopStart.storyName = "position top-start";

export const PositionTopEnd = () => (
    <PopoverTrigger position="top-end" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionTopEnd.storyName = "position top-end";

export const PositionBottom = () => (
    <PopoverTrigger position="bottom" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionBottom.storyName = "position bottom";

export const PositionBottomStart = () => (
    <PopoverTrigger position="bottom-start" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionBottomStart.storyName = "position bottom-start";

export const PositionBottomEnd = () => (
    <PopoverTrigger position="bottom-end" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionBottomEnd.storyName = "position bottom-end";

export const PositionRight = () => (
    <PopoverTrigger position="right" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionRight.storyName = "position right";

export const PositionRightStart = () => (
    <PopoverTrigger position="right-start" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionRightStart.storyName = "position right-start";

export const PositionRightEnd = () => (
    <PopoverTrigger position="right-end" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionRightEnd.storyName = "position right-end";

export const PositionLeft = () => (
    <PopoverTrigger position="left" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionLeft.storyName = "position left";

export const PositionLeftStart = () => (
    <PopoverTrigger position="left-start" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionLeftStart.storyName = "position left-start";

export const PositionLeftEnd = () => (
    <PopoverTrigger position="left-end" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>
);

PositionLeftEnd.storyName = "position left-end";

export const FunctionalContent = () => (
    <PopoverTrigger defaultOpen>
        {() => {
            return (
                <>
                    <Button variant="secondary">Toggle</Button>
                    <Popover>
                        <Heading>Space News</Heading>
                        <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
                    </Popover>
                </>

            );

        }}
    </PopoverTrigger>
);

FunctionalContent.storyName = "functional content";
