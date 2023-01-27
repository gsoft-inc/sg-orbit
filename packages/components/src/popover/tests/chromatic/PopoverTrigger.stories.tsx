import { Popover, PopoverTrigger } from "@components/popover";

import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

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
} as ComponentMeta<typeof PopoverTrigger>;

type PopoverTriggerStory = ComponentStoryObj<typeof PopoverTrigger>;

export const Default: PopoverTriggerStory = {
    storyName: "default",
    render: () => (
        <PopoverTrigger>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const DefaultOpen: PopoverTriggerStory = {
    storyName: "default open",
    render: () => (
        <PopoverTrigger defaultOpen>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const NotDismissable: PopoverTriggerStory = {
    storyName: "not dismissable",
    render: () => (
        <PopoverTrigger defaultOpen dismissable={false}>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const Position: PopoverTriggerStory = {
    storyName: "position",
    render: () => (
        <PopoverTrigger position={{ md: "top", lg: "top" }}>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const PositionAuto: PopoverTriggerStory = {
    storyName: "position auto",
    render: () => (
        <PopoverTrigger position="auto" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const PositionAutoStart: PopoverTriggerStory = {
    storyName: "position auto-start",
    render: () => (
        <PopoverTrigger position="auto-start" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};


export const PositionAutoEnd: PopoverTriggerStory = {
    storyName: "position auto-end",
    render: () => (
        <PopoverTrigger position="auto-end" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const PositionTop: PopoverTriggerStory = {
    storyName: "position top",
    render: () => (
        <PopoverTrigger position="top" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const PositionTopStart: PopoverTriggerStory = {
    storyName: "position top-start",
    render: () => (
        <PopoverTrigger position="top-start" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const PositionTopEnd: PopoverTriggerStory = {
    storyName: "position top-end",
    render: () => (
        <PopoverTrigger position="top-end" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const PositionBottom: PopoverTriggerStory = {
    storyName: "position bottom",
    render: () => (
        <PopoverTrigger position="bottom" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const PositionBottomStart: PopoverTriggerStory = {
    storyName: "position bottom-start",
    render: () => (
        <PopoverTrigger position="bottom-start" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const PositionBottomEnd: PopoverTriggerStory = {
    storyName: "position bottom-end",
    render: () => (
        <PopoverTrigger position="bottom-end" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const PositionRight: PopoverTriggerStory = {
    storyName: "position right",
    render: () => (
        <PopoverTrigger position="right" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const PositionRightStart: PopoverTriggerStory = {
    storyName: "position right-start",
    render: () => (
        <PopoverTrigger position="right-start" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const PositionRightEnd: PopoverTriggerStory = {
    storyName: "position right-end",
    render: () => (
        <PopoverTrigger position="right-end" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const PositionLeft: PopoverTriggerStory = {
    storyName: "position left",
    render: () => (
        <PopoverTrigger position="left" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const PositionLeftStart: PopoverTriggerStory = {
    storyName: "position left-start",
    render: () => (
        <PopoverTrigger position="left-start" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const PositionLeftEnd: PopoverTriggerStory = {
    storyName: "position left-end",
    render: () => (
        <PopoverTrigger position="left-end" open>
            <Button variant="secondary">Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
};

export const FunctionalContent: PopoverTriggerStory = {
    storyName: "functional content",
    render: () => (
        <PopoverTrigger defaultOpen>
            {(() => {
                return (
                    <>
                        <Button variant="secondary">Toggle</Button>
                        <Popover>
                            <Heading>Space News</Heading>
                            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
                        </Popover>
                    </>

                );
            })()}
        </PopoverTrigger>
    )
};
