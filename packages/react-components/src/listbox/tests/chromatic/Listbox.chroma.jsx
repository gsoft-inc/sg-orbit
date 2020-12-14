import { Inline } from "@react-components/layout";
import { Item } from "@react-components/placeholders";
import { Listbox } from "@react-components/listbox";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Listbox")
        .segment(segment)
        .build();
}

stories()
    .add("only items", () =>
        <Listbox aria-label="Planets">
            <Item>Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Listbox>
    );
