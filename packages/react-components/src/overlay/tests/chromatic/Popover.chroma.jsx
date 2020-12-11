import { Box } from "@react-components/box";
import { Button } from "@react-components/button";
import { Popover } from "@react-components/overlay";
import { PopoverContext } from "../../src";
import { Text } from "@react-components/text";
import { TextInput } from "@react-components/input";
import { augmentElement, mergeClasses } from "@react-components/shared";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";
import { useContext, useState } from "react";

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
- zIndex - default
- on top of another content with a zIndex
- zIndex when in a dialog
- render props (and maybe using the isVisible prop)
- PopoverContext with isVisible
- follow theme provider when open

INTERACTION TEST:
- open on click
- open on space
- open on enter? TO VALIDATE with specs
- open on custom keys (like open on arrow down)
- close on ESC
- close on blur
- focus trigger on close
- focus first element on open
- with and without restoreFocus
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

function Boundary({ style, children, ...rest }) {
    const [boundaryElement, setBoundaryElement] = useState();

    const content = augmentElement(children, {
        containerElement: boundaryElement
    });

    return (
        <Box
            {...rest}
            style={{
                ...(style ?? {}),
                width: "800px",
                height: "500px",
                margin: "0 auto",
                paddingTop: "100px"
            }}
            ref={setBoundaryElement}
        >
            {content}
        </Box>
    );
}

function RedBox({
    style,
    children,
    ...rest
}) {
    // TODO: Remove the input once Popover is more mature.
    const content = children ?? (
        <>
            <Text>What's in your mind?</Text>
            <br />
            <TextInput />
        </>
    );

    return (
        <Box
            {...rest}
            className="pa2"
            style={{
                backgroundColor: "red",
                ...style,
                minWidth: "200px",
                height: "100px"
            }}
        >
            {content}
        </Box>
    );
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
    .add("non focusable content", () =>
        <Boundary>
            <Popover>
                <Button fluid>Open</Button>
                <RedBox>A box without any focusable content. Does it still work?</RedBox>
            </Popover>
        </Boundary>
    )
    .add("render props", () =>
        <Boundary>
            <Popover>
                {({ isVisible }) => (
                    <>
                        <Button color={isVisible ? "secondary" : "primary"} fluid >Open</Button>
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
                <Popover>
                    <Button fluid >Open</Button>
                    <PrimaryBox />
                </Popover>
            </Boundary>
        );
    });
