import { Inline, Stack } from "@components/layout";

import { CrossButton } from "@components/button";
import { Div } from "@components/html";
import { TextArea } from "@components/text-area";

export default {
    title: "Chromatic/TextArea",
    component: TextArea,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
};

export const Default = () => (
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
);

Default.storyName = "default";

export const Placeholder = () => (
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
);

Placeholder.storyName = "placeholder";

export const Value = () => (
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
        <Div width="10%">
            <TextArea fluid defaultValue="SpaceX will win the race!" aria-label="Label"></TextArea>
        </Div>
        <TextArea loading fluid defaultValue="SpaceX will win the race!" aria-label="Label"></TextArea>
    </Stack>
);

Value.storyName = "value";

export const Button = () => (
    <Stack>
        <TextArea button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
        <TextArea button={<CrossButton aria-label="Clear value" />} defaultValue="SpaceX will win the race!" aria-label="Label" />
        <TextArea disabled button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
        <TextArea readOnly button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
        <TextArea loading button={<CrossButton aria-label="Clear value" />} placeholder="Where to?" />
    </Stack>
);

Button.storyName = "button";

export const Validation = () => (
    <Inline>
        <TextArea validationState="invalid" placeholder="Where to?" />
        <TextArea validationState="valid" placeholder="Where to?" />
    </Inline>
);

Validation.storyName = "validation";

export const States = () => (
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
);

States.storyName = "states";

export const Autosize = () => (
    <Inline alignX="start">
        <TextArea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a eros nec urna mollis sollicitudin id et lacus. Nam in feugiat urna, eget volutpat sem. Duis ornare, eros nec accumsan consectetur, nunc nisi elementum quam, egestas posuere elit purus a neque. Nunc risus mi, interdum id nisl et, tempor pulvinar elit." aria-label="Label" />
        <TextArea maxRows={5} defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a eros nec urna mollis sollicitudin id et lacus. Nam in feugiat urna, eget volutpat sem. Duis ornare, eros nec accumsan consectetur, nunc nisi elementum quam, egestas posuere elit purus a neque. Nunc risus mi, interdum id nisl et, tempor pulvinar elit." aria-label="Label" />
    </Inline>
);

Autosize.storyName = "autosize";

export const NoResize = () => (
    <TextArea resize="none" aria-label="Label" />
);

NoResize.storyName = "no resize";

export const Rows = () => (
    <TextArea rows={12} aria-label="Label" />
);

Rows.storyName = "rows";

export const Zoom = () => (
    <Stack>
        <Div className="zoom-in">
            <TextArea aria-label="Label" />
        </Div>
        <Div className="zoom-out">
            <TextArea aria-label="Label" />
        </Div>
    </Stack>
);

Zoom.storyName = "zoom";

export const Styling = () => (
    <Inline>
        <TextArea border="alert-6" aria-label="Label" />
        <TextArea className="bg-red" aria-label="Label" />
        <TextArea style={{ backgroundColor: "red" }} aria-label="Label" />
        <TextArea wrapperProps={{ border: "alert-6" }} aria-label="Label" />
        <TextArea wrapperProps={{ className: "border-red" }} aria-label="Label" />
        <TextArea wrapperProps={{ style: { border: "1px solid red" } }} aria-label="Label" />
    </Inline>
);

Styling.storyName = "styling";
