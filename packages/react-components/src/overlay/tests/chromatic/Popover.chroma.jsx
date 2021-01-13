import "./Popover.css";

import { Box } from "@react-components/box";
import { Button } from "@react-components/button";
import { Children, forwardRef, useContext, useLayoutEffect, useState } from "react";
import { Inline } from "../../../layout";
import { Popover } from "@react-components/overlay";
import { PopoverContext } from "../../src";
import { Text } from "@react-components/text";
import { TextInput } from "@react-components/input";
import { ThemeProvider } from "@react-components/theme-provider";
import { augmentElement, cssModule, disposables, mergeClasses, useMergedRefs } from "@react-components/shared";
import { createPortal } from "react-dom";
import { isNil } from "lodash";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

/*
INTERACTION TEST:
- open on click
- open on space
- open on enter? TO VALIDATE with specs
- open on custom keys (like open on arrow down)
- close on esc
- close on blur
- focus first element on open
- with and without restoreFocus
- restore focus on close
- restore focus on next element when closed with tab
- restore focus on previous element when closed with shift+tab
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

const Boundary = forwardRef(({
    scrollable,
    scrollTop = 0,
    className,
    children,
    ...rest
},
ref) => {
    const [boundaryElement, setBoundaryElement] = useState();

    const containerRef = useMergedRefs(setBoundaryElement, ref);

    useLayoutEffect(() => {
        // Not cool. Maybe it's because of the animation?
        disposables().setTimeout(() => {
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
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-chroma-popover-boundary",
                    (scrollable || scrollTop) && "scrollable"
                ),
                className
            )}
            ref={containerRef}
        >
            {content}
            {otherChildren}
        </Box>
    );
});

function RedBox({
    style,
    children,
    ...rest
}) {
    return (
        <Box
            {...rest}
            className="pa2"
            style={{
                backgroundColor: "red",
                minWidth: "75px",
                minHeight: "75px",
                ...(style ?? {})
            }}
        >
            {children}
        </Box>
    );
}

function AbsoluteBlueBox({
    containerElement,
    style,
    ...rest
}) {
    const content = (
        <Box
            {...rest}
            style={{
                backgroundColor: "blue",
                width: "25px",
                height: "25px",
                position: "absolute",
                top: "175px",
                left: "225px",
                ...style
            }}
        />
    );

    return !isNil(containerElement) ? createPortal(content, containerElement) : null;
}

stories()
    .add("default", () =>
        <Boundary>
            <Popover>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("show", () =>
        <Boundary>
            <Popover show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("default show", () =>
        <Boundary>
            <Popover defaultShow>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position auto", () =>
        <Boundary>
            <Popover position="auto" show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position auto-start", () =>
        <Boundary>
            <Popover position="auto-start" show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position auto-end", () =>
        <Boundary>
            <Popover position="auto-end" show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position top", () =>
        <Boundary>
            <Popover position="top" pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position top-start", () =>
        <Boundary>
            <Popover position="top-start" pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position top-end", () =>
        <Boundary>
            <Popover position="top-end" pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position bottom", () =>
        <Boundary>
            <Popover position="bottom" pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position bottom-start", () =>
        <Boundary>
            <Popover position="bottom-start" pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position bottom-end", () =>
        <Boundary>
            <Popover position="bottom-end" pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position right", () =>
        <Boundary>
            <Popover position="right" pinned show>
                <Button>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position right-start", () =>
        <Boundary>
            <Popover position="right-start" pinned show>
                <Button>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position right-end", () =>
        <Boundary>
            <Popover position="right-end" pinned show>
                <Button>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position left", () =>
        <Boundary>
            <Popover position="left" pinned show>
                <Button>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position left-start", () =>
        <Boundary>
            <Popover position="left-start" pinned show>
                <Button>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("position left-end", () =>
        <Boundary>
            <Popover position="left-end" pinned show>
                <Button>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("can prevent overflow", () =>
        <Boundary scrollTop={100}>
            <Popover position="right" allowFlip={false} show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("do not prevent overflow when not allowed", () =>
        <Boundary scrollTop={100}>
            <Popover position="right" allowFlip={false} allowPreventOverflow={false} show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("do not prevent overflow when pinned", () =>
        <Boundary scrollTop={100}>
            <Popover position="right" pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("can flip", () =>
        <Boundary scrollTop={100}>
            <Popover position="top" allowPreventOverflow={false} show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("do not flip when not allowed", () =>
        <Boundary scrollTop={100}>
            <Popover position="top" allowFlip={false} allowPreventOverflow={false} show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("do not flip when pinned", () =>
        <Boundary scrollTop={100}>
            <Popover position="top" pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("focusable overlay content", () =>
        <Boundary>
            <Popover defaultShow autoFocus>
                <Button fluid>Open</Button>
                <RedBox>
                    <>
                        <Text>What's on your mind?</Text>
                        <br />
                        <TextInput />
                    </>
                </RedBox>
            </Popover>
        </Boundary>
    )
    .add("render props", () =>
        <Boundary>
            <Popover>
                {({ isVisible }) => (
                    <>
                        <Button color={isVisible ? "secondary" : "primary"} fluid>Open</Button>
                        <RedBox />
                    </>
                )}
            </Popover>
        </Boundary>
    )
    .add("custom component", () => {
        const PrimaryBox = () => {
            const { isVisible } = useContext(PopoverContext);

            return (
                <RedBox style={isVisible ? { backgroundColor: "var(--primary-500)" } : undefined} />
            );
        };

        return (
            <Boundary>
                <Popover show>
                    <Button fluid>Open</Button>
                    <PrimaryBox />
                </Popover>
            </Boundary>
        );
    })
    .add("inherit theme", () =>
        <ThemeProvider theme="desktop" colorScheme="light">
            <Popover show>
                <Button>Open</Button>
                <RedBox>
                    <Button color="primary">Cutoff</Button>
                </RedBox>
            </Popover>
        </ThemeProvider>
    )
    .add("className", () =>
        <Boundary>
            <Popover className="border-blue" show>
                <Button>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("style", () =>
        <Boundary>
            <Popover style={{ border: "1px solid blue" }} show>
                <Button>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    );

stories("/offsets/bottom")
    .add("left + positive", () =>
        <Boundary>
            <Popover position="bottom-end" offset={[100, 30]} pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("left + negative", () =>
        <Boundary>
            <Popover position="bottom-end" offset={[-100, -30]} pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("right + positive", () =>
        <Boundary>
            <Popover position="bottom-start" offset={[100, 30]} pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("right + negative", () =>
        <Boundary>
            <Popover position="bottom-start" offset={[-100, -30]} pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    );

stories("/offsets/top")
    .add("left + positive", () =>
        <Boundary>
            <Popover position="top-end" offset={[100, 30]} pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("left + negative", () =>
        <Boundary>
            <Popover position="top-end" offset={[-100, -30]} pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("right + positive", () =>
        <Boundary>
            <Popover position="top-start" offset={[100, 30]} pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    )
    .add("right + negative", () =>
        <Boundary>
            <Popover position="top-start" offset={[-100, -30]} pinned show>
                <Button fluid>Open</Button>
                <RedBox />
            </Popover>
        </Boundary>
    );

stories("/z-index")
    .add("over regular text", () =>
        <Boundary>
            <Popover defaultShow>
                <Button>Open</Button>
                <RedBox />
            </Popover>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
        </Boundary>
    )
    .add("over an element with a z-index greater than 1 but smaller than the popover", () => {
        const [boundaryElement, setBoundaryElement] = useState();

        return (
            <Boundary ref={setBoundaryElement}>
                <Popover defaultShow>
                    <Button>Open</Button>
                    <RedBox />
                </Popover>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                <AbsoluteBlueBox style={{ zIndex: 2 }} containerElement={boundaryElement} />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
            </Boundary>
        );
    })
    .add("over an element with a z-index greater than the popover", () => {
        const [boundaryElement, setBoundaryElement] = useState();

        return (
            <Boundary ref={setBoundaryElement}>
                <Popover defaultShow>
                    <Button>Open</Button>
                    <RedBox />
                </Popover>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                <AbsoluteBlueBox style={{ zIndex: 100000 + 1 }} containerElement={boundaryElement} />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
            </Boundary>
        );
    });
