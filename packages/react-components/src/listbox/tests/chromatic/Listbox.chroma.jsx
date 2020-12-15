import { Item, Section } from "@react-components/placeholders";
import { Listbox } from "@react-components/listbox";
import { storiesOfBuilder } from "@stories/utils";

/*
CHROMATIC:
    - render props
    - custom item component
    - states
    - multiple / single
*/

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Listbox")
        .segment(segment)
        .build();
}

stories()
    .add("only items", () =>
        <Listbox aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Listbox>
    )
    .add("without keys", () =>
        <Listbox aria-label="Planets">
            <Item>Earth</Item>
            <Item>Jupiter</Item>
            <Item>Mars</Item>
            <Item>Mercury</Item>
            <Item>Neptune</Item>
            <Item>Saturn</Item>
            <Item>Uranus</Item>
        </Listbox>
    )
    .add("sections", () =>
        <Listbox aria-label="Planets">
            <Section title="Visited">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Section>
            <Section title="Not Visited">
                <Item>Jupiter</Item>
                <Item>Mercury</Item>
                <Item>Neptune</Item>
                <Item>Uranus</Item>
            </Section>
        </Listbox>
    )
    .add("mixed sections and items", () =>
        <Listbox aria-label="Planets">
            <Item>Earth</Item>
            <Item>Mars</Item>
            <Item>Saturn</Item>
            <Section title="Not Visited">
                <Item>Jupiter</Item>
                <Item>Mercury</Item>
                <Item>Neptune</Item>
                <Item>Uranus</Item>
            </Section>

        </Listbox>
    );
