import { Div } from "@react-components/html";
import { Inline } from "@react-components/layout";
import { storiesOfBuilder } from "@stories/utils";

////////////

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Inline")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Inline>
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Inline>
    )
    .add("reverse", () =>
        <Inline reverse>
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Inline>
    )
    .add("align X start", () =>
        <Inline alignX="start">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Inline>
    )
    .add("align X center", () =>
        <Inline alignX="center">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Inline>
    )
    .add("align X end", () =>
        <Inline alignX="end">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Inline>
    )
    .add("align Y start", () =>
        <Inline alignY="start" height="100px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Inline>
    )
    .add("align Y center", () =>
        <Inline alignY="center" height="100px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Inline>
    )
    .add("align Y end", () =>
        <Inline alignY="end" height="100px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Inline>
    )
    .add("wrap", () =>
        <Inline wrap="wrap" width="25px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Inline>
    )
    .add("wrap reverse", () =>
        <Inline wrap="wrap-reverse" width="25px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Inline>
    )
    .add("inline", () =>
        <>
            <Inline inline>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Inline>
            <Inline inline>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Inline>
        </>
    )
    .add("nested", () =>
        <Inline gap={8}>
            <Inline gap={1}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Inline>
            <Inline gap={12}>
                <Div backgroundColor="beetle-5">Delta</Div>
                <Div backgroundColor="beetle-5">Echo</Div>
                <Div backgroundColor="beetle-5">Foxtrot</Div>
            </Inline>
        </Inline>
    );
