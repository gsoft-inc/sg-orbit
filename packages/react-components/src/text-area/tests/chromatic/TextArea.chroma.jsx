import { CrossButton } from "@react-components/button";
import { Div } from "@react-components/html";
import { Inline, Stack } from "@react-components/layout";
import { TextArea } from "@react-components/text-area";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/TextArea")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <TextArea aria-label="Label" />
            <TextArea loading aria-label="Label" />
            <TextArea disabled aria-label="Label" />
            <TextArea readOnly aria-label="Label" />
            <TextArea fluid aria-label="Label"></TextArea>
            <Div width="10%">
                <TextArea fluid aria-label="Label"></TextArea>
            </Div>
            <TextArea loading fluid aria-label="Label"></TextArea>
        </Stack>
    )
    .add("placeholder", () =>
        <Stack>
            <TextArea placeholder="Where to?" />
            <TextArea loading placeholder="Where to?" />
            <TextArea disabled placeholder="Where to?" />
            <TextArea readOnly placeholder="Where to?" />
            <TextArea fluid placeholder="Where to?"></TextArea>
            <Div width="10%">
                <TextArea fluid placeholder="Where to?"></TextArea>
            </Div>
            <TextArea loading fluid placeholder="Where to?"></TextArea>
        </Stack>
    )
    .add("value", () =>
        <Stack>
            <TextArea defaultValue="SpaceX will win the race!" aria-label="Label" />
            <TextArea loading defaultValue="SpaceX will win the race!" aria-label="Label" />
            <TextArea disabled defaultValue="SpaceX will win the race!" aria-label="Label" />
            <TextArea readOnly defaultValue="SpaceX will win the race!" aria-label="Label" />
            <Inline>
                <TextArea defaultValue="SpaceX will win the race!" aria-label="Label" />
                <TextArea value="SpaceX will win the race!" aria-label="Label" />
            </Inline>
            <TextArea fluid defaultValue="SpaceX will win the race!" aria-label="Label"></TextArea>
            <div width="10%">
                <TextArea fluid defaultValue="SpaceX will win the race!" aria-label="Label"></TextArea>
            </div>
            <TextArea loading fluid defaultValue="SpaceX will win the race!" aria-label="Label"></TextArea>
        </Stack>
    )
    .add("button", () =>
        <Stack>
            <TextArea button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
            <TextArea button={<CrossButton aria-label="Clear value" />} defaultValue="SpaceX will win the race!" aria-label="Label" />
            <TextArea disabled button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
            <TextArea readOnly button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
            <TextArea loading button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
        </Stack>
    )
    .add("validation", () =>
        <Inline>
            <TextArea validationState="invalid" placeholder="Where to?" />
            <TextArea validationState="valid" placeholder="Where to?" />
        </Inline>
    )
    .add("states", () =>
        <Stack>
            <Inline alignY="end">
                <TextArea loading placeholder="Where to?" />
                <TextArea disabled placeholder="Where to?" />
                <TextArea readOnly placeholder="Where to?" />
            </Inline>
            <Inline alignY="end">
                <TextArea active placeholder="Where to?" />
                <TextArea loading active placeholder="Where to?" />
                <TextArea disabled active placeholder="Where to?" />
            </Inline>
            <Inline alignY="end">
                <TextArea focus placeholder="Where to?" />
                <TextArea loading focus placeholder="Where to?" />
                <TextArea disabled focus placeholder="Where to?" />
            </Inline>
            <Inline alignY="end">
                <TextArea hover placeholder="Where to?" />
                <TextArea loading hover placeholder="Where to?" />
                <TextArea disabled hover placeholder="Where to?" />
            </Inline>
            <Inline alignY="end">
                <TextArea focus hover placeholder="Where to?" />
                <TextArea loading focus hover placeholder="Where to?" />
                <TextArea disabled focus hover placeholder="Where to?" />
            </Inline>
        </Stack>
    )
    .add("autosize", () =>
        <Inline alignX="start">
            <TextArea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a eros nec urna mollis sollicitudin id et lacus. Nam in feugiat urna, eget volutpat sem. Duis ornare, eros nec accumsan consectetur, nunc nisi elementum quam, egestas posuere elit purus a neque. Nunc risus mi, interdum id nisl et, tempor pulvinar elit." aria-label="Label" />
            <TextArea maxRows={5} defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a eros nec urna mollis sollicitudin id et lacus. Nam in feugiat urna, eget volutpat sem. Duis ornare, eros nec accumsan consectetur, nunc nisi elementum quam, egestas posuere elit purus a neque. Nunc risus mi, interdum id nisl et, tempor pulvinar elit." aria-label="Label" />
        </Inline>
    )
    .add("no resize", () =>
        <TextArea resize="none" aria-label="Label" />
    )
    .add("rows", () =>
        <TextArea rows={12} aria-label="Label" />
    )
    .add("styling", () =>
        <Inline>
            <TextArea className="bg-red" aria-label="Label" />
            <TextArea style={{ backgroundColor: "red" }} aria-label="Label" />
            <TextArea wrapperProps={{ className: "border-red" }} aria-label="Label" />
            <TextArea wrapperProps={{ style: { border: "1px solid red" } }} aria-label="Label" />
        </Inline>
    );
