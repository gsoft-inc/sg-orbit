import "./Popover.css";

import { Box } from "@react-components/box";
import { Button, ButtonGroup, CrossButton } from "@react-components/button";
import { Children, forwardRef, useLayoutEffect, useState } from "react";
import { Content, Header } from "@react-components/placeholders";
import { Field, Label } from "@react-components/field";
import { Form } from "@react-components/form";
import { Popover, PopoverTrigger, usePopoverTriggerContext } from "@react-components/popover";
import { TextInput } from "@react-components/input";
import { augmentElement, disposables, mergeProps, useMergedRefs } from "@react-components/shared";
import { isNil } from "lodash";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

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
    scrollTop = 0,
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
            {...mergeProps(
                rest,
                {
                    className: "o-ui-chroma-popover-boundary",
                    ref: containerRef
                }
            )}
        >
            {content}
            {otherChildren}
        </Box>
    );
});

/*
TODO:
- Hover + Focus (trigger)
*/

stories()
    .add("default open", () =>
        <Boundary>
            <PopoverTrigger defaultOpen>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("text only", () =>
        <Boundary>
            <PopoverTrigger open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("content", () =>
        <Boundary>
            <PopoverTrigger open>
                <Button>Toggle</Button>
                <Popover>
                    <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("header", () =>
        <Boundary>
            <PopoverTrigger open>
                <Button>Toggle</Button>
                <Popover>
                    <Header>Space News</Header>
                    <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("single button", () =>
        <Boundary>
            <PopoverTrigger open>
                <Button>Toggle</Button>
                <Popover>
                    <Header>Space News</Header>
                    <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                    <Button>Accept</Button>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("button group", () =>
        <Boundary>
            <PopoverTrigger open>
                <Button>Toggle</Button>
                <Popover>
                    <Header>Space News</Header>
                    <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                    <ButtonGroup align="end">
                        <Button color="secondary">Cancel</Button>
                        <Button color="primary">Accept</Button>
                    </ButtonGroup>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("close button", () =>
        <Boundary>
            <PopoverTrigger open>
                <Button>Toggle</Button>
                <Popover>
                    <Header>Space News</Header>
                    <CrossButton slot="close-button" aria-label="Close" />
                    <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                    <ButtonGroup align="end">
                        <Button color="secondary">Cancel</Button>
                        <Button color="primary">Accept</Button>
                    </ButtonGroup>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position auto", () =>
        <Boundary>
            <PopoverTrigger position="auto" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position auto-start", () =>
        <Boundary>
            <PopoverTrigger position="auto-start" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position auto-end", () =>
        <Boundary>
            <PopoverTrigger position="auto-end" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position top", () =>
        <Boundary>
            <PopoverTrigger position="top" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position top-start", () =>
        <Boundary>
            <PopoverTrigger position="top-start" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position top-end", () =>
        <Boundary>
            <PopoverTrigger position="top-end" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position bottom", () =>
        <Boundary>
            <PopoverTrigger position="bottom" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position bottom-start", () =>
        <Boundary>
            <PopoverTrigger position="bottom-start" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position bottom-end", () =>
        <Boundary>
            <PopoverTrigger position="bottom-end" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position right", () =>
        <Boundary>
            <PopoverTrigger position="right" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position right-start", () =>
        <Boundary>
            <PopoverTrigger position="right-start" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position right-end", () =>
        <Boundary>
            <PopoverTrigger position="right-end" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position left", () =>
        <Boundary>
            <PopoverTrigger position="left" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position left-start", () =>
        <Boundary>
            <PopoverTrigger position="left-start" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("position left-end", () =>
        <Boundary>
            <PopoverTrigger position="left-end" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("form", () =>
        <Boundary>
            <PopoverTrigger open>
                <Button>Toggle</Button>
                <Popover>
                    <CrossButton slot="close-button" aria-label="Close" />
                    <Content>
                        <Form fluid>
                            <Field>
                                <Label>First Name</Label>
                                <TextInput name="first-name" />
                            </Field>
                            <Field>
                                <Label>Last Name</Label>
                                <TextInput name="last-name" />
                            </Field>
                            <ButtonGroup align="end">
                                <Button color="secondary">Cancel</Button>
                                <Button color="primary">Save</Button>
                            </ButtonGroup>
                        </Form>
                    </Content>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("render props", () =>
        <Boundary>
            <PopoverTrigger>
                {({ isOpen }) => (
                    <>
                        <Button color={isOpen ? "secondary" : "primary"}>Toggle</Button>
                        <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
                    </>
                )}
            </PopoverTrigger>
        </Boundary>
    )
    .add("custom component", () => {
        const PrimaryPopover = ({ children }) => {
            const { isOpen } = usePopoverTriggerContext();

            return (
                <Popover>
                    <Box style={isOpen ? { backgroundColor: "var(--primary-500)" } : undefined}>
                        {children}
                    </Box>
                </Popover>
            );
        };

        return (
            <Boundary>
                <PopoverTrigger open>
                    <Button>Toggle</Button>
                    <PrimaryPopover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</PrimaryPopover>
                </PopoverTrigger>
            </Boundary>
        );
    })
    .add("popover trigger className", () =>
        <Boundary>
            <PopoverTrigger className="border-red" open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>

    )
    .add("popover trigger style", () =>
        <Boundary>
            <PopoverTrigger style={{ border: "1px solid red" }} open>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("popover className", () =>
        <Boundary>
            <PopoverTrigger open>
                <Button>Toggle</Button>
                <Popover className="border-red">SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("popover style", () =>
        <Boundary>
            <PopoverTrigger open>
                <Button>Toggle</Button>
                <Popover style={{ border: "1px solid red" }}>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    );

stories("/offsets/bottom")
    .add("left + positive", () =>
        <Boundary>
            <PopoverTrigger position="bottom-end" offset={[100, 30]} allowFlip={false} allowPreventOverflow={false} show>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("left + negative", () =>
        <Boundary>
            <PopoverTrigger position="bottom-end" offset={[-100, -30]} allowFlip={false} allowPreventOverflow={false} show>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("right + positive", () =>
        <Boundary>
            <PopoverTrigger position="bottom-start" offset={[100, 30]} allowFlip={false} allowPreventOverflow={false} show>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("right + negative", () =>
        <Boundary>
            <PopoverTrigger position="bottom-start" offset={[-100, -30]} allowFlip={false} allowPreventOverflow={false} show>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    );

stories("/offsets/top")
    .add("left + positive", () =>
        <Boundary>
            <PopoverTrigger position="top-end" offset={[100, 30]} allowFlip={false} allowPreventOverflow={false} show>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("left + negative", () =>
        <Boundary>
            <PopoverTrigger position="top-end" offset={[-100, -30]} allowFlip={false} allowPreventOverflow={false} show>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("right + positive", () =>
        <Boundary>
            <PopoverTrigger position="top-start" offset={[100, 30]} allowFlip={false} allowPreventOverflow={false} show>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("right + negative", () =>
        <Boundary>
            <PopoverTrigger position="top-start" offset={[-100, -30]} allowFlip={false} allowPreventOverflow={false} show>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    );
