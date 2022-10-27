import { Button, IconButton } from "@components/button";
import { Item, Section } from "@components/collection";
import { Menu, MenuTrigger } from "@components/menu";
import { DisclosureArrow } from "@components/disclosure";
import { Divider } from "@components/divider";
import { HtmlButton } from "@components/html";
import { Text } from "@components/typography";
import { VerticalDotsIcon } from "@components/icons";
import { forwardRef } from "react";

export default {
    title: "Chromatic/MenuTrigger",
    component: MenuTrigger,
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
};

export const Default = () =>
    <MenuTrigger>
        <Button variant="secondary">Trigger</Button>
        <Menu>
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Menu>
    </MenuTrigger>;

export const OpenWithItemsOnly = () =>
    <MenuTrigger defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu>
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Menu>
    </MenuTrigger>;

export const OpenWithSections = () =>
    <MenuTrigger defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu>
            <Section title="Visited">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Section>
            <Section title="Not Visited">
                <Item key="jupiter">Jupiter</Item>
                <Item key="mercury">Mercury</Item>
                <Item key="neptune">Neptune</Item>
                <Item key="uranus">Uranus</Item>
            </Section>
        </Menu>
    </MenuTrigger>;

export const OpenWithDividers = () =>
    <MenuTrigger defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu>
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
            <Divider />
            <Item key="jupiter">Jupiter</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="uranus">Uranus</Item>
        </Menu>
    </MenuTrigger>;

export const OpenWithASelectedItem = () =>
    <MenuTrigger defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu defaultSelectedKeys={["mars"]} selectionMode="single">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Menu>
    </MenuTrigger>;

export const OpenWithMultipleSelectedItems = () =>
    <MenuTrigger defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu defaultSelectedKeys={["mars", "saturn"]} selectionMode="multiple">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Menu>
    </MenuTrigger>;

export const DirectionBottom = () =>
    <MenuTrigger direction="bottom" defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu>
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Menu>
    </MenuTrigger>;

export const DirectionTop = () =>
    <MenuTrigger direction="top" defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu>
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Menu>
    </MenuTrigger>;

DirectionTop.decorators = [Story => <div style={{ marginTop: "100px" }}><Story /></div>];

export const AlignStart = () =>
    <MenuTrigger align="start" allowFlip={false} allowPreventOverflow={false} defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu width={14}>
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Menu>
    </MenuTrigger>;

AlignStart.decorators = [Story => <div style={{ paddingLeft: "200px" }}><Story /></div>];

export const AlignEnd = () =>
    <MenuTrigger align="end" allowFlip={false} allowPreventOverflow={false} defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu width={14}>
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Menu>
    </MenuTrigger>;

AlignEnd.decorators = [Story => <div style={{ paddingLeft: "200px" }}><Story /></div>];

export const IconButtonTrigger = () =>
    <MenuTrigger defaultOpen>
        <IconButton variant="secondary" aria-label="Open menu">
            <VerticalDotsIcon />
        </IconButton>
        <Menu>
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Menu>
    </MenuTrigger>;

const CustomTrigger = forwardRef((props, ref) => {
    return (
        <HtmlButton
            {...props}
            type="button"
            display="flex"
            alignItems="center"
            ref={ref}
        >
            <Text>Trigger</Text>
            <DisclosureArrow />
        </HtmlButton>
    );
});

export const CustomTriggerWithDisclosureArrow = () =>
    <MenuTrigger defaultOpen>
        <CustomTrigger />
        <Menu>
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Menu>
    </MenuTrigger>;

const CustomMenu = forwardRef(({ children, ...props }, ref) => {
    return (
        <Menu
            {...props}
            className="bg-red"
            ref={ref}
        >
            {children}
        </Menu>
    );
});

export const MenuTriggerCustomMenu = () =>
    <MenuTrigger defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <CustomMenu>
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </CustomMenu>
    </MenuTrigger>;

export const FunctionalContent = () =>
    <MenuTrigger defaultOpen>
        {() => {
            return (
                <>
                    <Button variant="secondary">Trigger</Button>
                    <Menu>
                        <Item key="earth">Earth</Item>
                        <Item key="mars">Mars</Item>
                        <Item key="saturn">Saturn</Item>
                    </Menu>
                </>
            );
        }}
    </MenuTrigger>;

export const StyledSystem = () =>
    <MenuTrigger border="warning-7" defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu>
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    </MenuTrigger>;

export const ClassName = () =>
    <MenuTrigger className="border-red" defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu>
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    </MenuTrigger>;

export const Style = () =>
    <MenuTrigger style={{ border: "1px solid red" }} defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu>
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    </MenuTrigger>;

Default.storyName = "default";
OpenWithItemsOnly.storyName = "open with items only";
OpenWithSections.storyName = "open with sections";
OpenWithDividers.storyName = "open with dividers";
OpenWithASelectedItem.storyName = "open with a selected item";
OpenWithMultipleSelectedItems.storyName = "open with multiple selected items";
DirectionBottom.storyName = "direction bottom";
DirectionTop.storyName = "direction top";
AlignStart.storyName = "align start";
AlignEnd.storyName = "align end";
IconButtonTrigger.storyName = "icon button trigger";
CustomTriggerWithDisclosureArrow.storyName = "custom trigger with disclosure arrow";
MenuTriggerCustomMenu.storyName = "custom menu";
FunctionalContent.storyName = "functional content";
StyledSystem.storyName = "styled system";
ClassName.storyName = "className";
Style.storyName = "style";
