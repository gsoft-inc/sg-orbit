import { Box } from "@react-components/box";
import { Button, ButtonGroup, CrossButton } from "@react-components/button";
import { Children, forwardRef, useLayoutEffect, useState } from "react";
import { Content, Footer } from "@react-components/placeholders";
import { Field, Label } from "@react-components/field";
import { Form } from "@react-components/form";
import { Heading } from "@react-components/heading";
import { Image } from "@react-components/image";
import { Launch } from "./assets";
import { Popover, PopoverTrigger, usePopoverTriggerContext } from "@react-components/popover";
import { TextInput } from "@react-components/input";
import { augmentElement, mergeProps, useMergedRefs } from "@react-components/shared";
import { isNil } from "lodash";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

/*
INTERACTION TESTS:
    - When tabbing out of the popper and no focus lock, tab next focusable element after the trigger.
    - trigger "hover"
        - open on "hover"
        - close when leaving trigger
        - doesn't close when hover overlay
        - close when leaving overlay
        - close on blur
        - close on esc when focus on overlay
        - close on esc when focus on trigger
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
                        padding: "200px 400px",
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
            <PopoverTrigger>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("default open", () =>
        <Boundary>
            <PopoverTrigger defaultOpen>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("open on focus", () =>
        <Boundary>
            <PopoverTrigger trigger="hover">
                <Button autoFocus>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("text only", () =>
        <Boundary>
            <PopoverTrigger defaultOpen>
                <Button>Toggle</Button>
                <Popover>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("content", () =>
        <Boundary>
            <PopoverTrigger defaultOpen>
                <Button>Toggle</Button>
                <Popover>
                    <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("close button", () =>
        <Boundary>
            <PopoverTrigger defaultOpen>
                <Button>Toggle</Button>
                <Popover>
                    <CrossButton slot="close-button" aria-label="Close" />
                    <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("heading", () =>
        <Boundary>
            <PopoverTrigger defaultOpen>
                <Button>Toggle</Button>
                <Popover>
                    <Heading>Space News</Heading>
                    <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("footer", () =>
        <Boundary>
            <PopoverTrigger defaultOpen>
                <Button>Toggle</Button>
                <Popover>
                    <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                    <Footer>Step 2/4</Footer>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("button", () =>
        <Boundary>
            <PopoverTrigger defaultOpen>
                <Button>Toggle</Button>
                <Popover>
                    <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                    <Button>Accept</Button>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("button group", () =>
        <Boundary>
            <PopoverTrigger defaultOpen>
                <Button>Toggle</Button>
                <Popover>
                    <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                    <ButtonGroup>
                        <Button color="secondary">Cancel</Button>
                        <Button color="primary">Accept</Button>
                    </ButtonGroup>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("all slots", () =>
        <Boundary>
            <PopoverTrigger defaultOpen>
                <Button>Toggle</Button>
                <Popover>
                    <CrossButton slot="close-button" aria-label="Close" />
                    <Heading>Space News</Heading>
                    <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                    <Footer>Step 2/4</Footer>
                    <ButtonGroup>
                        <Button color="secondary">Cancel</Button>
                        <Button color="primary">Accept</Button>
                    </ButtonGroup>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("form", () =>
        <Boundary>
            <PopoverTrigger defaultOpen>
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
                        </Form>
                    </Content>
                    <ButtonGroup>
                        <Button color="secondary">Cancel</Button>
                        <Button color="primary">Save</Button>
                    </ButtonGroup>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("image", () =>
        <Boundary>
            <PopoverTrigger defaultOpen>
                <Button>Toggle</Button>
                <Popover>
                    <CrossButton slot="close-button" aria-label="Close" />
                    <Content>
                        <Image src={Launch} alt="SpaceX launch" />
                    </Content>
                    <ButtonGroup>
                        <Button color="secondary">Cancel</Button>
                        <Button color="primary">Save</Button>
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
    .add("autofocus first focusable element", () =>
        <Boundary>
            <PopoverTrigger autoFocus open>
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
                        </Form>
                    </Content>
                    <ButtonGroup>
                        <Button color="secondary">Cancel</Button>
                        <Button color="primary">Save</Button>
                    </ButtonGroup>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("autofocus with only close button", () =>
        <Boundary>
            <PopoverTrigger autoFocus defaultOpen>
                <Button>Toggle</Button>
                <Popover>
                    <CrossButton slot="close-button" aria-label="Close" />
                    <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                </Popover>
            </PopoverTrigger>
        </Boundary>
    )
    .add("manual autofocus", () =>
        <Boundary>
            <PopoverTrigger autoFocus open>
                <Button>Toggle</Button>
                <Popover>
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
                        </Form>
                    </Content>
                    <ButtonGroup>
                        <Button autoFocus color="secondary">Cancel</Button>
                        <Button color="primary">Save</Button>
                    </ButtonGroup>
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
