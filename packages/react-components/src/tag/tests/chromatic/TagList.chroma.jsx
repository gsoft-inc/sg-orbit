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
                <Counter variant="divider">60</Counter>
            </Item>
            <Item key="gemini">
                <Text>Gemini Program</Text>
                <Counter variant="divider">60</Counter>
            </Item>
            <Item key="apollo">
                <Text>Apollo Program</Text>
                <Counter variant="divider">60</Counter>
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
    .add("multiple rows", () =>
        <Stack>
            <div style={{ width: "600px" }}>
                <TagList>
                    <Item key="mercury">Mercury Program</Item>
                    <Item key="gemini">Gemini Program</Item>
                    <Item key="apollo">Apollo Program</Item>
                    <Item key="skylab">Skylab</Item>
                    <Item key="soyuz">Apollo–Soyuz Test Project</Item>
                    <Item key="artemis">Artemis Program</Item>
                    <Item key="mercury-2">Mercury Program</Item>
                    <Item key="gemini-2">Gemini Program</Item>
                    <Item key="apollo-3">Apollo Program</Item>
                    <Item key="skylab-4">Skylab</Item>
                    <Item key="soyuz-5">Apollo–Soyuz Test Project</Item>
                    <Item key="artemis-6">Artemis Program</Item>
                </TagList>
            </div>
            <div style={{ width: "600px" }}>
                <TagList onClear={() => {}}>
                    <Item key="mercury">Mercury Program</Item>
                    <Item key="gemini">Gemini Program</Item>
                    <Item key="apollo">Apollo Program</Item>
                    <Item key="skylab">Skylab</Item>
                    <Item key="soyuz">Apollo–Soyuz Test Project</Item>
                    <Item key="artemis">Artemis Program</Item>
                    <Item key="mercury-2">Mercury Program</Item>
                    <Item key="gemini-2">Gemini Program</Item>
                    <Item key="apollo-2">Apollo Program</Item>
                    <Item key="skylab-2">Skylab</Item>
                    <Item key="soyuz-2">Apollo–Soyuz Test Project</Item>
                    <Item key="artemis-2">Artemis Program</Item>
                </TagList>
            </div>
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
