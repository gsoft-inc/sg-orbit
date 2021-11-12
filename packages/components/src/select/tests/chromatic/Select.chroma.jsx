import { Button } from "@components/button";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { Item } from "@components/collection";
import { Listbox } from "@components/listbox";
import { Overlay } from "@components/overlay";
import { Select, useSelect } from "@components/select";
import { createTestSuite } from "./createTestSuite";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

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
    .add("conditional rendering", () =>
        <Select defaultOpen placeholder="Select a planet" aria-label="Planets">
            {false && <Item key="earth">Earth</Item>}
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    )
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
                        tone="basic"
                        variant="outline"
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
    .add("name", () =>
        <Select name="planet" placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    )
    .add("zoom", () =>
        <Stack>
            <Div className="zoom-in">
                <Select placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
            </Div>
            <Div className="zoom-out">
                <Select placeholder="Select a planet" aria-label="Planets">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
            </Div>
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <Select border="warning-7" placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </Select>
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

