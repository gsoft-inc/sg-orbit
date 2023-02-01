import { IconButton, Button } from "@components/button";
import { EmailIcon } from "@components/icons";
import { Image } from "@components/image";
import { Launch } from "./assets";
import { TextLink } from "@components/link";
import { Tooltip, TooltipTrigger } from "@components/tooltip";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Tooltip",
    component: Tooltip,
    decorators: [
        Story => (
            <div style={{ padding: "9.375rem 15.625rem" }}>
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
} as ComponentMeta<typeof Tooltip>;

type TooltipStory = ComponentStoryObj<typeof Tooltip>;

export const Default: TooltipStory = {
    storyName: "default",
    render: () => (
        <TooltipTrigger>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth</Tooltip>
        </TooltipTrigger>
    )
};

export const Open: TooltipStory = {
    storyName: "open",
    render: () => (
        <TooltipTrigger open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth</Tooltip>
        </TooltipTrigger>
    )
};

export const OpenOnFocus: TooltipStory = {
    storyName: "open on focus",
    render: () => (
        <TooltipTrigger>
            <Button autoFocus variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth</Tooltip>
        </TooltipTrigger>
    )
};

export const IconTrigger: TooltipStory = {
    storyName: "icon trigger",
    render: () => (
        <TooltipTrigger open>
            <EmailIcon />
            <Tooltip>Man must rise above the Earth</Tooltip>
        </TooltipTrigger>
    )
};

export const IconButtonTrigger: TooltipStory = {
    storyName: "icon button trigger",
    render: () => (
        <TooltipTrigger open>
            <IconButton variant="secondary" aria-label="Email">
                <EmailIcon />
            </IconButton>
            <Tooltip>Man must rise above the Earth</Tooltip>
        </TooltipTrigger>
    )
};

export const LinkTrigger: TooltipStory = {
    storyName: "link trigger",
    render: () => (
        <TooltipTrigger open>
            <TextLink>Trigger</TextLink>
            <Tooltip>Man must rise above the Earth</Tooltip>
        </TooltipTrigger>
    )
};

export const ImageTrigger: TooltipStory = {
    storyName: "image trigger",
    render: () => (
        <TooltipTrigger open>
            <Image src={Launch} width="25rem" alt="SpaceX launch" />
            <Tooltip>Man must rise above the Earth</Tooltip>
        </TooltipTrigger>
    )
};

export const VeryLongContent: TooltipStory = {
    storyName: "very long content",
    render: () => (
        <TooltipTrigger open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth—to the top of the atmosphere and beyond—for only thus will he fully understand the world in which he lives. Astronomy compels the soul to look upward, and leads us from this world to another.</Tooltip>
        </TooltipTrigger>
    )
};

export const LinkInContent: TooltipStory = {
    storyName: "link in content",
    render: () => (
        <TooltipTrigger open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the <TextLink href="https://en.wikipedia.org/wiki/Earth">Earth</TextLink>.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionAuto: TooltipStory = {
    storyName: "position auto",
    render: () => (
        <TooltipTrigger position="auto" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionAutoStart: TooltipStory = {
    storyName: "position auto-start",
    render: () => (
        <TooltipTrigger position="auto-start" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionAutoEnd: TooltipStory = {
    storyName: "position auto-end",
    render: () => (
        <TooltipTrigger position="auto-end" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionTop: TooltipStory = {
    storyName: "position top",
    render: () => (
        <TooltipTrigger position="top" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionTopStart: TooltipStory = {
    storyName: "position top-start",
    render: () => (
        <TooltipTrigger position="top-start" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionTopEnd: TooltipStory = {
    storyName: "position top-end",
    render: () => (
        <TooltipTrigger position="top-end" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionBottom: TooltipStory = {
    storyName: "position bottom",
    render: () => (
        <TooltipTrigger position="bottom" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionBottomStart: TooltipStory = {
    storyName: "position bottom-start",
    render: () => (
        <TooltipTrigger position="bottom-start" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionBottomEnd: TooltipStory = {
    storyName: "position bottom-end",
    render: () => (
        <TooltipTrigger position="bottom-end" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionRight: TooltipStory = {
    storyName: "position right",
    render: () => (
        <TooltipTrigger position="right" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionRightStart: TooltipStory = {
    storyName: "position right-start",
    render: () => (
        <TooltipTrigger position="right-start" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionRightEnd: TooltipStory = {
    storyName: "position right-end",
    render: () => (
        <TooltipTrigger position="right-end" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionLeft: TooltipStory = {
    storyName: "position left",
    render: () => (
        <TooltipTrigger position="left" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionLeftStart: TooltipStory = {
    storyName: "position left-start",
    render: () => (
        <TooltipTrigger position="left-start" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const PositionLeftEnd: TooltipStory = {
    storyName: "position left-end",
    render: () => (
        <TooltipTrigger position="left-end" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const TooltipTriggerStyledSystem: TooltipStory = {
    storyName: "tooltip trigger styled system",
    render: () => (
        <TooltipTrigger border="warning-7" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const TooltipTriggerClassName: TooltipStory = {
    storyName: "tooltip trigger className",
    render: () => (
        <TooltipTrigger className="border-red" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const TooltipTriggerStyle: TooltipStory = {
    storyName: "tooltip trigger style",
    render: () => (
        <TooltipTrigger style={{ border: "0.0625rem solid red" }} open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const TooltipStyledSystem: TooltipStory = {
    storyName: "tooltip styled system",
    render: () => (
        <TooltipTrigger border="warning-7" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip className="border-red">Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const TooltipClassName: TooltipStory = {
    storyName: "tooltip className",
    render: () => (
        <TooltipTrigger open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip className="border-red">Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};

export const TooltipStyle: TooltipStory = {
    storyName: "tooltip style",
    render: () => (
        <TooltipTrigger open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip style={{ border: "0.0625rem solid red" }}>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
};
