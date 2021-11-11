import { Div } from "@components/html";
import { Inline } from "@components/layout";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Inline")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Inline>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
    .add("reverse", () =>
        <Inline reverse>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
    .add("align X start", () =>
        <Inline alignX="start">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
    .add("align X center", () =>
        <Inline alignX="center">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
    .add("align X end", () =>
        <Inline alignX="end">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
    .add("align Y start", () =>
        <Inline alignY="start" height={10}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
    .add("align Y center", () =>
        <Inline alignY="center" height={10}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
    .add("align Y end", () =>
        <Inline alignY="end" height={10}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
    .add("wrap", () =>
        <Inline width={4}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
    .add("nowrap", () =>
        <Inline wrap={false} width={4}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Inline>
    )
    .add("inline", () =>
        <>
            <Inline inline>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Inline>
            <Inline inline>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Inline>
        </>
    )
    .add("nested", () =>
        <Inline gap={8}>
            <Inline gap={1}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Inline>
            <Inline gap={12}>
                <Div backgroundColor="alert-5">Delta</Div>
                <Div backgroundColor="alert-5">Echo</Div>
                <Div backgroundColor="alert-5">Foxtrot</Div>
            </Inline>
        </Inline>
    );
