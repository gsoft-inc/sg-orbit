import { Counter } from "@react-components/counter";
import { Dot } from "@react-components/dot";
import { HelpIcon, LightbulbIcon, NotificationIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Item } from "@react-components/placeholders";
import { TagList } from "@react-components/tag";
import { Text } from "@react-components/text";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/TagList")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <TagList>
                <Item key="mercury">Mercury Program</Item>
                <Item key="gemini">Gemini Program</Item>
                <Item key="apollo">Apollo Program</Item>
            </TagList>
            <TagList size="sm">
                <Item key="mercury">Mercury Program</Item>
                <Item key="gemini">Gemini Program</Item>
                <Item key="apollo">Apollo Program</Item>
            </TagList>
        </Stack>
    )
    .add("item with an icon", () =>
        <TagList>
            <Item key="mercury">
                <LightbulbIcon />
                <Text>Mercury Program</Text>
            </Item>
            <Item key="gemini">
                <NotificationIcon />
                <Text>Gemini Program</Text>
            </Item>
            <Item key="apollo">
                <HelpIcon />
                <Text>Apollo Program</Text>
            </Item>
        </TagList>
    )
    .add("item with a dot", () =>
        <TagList>
            <Item key="mercury">
                <Dot />
                <Text>Mercury Program</Text>
            </Item>
            <Item key="gemini">
                <Dot />
                <Text>Gemini Program</Text>
            </Item>
            <Item key="apollo">
                <Dot />
                <Text>Apollo Program</Text>
            </Item>
        </TagList>
    )
    .add("item with a counter", () =>
        <TagList>
            <Item key="mercury">
                <Text>Mercury Program</Text>
                <Counter>60</Counter>
            </Item>
            <Item key="gemini">
                <Text>Gemini Program</Text>
                <Counter>60</Counter>
            </Item>
            <Item key="apollo">
                <Text>Apollo Program</Text>
                <Counter>60</Counter>
            </Item>
        </TagList>
    )
    .add("with clear button", () =>
        <Stack>
            <TagList onClear={() => {}}>
                <Item key="mercury">Mercury Program</Item>
                <Item key="gemini">Gemini Program</Item>
                <Item key="apollo">Apollo Program</Item>
            </TagList>
            <TagList size="sm" onClear={() => {}}>
                <Item key="mercury">Mercury Program</Item>
                <Item key="gemini">Gemini Program</Item>
                <Item key="apollo">Apollo Program</Item>
            </TagList>
        </Stack>
    )
    .add("with clear button & empty", () =>
        <TagList onClear={() => {}}>
        </TagList>
    )
    .add("readonly", () =>
        <Stack>
            <TagList readOnly>
                <Item key="mercury">Mercury Program</Item>
                <Item key="gemini">Gemini Program</Item>
                <Item key="apollo">Apollo Program</Item>
            </TagList>
            <TagList readOnly onClear={() => {}}>
                <Item key="mercury">Mercury Program</Item>
                <Item key="gemini">Gemini Program</Item>
                <Item key="apollo">Apollo Program</Item>
            </TagList>
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <TagList className="border-red">
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </TagList>
            <TagList style={{ border: "1px solid red" }}>
                <Item key="earth">Earth</Item>
                <Item key="jupiter">Jupiter</Item>
                <Item key="mars">Mars</Item>
            </TagList>
        </Inline>
    );
