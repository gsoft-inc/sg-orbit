import { Inline } from "@react-components/layout";
import { ListItem, OrderedList, UnorderedList } from "@react-components/list";
import { createChromaticSection, storiesOfBuilder } from "@utils";

function stories() {
    return storiesOfBuilder(module, createChromaticSection("List"))
        .build();
}

stories()
    .add("ordered", () =>
        <Inline verticalAlign="end">
            <OrderedList size="sm">
                <ListItem>Celestial</ListItem>
                <ListItem>Dark matter</ListItem>
                <ListItem>Eclipse</ListItem>
            </OrderedList>
            <OrderedList>
                <ListItem>Celestial</ListItem>
                <ListItem>Dark matter</ListItem>
                <ListItem>Eclipse</ListItem>
            </OrderedList>
            <OrderedList size="lg">
                <ListItem>Celestial</ListItem>
                <ListItem>Dark matter</ListItem>
                <ListItem>Eclipse</ListItem>
            </OrderedList>
        </Inline>

    )
    .add("unordered", () =>
        <Inline verticalAlign="end">
            <UnorderedList size="sm">
                <ListItem>Celestial</ListItem>
                <ListItem>Dark matter</ListItem>
                <ListItem>Eclipse</ListItem>
            </UnorderedList>
            <UnorderedList>
                <ListItem>Celestial</ListItem>
                <ListItem>Dark matter</ListItem>
                <ListItem>Eclipse</ListItem>
            </UnorderedList>
            <UnorderedList size="lg">
                <ListItem>Celestial</ListItem>
                <ListItem>Dark matter</ListItem>
                <ListItem>Eclipse</ListItem>
            </UnorderedList>
        </Inline>
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
