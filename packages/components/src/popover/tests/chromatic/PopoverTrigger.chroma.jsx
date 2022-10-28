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

export const Default = () =>
    <PopoverTrigger>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const DefaultOpen = () =>
    <PopoverTrigger defaultOpen>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const NotDismissable = () =>
    <PopoverTrigger defaultOpen dismissable={false}>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const Position = () =>
    <PopoverTrigger position={{ md: "top", lg: "top" }}>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionAuto = () =>
    <PopoverTrigger position="auto" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionAutoStart = () =>
    <PopoverTrigger position="auto-start" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionAutoEnd = () =>
    <PopoverTrigger position="auto-end" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionTop = () =>
    <PopoverTrigger position="top" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionTopStart = () =>
    <PopoverTrigger position="top-start" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionTopEnd = () =>
    <PopoverTrigger position="top-end" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionBottom = () =>
    <PopoverTrigger position="bottom" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionBottomStart = () =>
    <PopoverTrigger position="bottom-start" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionBottomEnd = () =>
    <PopoverTrigger position="bottom-end" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionRight = () =>
    <PopoverTrigger position="right" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionRightStart = () =>
    <PopoverTrigger position="right-start" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionRightEnd = () =>
    <PopoverTrigger position="right-end" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionLeft = () =>
    <PopoverTrigger position="left" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionLeftStart = () =>
    <PopoverTrigger position="left-start" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const PositionLeftEnd = () =>
    <PopoverTrigger position="left-end" open>
        <Button variant="secondary">Toggle</Button>
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </PopoverTrigger>;

export const FunctionalContent = () =>
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
    </PopoverTrigger>;

Default.storyName = "default";
DefaultOpen.storyName = "default open";
NotDismissable.storyName = "not dismissable";
Position.storyName = "position";
PositionAuto.storyName = "position auto";
PositionAutoStart.storyName = "position auto-start";
PositionAutoEnd.storyName = "position auto-end";
PositionTop.storyName = "position top";
PositionTopStart.storyName = "position top-start";
PositionTopEnd.storyName = "position top-end";
PositionBottom.storyName = "position bottom";
PositionBottomStart.storyName = "position bottom-start";
PositionBottomEnd.storyName = "position bottom-end";
PositionRight.storyName = "position right";
PositionRightStart.storyName = "position right-start";
PositionRightEnd.storyName = "position right-end";
PositionLeft.storyName = "position left";
PositionLeftStart.storyName = "position left-start";
PositionLeftEnd.storyName = "position left-end";
FunctionalContent.storyName = "functional content";
