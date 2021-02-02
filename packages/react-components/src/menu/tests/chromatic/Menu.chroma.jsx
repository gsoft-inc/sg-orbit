import { Button } from "@react-components/button";
import { Divider } from "@react-components/divider";
import { Item, Section } from "@react-components/placeholders";
import { Menu, MenuTrigger } from "@react-components/menu";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Menu")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

/*
TODO:
    - aria-labels on Menu or MenuTrigger?
    - orientation
    - aria-label | aria-labelledby
    - keyboard nav
*/

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
    .add("open with items only", () =>
        <MenuTrigger defaultOpen>
            <Button>Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Menu>
        </MenuTrigger>
    )
    .add("open with sections", () =>
        <MenuTrigger defaultOpen>
            <Button>Trigger</Button>
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
    .add("open with dividers", () =>
        <MenuTrigger defaultOpen>
            <Button>Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Divider />
                <Item key="saturn">Saturn</Item>
                <Item key="jupiter">Jupiter</Item>
                <Divider />
                <Item key="mercury">Mercury</Item>
                <Item key="neptune">Neptune</Item>
                <Item key="uranus">Uranus</Item>
            </Menu>
        </MenuTrigger>
    )
    .add("open with mixed sections and items", () =>
        <MenuTrigger defaultOpen>
            <Button>Trigger</Button>
            <Menu>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
                <Section title="Not Visited">
                    <Item key="jupiter">Jupiter</Item>
                    <Item key="mercury">Mercury</Item>
                    <Item key="neptune">Neptune</Item>
                    <Item key="uranus">Uranus</Item>
                </Section>
            </Menu>
        </MenuTrigger>
    )
    // .add("item wit start icon", () =>
    // )
    .add("scrolling", () =>
        <MenuTrigger defaultOpen>
            <Button>Trigger</Button>
            <Menu>
                <Item key="ceres">Ceres</Item>
                <Item key="charon">Charon</Item>
                <Item key="earth">Earth</Item>
                <Item key="eris">Eris</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="haumea">Haumea</Item>
                <Item key="makemake">Makemake</Item>
                <Item key="mars">Mars</Item>
                <Item key="mercury">Mercury</Item>
                <Item key="neptune">Neptune</Item>
                <Item key="pluto">Pluto</Item>
                <Item key="saturn">Saturn</Item>
                <Item key="uranus">Uranus</Item>
                <Item key="venus">Venus</Item>
            </Menu>
        </MenuTrigger>
    );

