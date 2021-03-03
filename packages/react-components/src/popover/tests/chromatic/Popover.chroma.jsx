import { Button, ButtonGroup } from "@react-components/button";
import { Content, Footer } from "@react-components/placeholders";
import { Field, Label } from "@react-components/field";
import { Form } from "@react-components/form";
import { Heading } from "@react-components/heading";
import { Image } from "@react-components/image";
import { Launch } from "./assets";
import { Popover, PopoverTrigger, usePopoverTriggerContext } from "@react-components/popover";
import { TextInput } from "@react-components/input";
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
            .canvasLayout({
                padding: "200px 400px"
            })
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

stories()
    .add("default", () =>
        <PopoverTrigger>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("default open", () =>
        <PopoverTrigger defaultOpen>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("open on focus", () =>
        <PopoverTrigger trigger="hover">
            <Button autoFocus>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("footer", () =>
        <PopoverTrigger defaultOpen>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                <Footer>Step 2/4</Footer>
            </Popover>
        </PopoverTrigger>
    )
    .add("button", () =>
        <PopoverTrigger defaultOpen>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                <Button>Accept</Button>
            </Popover>
        </PopoverTrigger>
    )
    .add("button group", () =>
        <PopoverTrigger defaultOpen>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                <ButtonGroup>
                    <Button color="secondary">Cancel</Button>
                    <Button color="primary">Accept</Button>
                </ButtonGroup>
            </Popover>
        </PopoverTrigger>
    )
    .add("all slots", () =>
        <PopoverTrigger defaultOpen>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
                <Footer>Step 2/4</Footer>
                <ButtonGroup>
                    <Button color="secondary">Cancel</Button>
                    <Button color="primary">Accept</Button>
                </ButtonGroup>
            </Popover>
        </PopoverTrigger>
    )
    .add("hide close button", () =>
        <PopoverTrigger defaultOpen>
            <Button>Toggle</Button>
            <Popover hideCloseButton>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>

            </Popover>
        </PopoverTrigger>
    )
    .add("form", () =>
        <PopoverTrigger defaultOpen>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
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
    )
    .add("image", () =>
        <PopoverTrigger defaultOpen>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>
                    <Image src={Launch} alt="SpaceX launch" />
                </Content>
                <ButtonGroup>
                    <Button color="secondary">Cancel</Button>
                    <Button color="primary">Save</Button>
                </ButtonGroup>
            </Popover>
        </PopoverTrigger>
    )
    .add("position auto", () =>
        <PopoverTrigger position="auto" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position auto-start", () =>
        <PopoverTrigger position="auto-start" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position auto-end", () =>
        <PopoverTrigger position="auto-end" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position top", () =>
        <PopoverTrigger position="top" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position top-start", () =>
        <PopoverTrigger position="top-start" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position top-end", () =>
        <PopoverTrigger position="top-end" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position bottom", () =>
        <PopoverTrigger position="bottom" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position bottom-start", () =>
        <PopoverTrigger position="bottom-start" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position bottom-end", () =>
        <PopoverTrigger position="bottom-end" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position right", () =>
        <PopoverTrigger position="right" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position right-start", () =>
        <PopoverTrigger position="right-start" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position right-end", () =>
        <PopoverTrigger position="right-end" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position left", () =>
        <PopoverTrigger position="left" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position left-start", () =>
        <PopoverTrigger position="left-start" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("position left-end", () =>
        <PopoverTrigger position="left-end" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("autofocus first focusable element", () =>
        <PopoverTrigger autoFocus open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
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
    )
    .add("autofocus with only close button", () =>
        <PopoverTrigger autoFocus defaultOpen>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("manual autofocus", () =>
        <PopoverTrigger autoFocus open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
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
    )
    .add("render props", () =>
        <PopoverTrigger>
            {({ isOpen }) => (
                <>
                    <Button color={isOpen ? "secondary" : "primary"}>Toggle</Button>
                    <Popover>
                        <Heading>Space News</Heading>
                        <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
                    </Popover>
                </>
            )}
        </PopoverTrigger>
    )
    .add("custom component", () => {
        const PrimaryPopover = ({ children }) => {
            const { isOpen } = usePopoverTriggerContext();

            return (
                <Popover style={isOpen ? { backgroundColor: "var(--o-ui-primary-500)" } : undefined}>
                    {children}
                </Popover>
            );
        };

        return (
            <PopoverTrigger open>
                <Button>Toggle</Button>
                <PrimaryPopover>
                    <Heading>Space News</Heading>
                    <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
                </PrimaryPopover>
            </PopoverTrigger>
        );
    })
    .add("popover trigger className", () =>
        <PopoverTrigger className="border-red" open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("popover trigger style", () =>
        <PopoverTrigger style={{ border: "1px solid red" }} open>
            <Button>Toggle</Button>
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("popover className", () =>
        <PopoverTrigger open>
            <Button>Toggle</Button>
            <Popover className="border-red">
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    )
    .add("popover style", () =>
        <PopoverTrigger open>
            <Button>Toggle</Button>
            <Popover style={{ border: "1px solid red" }}>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world’s most advanced rockets and spacecraft.</Content>
            </Popover>
        </PopoverTrigger>
    );
