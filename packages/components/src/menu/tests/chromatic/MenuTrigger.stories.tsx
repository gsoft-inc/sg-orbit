import { Button, IconButton } from "@components/button";
import { Item, Section } from "@components/collection";
import { Menu, MenuTrigger } from "@components/menu";
import { DisclosureArrow } from "@components/disclosure";
import { Divider } from "@components/divider";
import { HtmlButton, HtmlButtonProps } from "@components/html";
import { Text } from "@components/typography";
import { VerticalDotsIcon } from "@components/icons";
import { forwardRef } from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/MenuTrigger",
    component: MenuTrigger,
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
} as ComponentMeta<typeof MenuTrigger>;

type MenuTriggerStory = ComponentStoryObj<typeof MenuTrigger>;

export const Default: MenuTriggerStory = {
    storyName: "default",
    render: () => (
        <MenuTrigger>
            <Button variant="secondary">Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
};

export const OpenWithItemsOnly: MenuTriggerStory = {
    storyName: "open with items only",
    render: () => (
        <MenuTrigger defaultOpen>
            <Button variant="secondary">Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
};

export const OpenWithSections: MenuTriggerStory = {
    storyName: "open with sections",
    render: () => (
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
        </MenuTrigger>
    )
};

export const OpenWithDividers: MenuTriggerStory = {
    storyName: "open with dividers",
    render: () => (
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
        </MenuTrigger>
    )
};

export const OpenWithASelectedItem: MenuTriggerStory = {
    storyName: "open with a selected item",
    render: () => (
        <MenuTrigger defaultOpen>
            <Button variant="secondary">Trigger</Button>
            <Menu defaultSelectedKeys={["mars"]} selectionMode="single">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
};

export const OpenWithMultipleSelectedItems: MenuTriggerStory = {
    storyName: "open with multiple selected items",
    render: () => (
        <MenuTrigger defaultOpen>
            <Button variant="secondary">Trigger</Button>
            <Menu defaultSelectedKeys={["mars", "saturn"]} selectionMode="multiple">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
};

export const DirectionBottom: MenuTriggerStory = {
    storyName: "direction bottom",
    render: () => (
        <MenuTrigger direction="bottom" defaultOpen>
            <Button variant="secondary">Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
};

export const DirectionTop: MenuTriggerStory = {
    storyName: "direction top",
    decorators: [Story => <div style={{ marginTop: "100px" }}><Story /></div>],
    render: () => (
        <MenuTrigger direction="top" defaultOpen>
            <Button variant="secondary">Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
};

export const AlignStart: MenuTriggerStory = {
    storyName: "align start",
    decorators: [Story => <div style={{ paddingLeft: "200px" }}><Story /></div>],
    render: () => (
        <MenuTrigger align="start" allowFlip={false} allowPreventOverflow={false} defaultOpen>
            <Button variant="secondary">Trigger</Button>
            <Menu width={14}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
};

export const AlignEnd: MenuTriggerStory = {
    storyName: "align end",
    decorators: [Story => <div style={{ paddingLeft: "200px" }}><Story /></div>],
    render: () => (
        <MenuTrigger align="end" allowFlip={false} allowPreventOverflow={false} defaultOpen>
            <Button variant="secondary">Trigger</Button>
            <Menu width={14}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
};

export const IconButtonTrigger: MenuTriggerStory = {
    storyName: "icon button trigger",
    render: () => (
        <MenuTrigger defaultOpen>
            <IconButton variant="secondary" aria-label="Open menu">
                <VerticalDotsIcon />
            </IconButton>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
};

const CustomTrigger = forwardRef<any, Partial<HtmlButtonProps>>((props, ref) => {
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

export const CustomTriggerWithDisclosureArrow: MenuTriggerStory = {
    storyName: "custom trigger with disclosure arrow",
    render: () => (
        <MenuTrigger defaultOpen>
            <CustomTrigger />
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
};

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


export const MenuTriggerCustomMenu = () => (
    <MenuTrigger defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <CustomMenu>
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </CustomMenu>
    </MenuTrigger>
);

MenuTriggerCustomMenu.storyName = "custom menu";

export const FunctionalContent = () => (
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
    </MenuTrigger>
);

FunctionalContent.storyName = "functional content";

export const StyledSystem = () => (
    <MenuTrigger border="warning-7" defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu>
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    </MenuTrigger>
);

StyledSystem.storyName = "styled system";

export const ClassName = () => (
    <MenuTrigger className="border-red" defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu>
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    </MenuTrigger>
);

ClassName.storyName = "className";

export const Style = () => (
    <MenuTrigger style={{ border: "1px solid red" }} defaultOpen>
        <Button variant="secondary">Trigger</Button>
        <Menu>
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    </MenuTrigger>
);

Style.storyName = "style";
