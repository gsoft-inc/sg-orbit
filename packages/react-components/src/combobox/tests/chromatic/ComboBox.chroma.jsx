import { ComboBox } from "@react-components/combobox";
import { Item } from "@react-components/placeholders";
import { NotificationIcon } from "@react-components/icons";
import { Text } from "@react-components/text";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ComboBox")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

/*
TODO:
- static items
- dynamic items
- remote items (maybe not for chromatic)
*/

stories()
    .add("default", () =>
        <ComboBox placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="uranus">Uranus</Item>
        </ComboBox>
    )
    .add("selected item with start icon", () =>
        <ComboBox placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">
                <NotificationIcon />
                <Text>Earth</Text>
            </Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </ComboBox>
    );
