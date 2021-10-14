import { Div } from "@react-components/html";
import { Stack } from "@react-components/layout";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Stack")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Stack>
    )
    .add("reverse", () =>
        <Stack reverse>
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Stack>
    )
    .add("align X start", () =>
        <Stack alignX="start">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Stack>
    )
    .add("align X center", () =>
        <Stack alignX="center">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Stack>
    )
    .add("align X end", () =>
        <Stack alignX="end">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Stack>
    )
    .add("align Y start", () =>
        <Stack alignY="start" height="200px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Stack>
    )
    .add("align Y center", () =>
        <Stack alignY="center" height="200px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Stack>
    )
    .add("align Y end", () =>
        <Stack alignY="end" height="200px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Stack>
    )
    .add("wrap", () =>
        <Stack wrap="wrap" height="25px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Stack>
    )
    .add("inline", () =>
        <>
            <Stack inline>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Stack>
            <Stack inline>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Stack>
        </>
    )
    .add("nested", () =>
        <Stack gap={8}>
            <Stack gap={1}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Stack>
            <Stack gap={12}>
                <Div backgroundColor="beetle-5">Delta</Div>
                <Div backgroundColor="beetle-5">Echo</Div>
                <Div backgroundColor="beetle-5">Foxtrot</Div>
            </Stack>
        </Stack>
    );
