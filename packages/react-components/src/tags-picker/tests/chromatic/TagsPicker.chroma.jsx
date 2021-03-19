import { GearIcon, GroupIcon, LightbulbIcon, MagnifierIcon, NotificationIcon, WarningIcon } from "@react-components/icons";
import { Item, Section } from "@react-components/placeholders";
import { TagsPicker } from "@react-components/tags-picker";
import { Text } from "@react-components/text";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/TagsPicker")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

stories()
    .add("only items", () =>
        <TagsPicker>
            <Item key="mercury">Mercury Program</Item>
            <Item key="gemini">Gemini Program</Item>
            <Item key="apollo">Apollo Program</Item>
            <Item key="skylab">Skylab</Item>
            <Item key="soyuz">Apollo–Soyuz Test Project</Item>
            <Item key="artemis">Artemis Program</Item>
        </TagsPicker>
    )
    .add("without keys", () =>
        <TagsPicker>
            <Item>Mercury Program</Item>
            <Item>Gemini Program</Item>
            <Item>Apollo Program</Item>
            <Item>Skylab</Item>
            <Item>Apollo–Soyuz Test Project</Item>
            <Item>Artemis Program</Item>
        </TagsPicker>
    )
    .add("sections", () =>
        <TagsPicker>
            <Section title="1950">
                <Item key="mercury">Mercury Program</Item>
            </Section>
            <Section title="1960">
                <Item key="gemini">Gemini Program</Item>
            </Section>
            <Section title="1970">
                <Item key="apollo">Apollo Program</Item>
                <Item key="skylab">Skylab</Item>
                <Item key="soyuz">Apollo–Soyuz Test Project</Item>
            </Section>
            <Section title="1980">
                <Item key="artemis">Artemis Program</Item>
            </Section>
        </TagsPicker>
    )
    .add("item with start icon", () =>
        <TagsPicker>
            <Section title="1950">
                <Item key="mercury">
                    <GearIcon />
                    <Text>Mercury Program</Text>
                </Item>
            </Section>
            <Section title="1960">
                <Item key="gemini">
                    <GroupIcon />
                    <Text>Gemini Program</Text>
                </Item>
            </Section>
            <Section title="1970">
                <Item key="apollo">
                    <LightbulbIcon />
                    <Text>Apollo Program</Text>
                </Item>
                <Item key="skylab">
                    <MagnifierIcon />
                    <Text>Skylab</Text>
                </Item>
                <Item key="soyuz">
                    <NotificationIcon />
                    <Text>Apollo–Soyuz Test Project</Text>
                </Item>
            </Section>
            <Section title="1980">
                <Item key="artemis">
                    <WarningIcon />
                    <Text>Artemis Program</Text>
                </Item>
            </Section>
        </TagsPicker>
    );
