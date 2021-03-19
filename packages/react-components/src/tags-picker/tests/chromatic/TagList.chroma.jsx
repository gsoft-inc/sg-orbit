import { Inline, Stack } from "@react-components/layout";
import { Item, Section } from "@react-components/placeholders";
import { TagList } from "@react-components/tags-picker";
import { Text } from "@react-components/text";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

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
    .add("empty", () =>
        <TagList></TagList>
    );
