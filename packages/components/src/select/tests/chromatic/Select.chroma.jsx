import { Inline, Stack } from "@components/layout";
// import { Popover, PopoverTrigger } from "@components/popover";
import { Select, useSelect } from "@components/select";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

import { Button } from "@components/button";
// import { Content } from "@components/placeholders";
import { Div } from "@components/html";
// import { Heading } from "@components/typography";
import { Item } from "@components/collection";
import { Listbox } from "@components/listbox";
import { Overlay } from "@components/overlay";
// import { TextInput } from "@components/text-input";
import { createTestSuite } from "./createTestSuite";

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

/*
Why a Popover doesn't need to use usePopupLightdismiss but a Select have to!?!?
    -> doesn't make sense
*/

/*
Why does a dialog trigger need a stopPropaggation but the others doesn't?!?!
*/

stories()
    // .add("test", () =>
    //     <>
    //         <Button>Before</Button>
    //         <Select placeholder="Select a planet" aria-label="Planets">
    //             <Item key="earth">Earth</Item>
    //             <Item key="mars">Mars</Item>
    //             <Item key="saturn">Saturn</Item>
    //         </Select>
    //         <Button>After</Button>
    //     </>
    // )
    // .add("test 2", () =>
    //     <Select placeholder="Select a planet" aria-label="Planets">
    //         <Item key="earth">Earth</Item>
    //         <Item key="mars">Mars</Item>
    //         <Item key="saturn">Saturn</Item>
    //     </Select>
    // )
    // // This one is weird, tabbing out from the textinput should close the popover.
    // .add("test 3", () =>
    //     <PopoverTrigger>
    //         <Button>Open</Button>
    //         <Popover>
    //             <Heading>Space News</Heading>
    //             <Content>
    //                 SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.
    //                 <TextInput />
    //             </Content>
    //         </Popover>
    //     </PopoverTrigger>
    // )
    // .add("test 4", () =>
    //     <PopoverTrigger>
    //         <Button>Open</Button>
    //         <Popover>
    //             <Heading>Space News</Heading>
    //             <Content>SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft.</Content>
    //         </Popover>
    //     </PopoverTrigger>
    // )
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
                        variant="secondary"
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

