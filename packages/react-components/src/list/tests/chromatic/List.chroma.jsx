import { Inline } from "@react-components/layout";
import { Item } from "@react-components/collection";
import { OrderedList, UnorderedList } from "@react-components/list";
import { Text } from "@react-components/typography";
import { storiesOfBuilder } from "@stories/utils";

function stories() {
    return storiesOfBuilder(module, "Chromatic/List")
        .build();
}

stories()
    .add("ordered", () =>
        <OrderedList>
            <Item>Celestial</Item>
            <Item>Dark matter</Item>
            <Item>Eclipse</Item>
        </OrderedList>
    )
    .add("unordered", () =>
        <UnorderedList>
            <Item>Celestial</Item>
            <Item>Dark matter</Item>
            <Item>Eclipse</Item>
        </UnorderedList>
    )
    .add("inherit", () =>
        <Text size="lg">
            <Inline>
                <OrderedList size="inherit">
                    <Item>Celestial</Item>
                    <Item>Dark matter</Item>
                    <Item>Eclipse</Item>
                </OrderedList>
                <UnorderedList size="inherit">
                    <Item>Celestial</Item>
                    <Item>Dark matter</Item>
                    <Item>Eclipse</Item>
                </UnorderedList>
            </Inline>
        </Text>
    )
    .add("styling", () =>
        <Inline>
            <OrderedList className="bg-red">
                <Item>Celestial</Item>
                <Item>Dark matter</Item>
                <Item>Eclipse</Item>
            </OrderedList>
            <UnorderedList style={{ backgroundColor: "red" }}>
                <Item>Celestial</Item>
                <Item>Dark matter</Item>
                <Item>Eclipse</Item>
            </UnorderedList>
        </Inline>
    );
