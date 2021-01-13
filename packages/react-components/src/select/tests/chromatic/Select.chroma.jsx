import { Inline, Stack } from "@react-components/layout";
import { Item } from "@react-components/placeholders";
import { Paragraph } from "@react-components/paragraph";
import { Select } from "@react-components/select";
import { createTestSuite } from "./createTestSuite";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

/*
- MIGHT WANT TO DEFER SOME TESTS TO SOME SPECIFIC UTILITIES LIKE:
    - useRestoreFocus
    - All list test to the listbox component

INTERACTION TEST:
- on click
    - if no selection, open and select first item
    - if selection, open and focus selected item
    - if open, close
- open on space
- open on enter
- when close, on arrow down
    - if no selection, open and focus first item
    - if selection, open and focus selection item
- when close, on arrow up
    - if no selection, open and focus last item
    - if selection, open and focus selection item
- close on esc
- close on blur
- on select item
    - update selected value
    - close menu and focus trigger
- when open on tab
    - select next tabbable element
    - when shift, select previous tabbable element
- can provide custom name
- can provide custom id
- when in field, focus when clicking on label
- aria props (aria-expanded, aria-controls, aria-labelledby, ...)
- calling .focus on the select ref will focus the select.
*/

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Select")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

createTestSuite(<Select variant="outline" />, stories("/outline"))
    .add("without placeholder", () =>
        <Select aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    );

createTestSuite(<Select variant="transparent" />, stories("/transparent"));

createTestSuite(<Select variant="inline" />, stories("/inline"))
    .add("in a block", () => {
        function InlineSelect() {
            return (
                <Select variant="inline" placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
            );
        }

        return (
            <Stack>
                <Paragraph size="sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect />elementum viverra maximus.</Paragraph>
                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect />elementum viverra maximus.</Paragraph>
                <Paragraph size="lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect />elementum viverra maximus.</Paragraph>
                <Paragraph size="xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect />elementum viverra maximus.</Paragraph>
                <Paragraph size="2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect />elementum viverra maximus.</Paragraph>
            </Stack>
        );
    });

stories()
    .add("with name", () =>
        <Select name="planet" placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    )
    .add("styling", () =>
        <Inline>
            <Select className="border-red" placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </Select>
            <Select style={{ border: "1px solid red" }} placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </Select>
        </Inline>
    );
