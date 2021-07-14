import { Inline } from "@react-components/layout";
import { ListItem, OrderedList, UnorderedList } from "@react-components/list";
import { Text } from "@react-components/typography";
import { storiesOfBuilder } from "@stories/utils";

function stories() {
    return storiesOfBuilder(module, "Chromatic/List")
        .build();
}

stories()
    .add("ordered", () =>
        <OrderedList>
            <ListItem>Celestial</ListItem>
            <ListItem>Dark matter</ListItem>
            <ListItem>Eclipse</ListItem>
        </OrderedList>
    )
    .add("unordered", () =>
        <UnorderedList>
            <ListItem>Celestial</ListItem>
            <ListItem>Dark matter</ListItem>
            <ListItem>Eclipse</ListItem>
        </UnorderedList>
    )
    .add("inherit", () =>
        <Text size="lg">
            <Inline>
                <OrderedList size="inherit">
                    <ListItem>Celestial</ListItem>
                    <ListItem>Dark matter</ListItem>
                    <ListItem>Eclipse</ListItem>
                </OrderedList>
                <UnorderedList size="inherit">
                    <ListItem>Celestial</ListItem>
                    <ListItem>Dark matter</ListItem>
                    <ListItem>Eclipse</ListItem>
                </UnorderedList>
            </Inline>
        </Text>
    )
    .add("styling", () =>
        <Inline>
            <OrderedList className="bg-red">
                <ListItem>Celestial</ListItem>
                <ListItem>Dark matter</ListItem>
                <ListItem>Eclipse</ListItem>
            </OrderedList>
            <UnorderedList style={{ backgroundColor: "red" }}>
                <ListItem>Celestial</ListItem>
                <ListItem>Dark matter</ListItem>
                <ListItem>Eclipse</ListItem>
            </UnorderedList>
        </Inline>
    );
