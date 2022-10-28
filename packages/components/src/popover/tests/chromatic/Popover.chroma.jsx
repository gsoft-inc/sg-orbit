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

export default {
    title: "Chromatic/Popover",
    component: Popover
};

export const Default = () =>
    <Popover>
        <Heading>Space News</Heading>
        <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
    </Popover>;

export const TextFooter = () =>
    <Popover>
        <Heading>Space News</Heading>
        <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
        <Footer>Step 2/4</Footer>
    </Popover>;

export const LinkFooter = () =>
    <Popover>
        <Heading>Space News</Heading>
        <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
        <Footer>
            <TextLink href="https://www.google.com" external>Step 2/4</TextLink>
        </Footer>
    </Popover>;

export const PopoverButton = () =>
    <Popover>
        <Heading>Space News</Heading>
        <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
        <Button variant="primary">Accept</Button>
    </Popover>;

export const PopoverButtonGroup = () =>
    <Popover>
        <Heading>Space News</Heading>
        <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
        <ButtonGroup>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Accept</Button>
        </ButtonGroup>
    </Popover>;

export const AllSlots = () =>
    <Popover>
        <Heading>Space News</Heading>
        <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation, with the ultimate goal of making life multiplanetary.</Content>
        <Footer>Step 2/4</Footer>
        <ButtonGroup>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Accept</Button>
        </ButtonGroup>
    </Popover>;

export const PopoverForm = () =>
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
    </Popover>;

export const PopoverImage = () =>
    <Popover>
        <Heading>Space News</Heading>
        <Content>
            <Image src={Launch} alt="SpaceX launch" />
        </Content>
        <ButtonGroup>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save</Button>
        </ButtonGroup>
    </Popover>;

export const Focused = () =>
    <Popover focus>
        <Heading>Space News</Heading>
        <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
    </Popover>;

export const NotDismissable = () =>
    <Popover dismissable={false}>
        <Heading>Space News</Heading>
        <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
    </Popover>;

export const StyledSystem = () =>
    <Popover border="warning-7">
        <Heading>Space News</Heading>
        <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
    </Popover>;

export const ClassName = () =>
    <Popover className="border-red">
        <Heading>Space News</Heading>
        <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
    </Popover>;

export const ZoomIn = () =>
    <Div className="zoom-in">
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </Div>;

export const ZoomOut = () =>
    <Div className="zoom-out">
        <Popover>
            <Heading>Space News</Heading>
            <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
        </Popover>
    </Div>;

export const Style = () =>
    <Popover style={{ border: "1px solid red" }}>
        <Heading>Space News</Heading>
        <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
    </Popover>;

Default.storyName = "default";
TextFooter.storyName = "text footer";
LinkFooter.storyName = "link footer";
PopoverButton.storyName = "button";
PopoverButtonGroup.storyName = "button group";
AllSlots.storyName = "all slots";
PopoverForm.storyName = "form";
PopoverImage.storyName = "image";
Focused.storyName = "focused";
NotDismissable.storyName = "not dismissable";
StyledSystem.storyName = "styled system";
ClassName.storyName = "className";
ZoomIn.storyName = "zoom in";
ZoomOut.storyName = "zoom out";
Style.storyName = "style";
