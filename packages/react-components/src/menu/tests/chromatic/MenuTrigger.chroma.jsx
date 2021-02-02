import { Button } from "@react-components/button";
import { Inline } from "@react-components/layout";
import { Item } from "@react-components/placeholders";
import { Menu, MenuTrigger } from "@react-components/menu";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

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
    .add("autofocus", () =>
        <MenuTrigger autoFocus defaultOpen>
            <Button>Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
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
        </MenuTrigger>
    )
    .add("align start", () =>
        <MenuTrigger align="start" allowFlip={false} allowPreventOverflow={false} defaultOpen>
            <Button>Trigger</Button>
            <Menu style={{ width: "500px" }}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
    .add("align end", () =>
        <MenuTrigger align="end" allowFlip={false} allowPreventOverflow={false} defaultOpen>
            <Button>Trigger</Button>
            <Menu style={{ width: "500px" }}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
    .add("styling", () =>
        <Inline>
            <MenuTrigger className="border-red" defaultOpen>
                <Button>Trigger</Button>
                <Menu>
                    <Item key="earth">Earth</Item>
                    <Item key="jupiter">Jupiter</Item>
                    <Item key="mars">Mars</Item>
                </Menu>
            </MenuTrigger>
            <MenuTrigger style={{ border: "1px solid red" }} defaultOpen>
                <Button>Trigger</Button>
                <Menu>
                    <Item key="earth">Earth</Item>
                    <Item key="jupiter">Jupiter</Item>
                    <Item key="mars">Mars</Item>
                </Menu>
            </MenuTrigger>
        </Inline>
    );
