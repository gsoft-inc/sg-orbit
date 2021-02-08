import { Button } from "@react-components/button";
import { Inline } from "@react-components/layout";
import { Item } from "@react-components/placeholders";
import { Listbox } from "@react-components/listbox";
import { Overlay } from "@react-components/overlay";
import { Select, useSelect } from "@react-components/select";
import { createTestSuite } from "./createTestSuite";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

/*
- MIGHT WANT TO DEFER SOME TESTS TO SOME SPECIFIC UTILITIES LIKE:
    - useRestoreFocus
    - All list test to the listbox component

INTERACTION TEST:
- on trigger click
    - if close & no selection, open and focus first
    - if close & selection, open and focus selected item
    - if open, close
- when close, on space keydown
- when close, on enter keydown
    - for both, open and select first item
- when close, on arrow down keydown
    - if no selection, open and focus first item
    - if selection, open and focus selection item
- when close, on arrow up keydown
    - if no selection, open and focus last item
    - if selection, open and focus selection item
- close on esc keydown
- close on blur
- on select an item
    - update selected value
    - close menu and focus trigger
- when open, on tab keydown
    - select next tabbable element
    - when shift, select previous tabbable element
- when hover an item
    - focus the item
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
            .chromaticPauseAnimationAtEnd()
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

createTestSuite(<Select variant="ghost" />, stories("/ghost"));

stories()
    .add("custom select", () => {
        function CustomSelect({
            open,
            placeholder,
            "aria-label": ariaLabel,
            children,
            ...rest
        }) {
            const { selectedItem, triggerProps, overlayProps, listboxProps } = useSelect(children, {
                open,
                ariaLabel
            });

            return (
                <>
                    <Button
                        {...rest}
                        {...triggerProps}
                    >
                        {selectedItem?.content ?? placeholder}
                    </Button>
                    <Overlay {...overlayProps}>
                        <Listbox {...listboxProps} />
                    </Overlay>
                </>
            );
        }

        return (
            <Inline>
                <CustomSelect placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </CustomSelect>
                <CustomSelect open placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </CustomSelect>
            </Inline>
        );
    })
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
