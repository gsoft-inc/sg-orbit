import { Box } from "@react-components/box";
import { Button } from "@react-components/button";
import { Children, forwardRef, useLayoutEffect, useState } from "react";
import { EmailIcon } from "@react-components/icons";
import { IconButton } from "@react-components/button";
import { Image } from "@react-components/image";
import { Launch } from "./assets";
import { Text } from "@react-components/text";
import { TextLink } from "@react-components/link";
import { Tooltip, TooltipTrigger } from "@react-components/tooltip";
import { augmentElement, mergeProps, useMergedRefs } from "@react-components/shared";
import { isNil } from "lodash";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

/*
INTERACTION TESTS:
    - open on "hover"
    - close when leaving trigger
    - doesn't close when hover overlay
    - close when leaving overlay
    - close on blur
    - close on esc when focus in overlay
    - don't open when disabled
    - close on esc when focus on trigger
*/

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Tooltip")
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({
                paddingTop: "50px",
                paddingLeft: "200px"
            })
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

const Boundary = forwardRef(({
    scrollTop = 0,
    children,
    ...rest
},
ref) => {
    const [boundaryElement, setBoundaryElement] = useState();

    const containerRef = useMergedRefs(setBoundaryElement, ref);

    useLayoutEffect(() => {
        // Not cool. Maybe it's because of the animation?
        setTimeout(() => {
            if (!isNil(boundaryElement)) {
                boundaryElement.scrollTop = scrollTop;
            }
        }, 10);
    }, [boundaryElement, scrollTop]);

    const [popover, ...otherChildren] = Children.toArray(children);

    const content = augmentElement(popover, {
        containerElement: boundaryElement
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    style: {
                        padding: "100px 250px",
                        position: "relative"
                    },
                    ref: containerRef
                }
            )}
        >
            {content}
            {otherChildren}
        </Box>
    );
});

stories()
    .add("default", () =>
        <Boundary>
            <TooltipTrigger>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("open", () =>
        <Boundary>
            <TooltipTrigger open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("open on focus", () =>
        <Boundary>
            <TooltipTrigger>
                <Button autoFocus>Trigger</Button>
                <Tooltip>Man must rise above the Earth</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("icon trigger", () =>
        <Boundary>
            <TooltipTrigger open>
                <EmailIcon />
                <Tooltip>Man must rise above the Earth</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("icon button trigger", () =>
        <Boundary>
            <TooltipTrigger open>
                <IconButton aria-label="Email">
                    <EmailIcon />
                </IconButton>
                <Tooltip>Man must rise above the Earth</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("link trigger", () =>
        <Boundary>
            <TooltipTrigger open>
                <TextLink>Trigger</TextLink>
                <Tooltip>Man must rise above the Earth</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("image trigger", () =>
        <Boundary>
            <TooltipTrigger open>
                <Image src={Launch} width="400px" alt="SpaceX launch" />
                <Tooltip>Man must rise above the Earth</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("disabled", () =>
        <Boundary>
            <TooltipTrigger disabled open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("very long content", () =>
        <Boundary>
            <TooltipTrigger open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth—to the top of the atmosphere and beyond—for only thus will he fully understand the world in which he lives. Astronomy compels the soul to look upward, and leads us from this world to another.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("icon in content", () =>
        <Boundary>
            <TooltipTrigger open>
                <Button>Trigger</Button>
                <Tooltip>
                    <EmailIcon />
                    <Text>Man must rise above the Earth</Text>
                    <EmailIcon />
                </Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("link in content", () =>
        <Boundary>
            <TooltipTrigger open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the <TextLink href="https://en.wikipedia.org/wiki/Earth">Earth</TextLink>.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position auto", () =>
        <Boundary>
            <TooltipTrigger position="auto" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position auto-start", () =>
        <Boundary>
            <TooltipTrigger position="auto-start" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position auto-end", () =>
        <Boundary>
            <TooltipTrigger position="auto-end" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position top", () =>
        <Boundary>
            <TooltipTrigger position="top" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position top-start", () =>
        <Boundary>
            <TooltipTrigger position="top-start" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position top-end", () =>
        <Boundary>
            <TooltipTrigger position="top-end" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position bottom", () =>
        <Boundary>
            <TooltipTrigger position="bottom" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position bottom-start", () =>
        <Boundary>
            <TooltipTrigger position="bottom-start" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position bottom-end", () =>
        <Boundary>
            <TooltipTrigger position="bottom-end" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position right", () =>
        <Boundary>
            <TooltipTrigger position="right" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position right-start", () =>
        <Boundary>
            <TooltipTrigger position="right-start" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position right-end", () =>
        <Boundary>
            <TooltipTrigger position="right-end" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position left", () =>
        <Boundary>
            <TooltipTrigger position="left" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position left-start", () =>
        <Boundary>
            <TooltipTrigger position="left-start" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("position left-end", () =>
        <Boundary>
            <TooltipTrigger position="left-end" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("tooltip trigger className", () =>
        <Boundary>
            <TooltipTrigger className="border-red" open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("tooltip trigger style", () =>
        <Boundary>
            <TooltipTrigger style={{ border: "1px solid red" }} open>
                <Button>Trigger</Button>
                <Tooltip>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("tooltip className", () =>
        <Boundary>
            <TooltipTrigger open>
                <Button>Trigger</Button>
                <Tooltip className="border-red">Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    )
    .add("tooltip style", () =>
        <Boundary>
            <TooltipTrigger open>
                <Button>Trigger</Button>
                <Tooltip style={{ border: "1px solid red" }}>Man must rise above the Earth.</Tooltip>
            </TooltipTrigger>
        </Boundary>
    );
