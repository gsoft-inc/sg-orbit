import { Inline } from "@react-components/layout";
import { Item, Section } from "@react-components/placeholders";
import { NotificationIcon } from "@react-components/icons";
import { Text } from "@react-components/text";
import { cloneElement } from "react";
import { paramsBuilder } from "@stories/utils";

function Select({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Select placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        )
        .add("open with items only", () =>
            <Select defaultOpen placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        )
        .add("open with sections", () =>
            <Select defaultOpen placeholder="Select a planet" aria-label="Planets" element={element}>
                <Section title="Visited">
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Section>
                <Section title="Not Visited">
                    <Item key="jupiter">Jupiter</Item>
                    <Item key="mercury">Mercury</Item>
                    <Item key="neptune">Neptune</Item>
                    <Item key="uranus">Uranus</Item>
                </Section>
            </Select>
        )
        .add("selected key", () =>
            <Select defaultSelectedKey="mars" placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        )
        .add("selected item with left icon", () =>
            <Select defaultSelectedKey="earth" placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">
                    <NotificationIcon />
                    <Text>Earth</Text>
                </Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        )
        .add("selected item with right icon", () =>
            <Select defaultSelectedKey="earth" placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">
                    <Text>Earth</Text>
                    <NotificationIcon slot="right-icon" />
                </Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        )
        .add("selected item with description", () =>
            <Select defaultSelectedKey="earth" placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">
                    <Text>Earth</Text>
                    <Text slot="description">Home sweet home!</Text>
                </Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        )
        .add("selected item with overflow value", () =>
            <Select defaultSelectedKey="earth" placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        )
        .add("fluid", () =>
            <Select fluid placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        )
        .add("validation", () =>
            <Inline>
                <Select validationState="invalid" placeholder="Select a planet" aria-label="Planets" element={element}>
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
                <Select validationState="valid" placeholder="Select a planet" aria-label="Planets" element={element}>
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
            </Inline>
        )
        .add("autofocus trigger", () =>
            <Select autoFocus placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        )
        .add("autofocus with default open", () =>
            <Select autoFocus defaultOpen placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        )
        .add("trigger states", () =>
            <Inline>
                <Select active placeholder="Select a planet" aria-label="Planets" element={element}>
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
                <Select focus placeholder="Select a planet" aria-label="Planets" element={element}>
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
                <Select hover placeholder="Select a planet" aria-label="Planets" element={element}>
                    <Item key="earth">Earth</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
                <Select disabled placeholder="Select a planet" aria-label="Planets" element={element}>
                    <Item key="earth">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Item>
                    <Item key="mars">Mars</Item>
                    <Item key="saturn">Saturn</Item>
                </Select>
            </Inline>
        )
        .add("position start bottom", () =>
            <Select align="start" direction="bottom" fluid defaultOpen placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        )
        .add("position end bottom", () =>
            <Select align="end" direction="bottom" fluid defaultOpen placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        )
        .add("position start top", () =>
            <Select align="start" direction="top" fluid defaultOpen placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>,
             {
                 ...paramsBuilder()
                     .canvasLayout({ marginTop: "100px" })
                     .build()
             }
        )
        .add("position end top", () =>
            <Select align="end" direction="top" fluid defaultOpen placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>,
             {
                 ...paramsBuilder()
                     .canvasLayout({ marginTop: "100px" })
                     .build()
             }
        )
        .add("as div", () =>
            <Select as="div" placeholder="Select a planet" aria-label="Planets" element={element}>
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
        );
}
