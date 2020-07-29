import { Button } from "@react-components/button";
import { CrossIcon, MagnifierIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { TextInput } from "@react-components/text-input2";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("TextInput2"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

/*
outline
error
transparent
*/

/*
default
value
icon
button
states
styling
*/

stories()
    .add("default", () =>
        <Stack>
            <Inline>
                <TextInput size="small" />
                <TextInput />
                <TextInput size="large" />
            </Inline>
            <Inline>
                <TextInput size="small" placeholder="Where to?" />
                <TextInput placeholder="Where to?" />
                <TextInput size="large" placeholder="Where to?" />
            </Inline>
        </Stack>
    );
