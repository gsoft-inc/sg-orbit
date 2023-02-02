import { Button, ButtonGroup } from "@components/button";
import { Content, Footer } from "@components/placeholders";
import { Field, Label } from "@components/field";

import { Div } from "@components/html";
import { Form } from "@components/form";
import { Heading } from "@components/typography";
import { Image } from "@components/image";
import { Launch } from "./assets";
import { Popover } from "@components/popover";
import { TextInput } from "@components/text-input";
import { TextLink } from "@components/link";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Popover",
    component: Popover
} as ComponentMeta<typeof Popover>;

type PopoverStory = ComponentStoryObj<typeof Popover>;

export const Default: PopoverStory = {
    storyName: "default",
    render: () => (
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    )
};

export const TextFooter: PopoverStory = {
    storyName: "text footer",
    render: () => (
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            <Footer>Step 2/4</Footer>
        </Popover>
    )
};

export const LinkFooter: PopoverStory = {
    storyName: "link footer",
    render: () => (
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            <Footer>
                <TextLink href="https://www.google.com" external>Step 2/4</TextLink>
            </Footer>
        </Popover>
    )
};

export const PopoverButton: PopoverStory = {
    storyName: "button",
    render: () => (
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            <Button variant="primary">Accept</Button>
        </Popover>
    )
};

export const PopoverButtonGroup: PopoverStory = {
    storyName: "button group",
    render: () => (
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            <ButtonGroup>
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Accept</Button>
            </ButtonGroup>
        </Popover>
    )
};

export const AllSlots: PopoverStory = {
    storyName: "all slots",
    render: () => (
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
            <Footer>Step 2/4</Footer>
            <ButtonGroup>
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Accept</Button>
            </ButtonGroup>
        </Popover>
    )
};

export const PopoverForm: PopoverStory = {
    storyName: "form",
    render: () => (
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
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Save</Button>
            </ButtonGroup>
        </Popover>
    )
};

export const PopoverImage: PopoverStory = {
    storyName: "image",
    render: () => (
        <Popover>
            <Heading>Space News</Heading>
            <Content>
                <Image src={Launch} alt="SpaceX launch" />
            </Content>
            <ButtonGroup>
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Save</Button>
            </ButtonGroup>
        </Popover>
    )
};

export const Focused: PopoverStory = {
    storyName: "focused",
    render: () => (
        <Popover focus>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    )
};

export const NotDismissable: PopoverStory = {
    storyName: "not dismissable",
    render: () => (
        <Popover dismissable={false}>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    )
};

export const StyledSystem: PopoverStory = {
    storyName: "styled system",
    render: () => (
        <Popover border="warning-7">
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    )
};

export const ClassName: PopoverStory = {
    storyName: "className",
    render: () => (
        <Popover className="border-red">
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    )
};

export const ZoomIn: PopoverStory = {
    storyName: "zoom in",
    render: () => (
        <Div className="zoom-in">
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </Div>
    )
};

export const ZoomOut: PopoverStory = {
    storyName: "zoom out",
    render: () => (
        <Div className="zoom-out">
            <Popover>
                <Heading>Space News</Heading>
                <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
            </Popover>
        </Div>
    )
};

export const Style: PopoverStory = {
    storyName: "style",
    render: () => (
        <Popover style={{ border: "1px solid red" }}>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    )
};
