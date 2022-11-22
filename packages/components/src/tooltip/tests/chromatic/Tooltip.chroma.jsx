import { IconButton, Button } from "@components/button";
import { EmailIcon } from "@components/icons";
import { Image } from "@components/image";
import { Launch } from "./assets";
import { TextLink } from "@components/link";
import { Tooltip, TooltipTrigger } from "@components/tooltip";

export default {
    title: "Chromatic/Tooltip",
    component: Tooltip,
    decorators: [
        Story => (
            <div style={{ padding: "150px 250px" }}>
                <Story />
            </div>
        )
    ],
    parameters: {
        chromatic: {
            delay: 100,
            pauseAnimationAtEnd: true
        }
    }
};

export const Default = () => (
    <TooltipTrigger>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth</Tooltip>
    </TooltipTrigger>
);

Default.storyName = "default";

export const Open = () => (
    <TooltipTrigger open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth</Tooltip>
    </TooltipTrigger>
);

Open.storyName = "open";

export const OpenOnFocus = () => (
    <TooltipTrigger>
        <Button autoFocus variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth</Tooltip>
    </TooltipTrigger>
);

OpenOnFocus.storyName = "open on focus";

export const IconTrigger = () => (
    <TooltipTrigger open>
        <EmailIcon />
        <Tooltip>Man must rise above the Earth</Tooltip>
    </TooltipTrigger>
);

IconTrigger.storyName = "icon trigger";

export const IconButtonTrigger = () => (
    <TooltipTrigger open>
        <IconButton variant="secondary" aria-label="Email">
            <EmailIcon />
        </IconButton>
        <Tooltip>Man must rise above the Earth</Tooltip>
    </TooltipTrigger>
);

IconButtonTrigger.storyName = "icon button trigger";

export const LinkTrigger = () => (
    <TooltipTrigger open>
        <TextLink>Trigger</TextLink>
        <Tooltip>Man must rise above the Earth</Tooltip>
    </TooltipTrigger>
);

LinkTrigger.storyName = "link trigger";

export const ImageTrigger = () => (
    <TooltipTrigger open>
        <Image src={Launch} width="400px" alt="SpaceX launch" />
        <Tooltip>Man must rise above the Earth</Tooltip>
    </TooltipTrigger>
);

ImageTrigger.storyName = "image trigger";

export const VeryLongContent = () => (
    <TooltipTrigger open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth—to the top of the atmosphere and beyond—for only thus will he fully understand the world in which he lives. Astronomy compels the soul to look upward, and leads us from this world to another.</Tooltip>
    </TooltipTrigger>
);

VeryLongContent.storyName = "very long content";

export const LinkInContent = () => (
    <TooltipTrigger open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the <TextLink href="https://en.wikipedia.org/wiki/Earth">Earth</TextLink>.</Tooltip>
    </TooltipTrigger>
);

LinkInContent.storyName = "link in content";

export const PositionAuto = () => (
    <TooltipTrigger position="auto" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionAuto.storyName = "position auto";

export const PositionAutoSstart = () => (
    <TooltipTrigger position="auto-start" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionAutoSstart.storyName = "position auto-start";

export const PositionAutoEnd = () => (
    <TooltipTrigger position="auto-end" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionAutoEnd.storyName = "position auto-end";

export const PositionTop = () => (
    <TooltipTrigger position="top" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionTop.storyName = "position top";

export const PositionTopRtart = () => (
    <TooltipTrigger position="top-start" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionTopRtart.storyName = "position top-start";

export const PositionTopEnd = () => (
    <TooltipTrigger position="top-end" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionTopEnd.storyName = "position top-end";

export const PositionBottom = () => (
    <TooltipTrigger position="bottom" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionBottom.storyName = "position bottom";

export const PositionBottomSstart = () => (
    <TooltipTrigger position="bottom-start" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionBottomSstart.storyName = "position bottom-start";

export const PositionBottomEnd = () => (
    <TooltipTrigger position="bottom-end" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionBottomEnd.storyName = "position bottom-end";

export const PositionRight = () => (
    <TooltipTrigger position="right" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionRight.storyName = "position right";

export const PositionRightRtart = () => (
    <TooltipTrigger position="right-start" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionRightRtart.storyName = "position right-start";

export const PositionRightEnd = () => (
    <TooltipTrigger position="right-end" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionRightEnd.storyName = "position right-end";

export const PositionLeft = () => (
    <TooltipTrigger position="left" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionLeft.storyName = "position left";

export const PositionLeftStart = () => (
    <TooltipTrigger position="left-start" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionLeftStart.storyName = "position left-start";

export const PositionLeftEnd = () => (
    <TooltipTrigger position="left-end" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

PositionLeftEnd.storyName = "position left-end";

export const TooltipTriggerRtyledRystem = () => (
    <TooltipTrigger border="warning-7" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

TooltipTriggerRtyledRystem.storyName = "tooltip trigger styled system";

export const TooltipTriggerClassName = () => (
    <TooltipTrigger className="border-red" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

TooltipTriggerClassName.storyName = "tooltip trigger className";

export const TooltipTriggerStyle = () => (
    <TooltipTrigger style={{ border: "1px solid red" }} open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

TooltipTriggerStyle.storyName = "tooltip trigger style";

export const TooltipStyledRystem = () => (
    <TooltipTrigger border="warning-7" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip className="border-red">Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

TooltipStyledRystem.storyName = "tooltip styled system";

export const TooltipClassName = () => (
    <TooltipTrigger open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip className="border-red">Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

TooltipClassName.storyName = "tooltip className";

export const TooltipStyle = () => (
    <TooltipTrigger open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip style={{ border: "1px solid red" }}>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>
);

TooltipStyle.storyName = "tooltip style";
