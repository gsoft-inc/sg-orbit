import { Button } from "@components/button";
import { EmailIcon } from "@components/icons";
import { IconButton } from "@components/button";
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
            chromaticPauseAnimationAtEnd: true
        }
    }
};

export const Default = () =>
    <TooltipTrigger>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth</Tooltip>
    </TooltipTrigger>;

export const Open = () =>
    <TooltipTrigger open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth</Tooltip>
    </TooltipTrigger>;

export const OpenOnFocus = () =>
    <TooltipTrigger>
        <Button autoFocus variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth</Tooltip>
    </TooltipTrigger>;

export const IconTrigger = () =>
    <TooltipTrigger open>
        <EmailIcon />
        <Tooltip>Man must rise above the Earth</Tooltip>
    </TooltipTrigger>;

export const IconButtonTrigger = () =>
    <TooltipTrigger open>
        <IconButton variant="secondary" aria-label="Email">
            <EmailIcon />
        </IconButton>
        <Tooltip>Man must rise above the Earth</Tooltip>
    </TooltipTrigger>;

export const LinkTrigger = () =>
    <TooltipTrigger open>
        <TextLink>Trigger</TextLink>
        <Tooltip>Man must rise above the Earth</Tooltip>
    </TooltipTrigger>;

export const ImageTrigger = () =>
    <TooltipTrigger open>
        <Image src={Launch} width="400px" alt="SpaceX launch" />
        <Tooltip>Man must rise above the Earth</Tooltip>
    </TooltipTrigger>;

export const VeryLongContent = () =>
    <TooltipTrigger open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth—to the top of the atmosphere and beyond—for only thus will he fully understand the world in which he lives. Astronomy compels the soul to look upward, and leads us from this world to another.</Tooltip>
    </TooltipTrigger>;

export const LinkInContent = () =>
    <TooltipTrigger open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the <TextLink href="https://en.wikipedia.org/wiki/Earth">Earth</TextLink>.</Tooltip>
    </TooltipTrigger>;

export const PositionAuto = () =>
    <TooltipTrigger position="auto" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const PositionAutoSstart = () =>
    <TooltipTrigger position="auto-start" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const PositionAutoEnd = () =>
    <TooltipTrigger position="auto-end" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const PositionTop = () =>
    <TooltipTrigger position="top" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const PositionTopRtart = () =>
    <TooltipTrigger position="top-start" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const PositionTopEnd = () =>
    <TooltipTrigger position="top-end" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const PositionBottom = () =>
    <TooltipTrigger position="bottom" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const PositionBottomSstart = () =>
    <TooltipTrigger position="bottom-start" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const PositionBottomEnd = () =>
    <TooltipTrigger position="bottom-end" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const PositionRight = () =>
    <TooltipTrigger position="right" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const PositionRightRtart = () =>
    <TooltipTrigger position="right-start" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const PositionRightEnd = () =>
    <TooltipTrigger position="right-end" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const PositionLeft = () =>
    <TooltipTrigger position="left" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const PositionLeftStart = () =>
    <TooltipTrigger position="left-start" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const PositionLeftEnd = () =>
    <TooltipTrigger position="left-end" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const TooltipTriggerRtyledRystem = () =>
    <TooltipTrigger border="warning-7" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const TooltipTriggerClassName = () =>
    <TooltipTrigger className="border-red" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const TooltipTriggerStyle = () =>
    <TooltipTrigger style={{ border: "1px solid red" }} open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const TooltipStyledRystem = () =>
    <TooltipTrigger border="warning-7" open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip className="border-red">Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const TooltipClassName = () =>
    <TooltipTrigger open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip className="border-red">Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

export const TooltipStyle = () =>
    <TooltipTrigger open>
        <Button variant="secondary">Trigger</Button>
        <Tooltip style={{ border: "1px solid red" }}>Man must rise above the Earth.</Tooltip>
    </TooltipTrigger>;

Default.storyName = "default";
Open.storyName = "open";
OpenOnFocus.storyName = "open on focus";
IconTrigger.storyName = "icon trigger";
IconButtonTrigger.storyName = "icon button trigger";
LinkTrigger.storyName = "link trigger";
ImageTrigger.storyName = "image trigger";
VeryLongContent.storyName = "very long content";
LinkInContent.storyName = "link in content";
PositionAuto.storyName = "position auto";
PositionAutoSstart.storyName = "position auto-start";
PositionAutoEnd.storyName = "position auto-end";
PositionTop.storyName = "position top";
PositionTopRtart.storyName = "position top-start";
PositionTopEnd.storyName = "position top-end";
PositionBottom.storyName = "position bottom";
PositionBottomSstart.storyName = "position bottom-start";
PositionBottomEnd.storyName = "position bottom-end";
PositionRight.storyName = "position right";
PositionRightRtart.storyName = "position right-start";
PositionRightEnd.storyName = "position right-end";
PositionLeft.storyName = "position left";
PositionLeftStart.storyName = "position left-start";
PositionLeftEnd.storyName = "position left-end";
TooltipTriggerRtyledRystem.storyName = "tooltip trigger styled system";
TooltipTriggerClassName.storyName = "tooltip trigger className";
TooltipTriggerStyle.storyName = "tooltip trigger style";
TooltipStyledRystem.storyName = "tooltip styled system";
TooltipClassName.storyName = "tooltip className";
TooltipStyle.storyName = "tooltip style";
