import { Button } from "@react-components/button";
import { EmailIcon } from "@react-components/icons";
import { IconButton } from "@react-components/button";
import { Image } from "@react-components/image";
import { Launch } from "./assets";
import { TextLink } from "@react-components/link";
import { Tooltip, TooltipTrigger } from "@react-components/tooltip";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Tooltip")
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({
                padding: "150px 250px"
            })
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

stories()
    .add("default", () =>
        <TooltipTrigger>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth</Tooltip>
        </TooltipTrigger>
    )
    .add("open", () =>
        <TooltipTrigger open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth</Tooltip>
        </TooltipTrigger>
    )
    .add("open on focus", () =>
        <TooltipTrigger>
            <Button autoFocus variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth</Tooltip>
        </TooltipTrigger>
    )
    .add("icon trigger", () =>
        <TooltipTrigger open>
            <EmailIcon />
            <Tooltip>Man must rise above the Earth</Tooltip>
        </TooltipTrigger>
    )
    .add("icon button trigger", () =>
        <TooltipTrigger open>
            <IconButton variant="secondary" aria-label="Email">
                <EmailIcon />
            </IconButton>
            <Tooltip>Man must rise above the Earth</Tooltip>
        </TooltipTrigger>
    )
    .add("link trigger", () =>
        <TooltipTrigger open>
            <TextLink>Trigger</TextLink>
            <Tooltip>Man must rise above the Earth</Tooltip>
        </TooltipTrigger>
    )
    .add("image trigger", () =>
        <TooltipTrigger open>
            <Image src={Launch} width="400px" alt="SpaceX launch" />
            <Tooltip>Man must rise above the Earth</Tooltip>
        </TooltipTrigger>
    )
    .add("very long content", () =>
        <TooltipTrigger open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth—to the top of the atmosphere and beyond—for only thus will he fully understand the world in which he lives. Astronomy compels the soul to look upward, and leads us from this world to another.</Tooltip>
        </TooltipTrigger>
    )
    .add("link in content", () =>
        <TooltipTrigger open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the <TextLink href="https://en.wikipedia.org/wiki/Earth">Earth</TextLink>.</Tooltip>
        </TooltipTrigger>
    )
    .add("position auto", () =>
        <TooltipTrigger position="auto" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("position auto-start", () =>
        <TooltipTrigger position="auto-start" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("position auto-end", () =>
        <TooltipTrigger position="auto-end" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("position top", () =>
        <TooltipTrigger position="top" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("position top-start", () =>
        <TooltipTrigger position="top-start" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("position top-end", () =>
        <TooltipTrigger position="top-end" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("position bottom", () =>
        <TooltipTrigger position="bottom" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("position bottom-start", () =>
        <TooltipTrigger position="bottom-start" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("position bottom-end", () =>
        <TooltipTrigger position="bottom-end" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("position right", () =>
        <TooltipTrigger position="right" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("position right-start", () =>
        <TooltipTrigger position="right-start" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("position right-end", () =>
        <TooltipTrigger position="right-end" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("position left", () =>
        <TooltipTrigger position="left" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("position left-start", () =>
        <TooltipTrigger position="left-start" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("position left-end", () =>
        <TooltipTrigger position="left-end" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("tooltip trigger className", () =>
        <TooltipTrigger className="border-red" open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("tooltip trigger style", () =>
        <TooltipTrigger style={{ border: "1px solid red" }} open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("tooltip className", () =>
        <TooltipTrigger open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip className="border-red">Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    )
    .add("tooltip style", () =>
        <TooltipTrigger open>
            <Button variant="secondary">Trigger</Button>
            <Tooltip style={{ border: "1px solid red" }}>Man must rise above the Earth.</Tooltip>
        </TooltipTrigger>
    );
