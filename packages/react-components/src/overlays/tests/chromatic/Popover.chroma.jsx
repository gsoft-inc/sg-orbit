import { Box } from "@react-components/box";
import { Button } from "@react-components/button";
import { Children, forwardRef, useState } from "react";
import { Overlay, useOverlay, usePopoverPosition } from "@react-components/overlays";
import { augmentElement, useControllableState, useEventCallback, useMergedRefs } from "@react-components/shared";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

/*
CHROMA TEST:
- open
- close
- all positions
- can flip
- can update position
- do not flip when pinned
- do not update position when pinned
- offset

INTERACTION TEST:
- open on click
- open on space
- open on enter? TO VALIDATE with specs
- open on custom keys (like open on arrow down)
- close on ESC
- close on blur
- focus trigger on close
- focus first element on open
*/

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Popover")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

const Boundary = forwardRef(({ style, children, ...rest }, ref) => {
    return (
        <div
            {...rest}
            style={{
                ...(style ?? {}),
                width: "800px",
                height: "500px",
                margin: "0 auto",
                paddingTop: "100px"
            }}
            ref={ref}
        >
            {children}
        </div>
    );
});

function Popover({
    show,
    defaultShow,
    position = "bottom",
    offset,
    hideOnEscape = true,
    hideOnBlur = true,
    pinned,
    container,
    children,
    forwardedRef,
    ...rest
}) {
    const [isVisible, setIsVisible] = useControllableState(show, defaultShow, false);
    const [triggerElement, setTriggerElement] = useState();
    const [overlayElement, setOverlayElement] = useState();

    const overlayRef = useMergedRefs(setOverlayElement, forwardedRef);

    const [trigger, content] = Children.toArray(children);

    const handleOnTriggerClick = useEventCallback(() => {
        setIsVisible(true);
    });

    const handleOnHide = useEventCallback(() => {
        setIsVisible(false);
    });

    const overlayProps = useOverlay({
        isVisible,
        onHide: handleOnHide,
        hideOnEscape,
        hideOnBlur,
        overlayRef
    });

    const triggerMarkup = augmentElement(trigger, {
        onClick: handleOnTriggerClick,
        ref: setTriggerElement
    });

    const { popoverPositionStyles, popoverPositionProps } = usePopoverPosition({
        position,
        triggerElement,
        overlayElement,
        offset,
        canFlip: true,
        boundaryElement: container,
        canUpdatePosition: true,
        pinned
    });

    return (
        <Box {...rest}>
            {triggerMarkup}
            <Overlay
                {...overlayProps}
                {...popoverPositionProps}
                show={isVisible}
                style={popoverPositionStyles}
                container={container}
                ref={overlayRef}
            >
                {content}
            </Overlay>
        </Box>
    );
}

stories()
    .add("default", () => {
        const [boundaryElement, setBoundaryElement] = useState();

        return (
            <Boundary ref={setBoundaryElement}>
                <Popover container={boundaryElement}>
                    <Button fluid>Open</Button>
                    <Box>
                        <div>Popover Content</div>
                        <input id="txt-1" type="text" />
                        <input id="txt-2" type="text" />
                        <input id="txt-3" type="text" />
                    </Box>
                </Popover>
            </Boundary>
        );
    });
