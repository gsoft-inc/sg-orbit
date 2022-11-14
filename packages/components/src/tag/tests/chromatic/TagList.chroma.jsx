import { Counter } from "@components/counter";
import { Div } from "@components/html";
import { Dot } from "@components/dot";
import { HelpIcon, LightbulbIcon, NotificationIcon } from "@components/icons";
import { Inline, Stack } from "@components/layout";
import { Item } from "@components/collection";
import { TagList } from "@components/tag";
import { Text } from "@components/typography";

export default {
    title: "Chromatic/TagList",
    component: TagList
};

export const Default = () => (
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
);

Default.storyName = "default";

export const ItemWithIicon = () => (
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
);

ItemWithIicon.storyName = "item with an icon";

export const ItemWithDot = () => (
    <TagList>
        <Item key="mercury">
            <Dot color="alias-accent" />
            <Text>Mercury Program</Text>
        </Item>
        <Item key="gemini">
            <Dot color="alias-accent" />
            <Text>Gemini Program</Text>
        </Item>
        <Item key="apollo">
            <Dot color="alias-accent" />
            <Text>Apollo Program</Text>
        </Item>
    </TagList>
);

ItemWithDot.storyName = "item with a dot";

export const ItemWithCounter = () => (
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
);

ItemWithCounter.storyName = "item with a counter";

export const WithClearButton = () => (
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
);

WithClearButton.storyName = "with clear button";

export const WithClearButtonEmpty = () => (
    <TagList onClear={() => {}}>
    </TagList>
);

WithClearButtonEmpty.storyName = "with clear button & empty";

export const Readonly = () => (
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
);

Readonly.storyName = "readonly";

export const MultipleRows = () => (
    <Stack>
        <Div width={17}>
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
        </Div>
        <Div width={17}>
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
        </Div>
    </Stack>
);

MultipleRows.storyName = "multiple rows";

export const Styling = () => (
    <Inline>
        <TagList border="warning-7">
            <Item key="earth">Earth</Item>
            <Item border="warning-7" key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </TagList>
        <TagList className="border-red">
            <Item key="earth">Earth</Item>
            <Item className="border-red" key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </TagList>
        <TagList style={{ border: "1px solid red" }}>
            <Item key="earth">Earth</Item>
            <Item style={{ border: "1px solid red" }} key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </TagList>
    </Inline>
);

Styling.storyName = "styling";
