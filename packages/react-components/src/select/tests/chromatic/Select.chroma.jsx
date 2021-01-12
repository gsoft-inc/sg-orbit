import { IconList, LightbulbIcon, NotificationIcon } from "@react-components/icons";
import { Inline, Stack } from "../../../layout";
import { Item } from "@react-components/placeholders";
import { Select } from "@react-components/select";
import { Text } from "@react-components/text";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Select")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Select placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="mars">Mars</Item>
            <Item key="saturn">Saturn</Item>
        </Select>
    )
    .add("item with left icon", () =>
        <Select placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">
                <NotificationIcon />
                <Text>Earth</Text>
            </Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">
                <IconList>
                    <LightbulbIcon />
                    <NotificationIcon />
                </IconList>
                <Text>Mars</Text>
            </Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Select>
    )
    .add("item with right icon", () =>
        <Select placeholder="Select a planet" aria-label="Planets">
            <Item key="earth">
                <Text>Earth</Text>
                <NotificationIcon slot="right-icon" />
            </Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">
                <Text>Mars</Text>
                <IconList slot="right-icon">
                    <LightbulbIcon />
                    <NotificationIcon />
                </IconList>
            </Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Select>
    )
    .add("item overflow", () =>
        <Select placeholder="Select a planet" aria-label="Planets">
            <Item>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Item>
            <Item>Jupiter</Item>
            <Item>Mars</Item>
        </Select>
    )
    .add("autoFocus", () =>
        <Select autoFocus placeholder="Select a planet" aria-label="Planets">
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
