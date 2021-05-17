import { CrossButton } from "@react-components/button";
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
            <TextArea />
            <TextArea loading />
            <TextArea disabled />
            <TextArea readOnly />
            <div>
                <TextArea fluid></TextArea>
            </div>
            <div className="w-10">
                <TextArea fluid></TextArea>
            </div>
            <div>
                <TextArea loading fluid></TextArea>
            </div>
        </Stack>
    )
    .add("placeholder", () =>
        <Stack>
            <TextArea placeholder="Where to?" />
            <TextArea loading placeholder="Where to?" />
            <TextArea disabled placeholder="Where to?" />
            <TextArea readOnly placeholder="Where to?" />
            <div>
                <TextArea fluid placeholder="Where to?"></TextArea>
            </div>
            <div className="w-10">
                <TextArea fluid placeholder="Where to?"></TextArea>
            </div>
            <div>
                <TextArea loading fluid placeholder="Where to?"></TextArea>
            </div>
        </Stack>
    )
    .add("value", () =>
        <Stack>
            <TextArea defaultValue="SpaceX will win the race!" />
            <TextArea loading defaultValue="SpaceX will win the race!" />
            <TextArea disabled defaultValue="SpaceX will win the race!" />
            <TextArea readOnly defaultValue="SpaceX will win the race!" />
            <Inline>
                <TextArea defaultValue="SpaceX will win the race!" />
                <TextArea value="SpaceX will win the race!" />
            </Inline>
            <div>
                <TextArea fluid defaultValue="SpaceX will win the race!"></TextArea>
            </div>
            <div className="w-10">
                <TextArea fluid defaultValue="SpaceX will win the race!"></TextArea>
            </div>
            <div>
                <TextArea loading fluid defaultValue="SpaceX will win the race!"></TextArea>
            </div>
        </Stack>
    )
    .add("button", () =>
        <Stack>
            <TextArea button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
            <TextArea button={<CrossButton aria-label="Clear value" />} defaultValue="SpaceX will win the race!" />
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
            <Inline verticalAlign="end">
                <TextArea active placeholder="Where to?" />
                <TextArea loading active placeholder="Where to?" />
            </Inline>
            <Inline verticalAlign="end">
                <TextArea focus placeholder="Where to?" />
                <TextArea loading focus placeholder="Where to?" />
            </Inline>
            <Inline verticalAlign="end">
                <TextArea hover placeholder="Where to?" />
                <TextArea loading hover placeholder="Where to?" />
            </Inline>
            <Inline verticalAlign="end">
                <TextArea focus hover placeholder="Where to?" />
                <TextArea loading focus hover placeholder="Where to?" />
            </Inline>
            <div>
                <TextArea disabled placeholder="Where to?" />
            </div>
            <div>
                <TextArea readOnly placeholder="Where to?" />
            </div>
        </Stack>
    )
    .add("autosize", () =>
        <Inline align="start">
            <TextArea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a eros nec urna mollis sollicitudin id et lacus. Nam in feugiat urna, eget volutpat sem. Duis ornare, eros nec accumsan consectetur, nunc nisi elementum quam, egestas posuere elit purus a neque. Nunc risus mi, interdum id nisl et, tempor pulvinar elit." />
            <TextArea maxRows={5} defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a eros nec urna mollis sollicitudin id et lacus. Nam in feugiat urna, eget volutpat sem. Duis ornare, eros nec accumsan consectetur, nunc nisi elementum quam, egestas posuere elit purus a neque. Nunc risus mi, interdum id nisl et, tempor pulvinar elit." />
        </Inline>
    )
    .add("no resize", () =>
        <TextArea resize="none" />
    )
    .add("rows", () =>
        <TextArea rows={12} />
    )
    .add("styling", () =>
        <Inline>
            <TextArea className="bg-red" />
            <TextArea style={{ backgroundColor: "red" }} />
            <TextArea wrapperProps={{ className: "border-red" }} />
            <TextArea wrapperProps={{ style: { border: "1px solid red" } }} />
        </Inline>
    );
