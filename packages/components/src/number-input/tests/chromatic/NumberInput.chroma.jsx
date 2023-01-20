import { Inline, Stack } from "@components/layout";
import { Div } from "@components/html";
import { PencilMajorIcon } from "@components/icons";
import { NumberInput } from "@components/number-input";

export default {
    title: "Chromatic/NumberInput",
    component: NumberInput,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
};

export const Default = () => (
    <Stack>
        <NumberInput placeholder="Age" />
        <NumberInput loading placeholder="Age" />
        <NumberInput disabled placeholder="Age" />
        <NumberInput readOnly placeholder="Age" />
        <Div>
            <NumberInput fluid placeholder="Age" />
        </Div>
        <Div width="10%">
            <NumberInput fluid placeholder="Age" />
        </Div>
        <Div>
            <NumberInput loading fluid placeholder="Age" />
        </Div>
    </Stack>
);

Default.storyName = "default";

export const IntegerValue = () => (
    <NumberInput defaultValue={12} step={1} placeholder="Age" />
);

IntegerValue.storyName = "integer value";

export const DecimalValue = () => (
    <NumberInput defaultValue={12.10} step={0.1} placeholder="Grams" />
);

DecimalValue.storyName = "decimal value";

export const Icon = () => (
    <Stack>
        <NumberInput icon={<PencilMajorIcon />} placeholder="Age" />
        <NumberInput loading icon={<PencilMajorIcon />} placeholder="Age" />
        <NumberInput disabled icon={<PencilMajorIcon />} placeholder="Age" />
        <NumberInput readOnly icon={<PencilMajorIcon />} placeholder="Age" />
        <NumberInput fluid icon={<PencilMajorIcon />} placeholder="Age" />
        <Div width="10%">
            <NumberInput fluid icon={<PencilMajorIcon />} placeholder="Age" />
        </Div>
        <NumberInput loading fluid icon={<PencilMajorIcon />} placeholder="Age" />
    </Stack>
);

Icon.storyName = "icon";

export const Validation = () => (
    <Inline>
        <NumberInput validationState="invalid" placeholder="Age" />
        <NumberInput validationState="valid" placeholder="Age" />
    </Inline>
);

Validation.storyName = "validation";

export const Zoom = () => (
    <Stack>
        <Div className="zoom-in">
            <NumberInput placeholder="Age" />
        </Div>
        <Div className="zoom-out">
            <NumberInput placeholder="Age" />
        </Div>
    </Stack>
);

Zoom.storyName = "zoom";

export const Styling = () => (
    <Inline>
        <NumberInput border="warning-7" placeholder="Age" />
        <NumberInput className="border-red" placeholder="Age" />
        <NumberInput style={{ border: "1px solid red" }} placeholder="Age" />
        <NumberInput wrapperProps={{ className: "border-red" }} placeholder="Age" />
        <NumberInput wrapperProps={{ style: { border: "1px solid red" } }} placeholder="Age" />
    </Inline>
);

Styling.storyName = "styling";
