import { Button, IconButton } from "@react-components/button";
import { DisclosureArrow } from "@react-components/disclosure";
import { Item } from "@react-components/collection";
import { Menu, MenuTrigger } from "@react-components/menu";
import { Text } from "@react-components/text";
import { VerticalDotsIcon } from "@react-components/icons";
import { forwardRef } from "react";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

/*
INTERACTION TEST:
- on trigger click
    - if close & no selection, open and focus first
    - if open, close
- when close, on space keydown
- when close, on enter keydown
    - for both, open and select first item
- when close, on arrow down keydown
    - open and focus first item
- when close, on arrow up keydown
    - open and focus last item
- close on esc keydown
- close on blur
- on select an item
    - close menu and focus trigger
- when open, on tab keydown
    - select next tabbable element
    - when shift, select previous tabbable element
- can provide custom name
- can provide custom id
- do not close on select when closeOnSelect is false
*/

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/MenuTrigger")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

stories()
    .add("default", () =>
        <MenuTrigger>
            <Button>Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
    .add("open", () =>
        <MenuTrigger defaultOpen>
            <Button>Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
    .add("direction bottom", () =>
        <MenuTrigger direction="bottom" defaultOpen>
            <Button>Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
    .add("direction top", () =>
        <MenuTrigger direction="top" defaultOpen>
            <Button>Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>,
         {
             ...paramsBuilder()
                 .canvasLayout({ marginTop: "100px" })
                 .build()
         }
    )
    .add("align start", () =>
        <MenuTrigger align="start" allowFlip={false} allowPreventOverflow={false} defaultOpen>
            <Button>Trigger</Button>
            <Menu style={{ width: "300px" }}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>,
         {
             ...paramsBuilder()
                 .canvasLayout({ paddingLeft: "200px" })
                 .build()
         }
    )
    .add("align end", () =>
        <MenuTrigger align="end" allowFlip={false} allowPreventOverflow={false} defaultOpen>
            <Button>Trigger</Button>
            <Menu style={{ width: "300px" }}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>,
         {
             ...paramsBuilder()
                 .canvasLayout({ paddingLeft: "200px" })
                 .build()
         }
    )
    .add("icon button trigger", () =>
        <MenuTrigger defaultOpen>
            <IconButton aria-label="Open menu">
                <VerticalDotsIcon />
            </IconButton>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
    .add("custom trigger with disclosure arrow", () => {
        const CustomTrigger = forwardRef((props, ref) => {
            return (
                <button
                    {...props}
                    type="button"
                    style={{
                        display: "flex",
                        alignItems: "center"
                    }}
                    ref={ref}
                >
                    <Text>Trigger</Text>
                    <DisclosureArrow />
                </button>
            );
        });

        return (
            <MenuTrigger defaultOpen>
                <CustomTrigger />
                <Menu>
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Menu>
            </MenuTrigger>
        );
    })
    .add("custom menu", () => {
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

        return (
            <MenuTrigger defaultOpen>
                <Button>Trigger</Button>
                <CustomMenu>
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </CustomMenu>
            </MenuTrigger>
        );
    })
    .add("className", () =>
        <MenuTrigger className="border-red" defaultOpen>
            <Button>Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </Menu>
        </MenuTrigger>
    )
    .add("style", () =>
        <MenuTrigger style={{ border: "1px solid red" }} defaultOpen>
            <Button>Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </Menu>
        </MenuTrigger>
    );
