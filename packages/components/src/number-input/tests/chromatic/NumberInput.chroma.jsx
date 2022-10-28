import { Inline, Stack } from "@components/layout";
import { Div } from "@components/html";
import { EditIcon } from "@components/icons";
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

export const Default = () =>
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
    </Stack>;

export const IntegerValue = () =>
    <NumberInput defaultValue={12} step={1} placeholder="Age" />;

export const DecimalValue = () =>
    <NumberInput defaultValue={12.10} step={0.1} placeholder="Grams" />;

export const Icon = () =>
    <Stack>
        <NumberInput icon={<EditIcon />} placeholder="Age" />
        <NumberInput loading icon={<EditIcon />} placeholder="Age" />
        <NumberInput disabled icon={<EditIcon />} placeholder="Age" />
        <NumberInput readOnly icon={<EditIcon />} placeholder="Age" />
        <NumberInput fluid icon={<EditIcon />} placeholder="Age" />
        <Div width="10%">
            <NumberInput fluid icon={<EditIcon />} placeholder="Age" />
        </Div>
        <NumberInput loading fluid icon={<EditIcon />} placeholder="Age" />
    </Stack>;

export const Validation = () =>
    <Inline>
        <NumberInput validationState="invalid" placeholder="Age" />
        <NumberInput validationState="valid" placeholder="Age" />
    </Inline>;

export const Zoom = () =>
    <Stack>
        <Div className="zoom-in">
            <NumberInput placeholder="Age" />
        </Div>
        <Div className="zoom-out">
            <NumberInput placeholder="Age" />
        </Div>
    </Stack>;

export const Styling = () =>
    <Inline>
        <NumberInput border="warning-7" placeholder="Age" />
        <NumberInput className="border-red" placeholder="Age" />
        <NumberInput style={{ border: "1px solid red" }} placeholder="Age" />
        <NumberInput wrapperProps={{ className: "border-red" }} placeholder="Age" />
        <NumberInput wrapperProps={{ style: { border: "1px solid red" } }} placeholder="Age" />
    </Inline>;

Default.storyName = "default";
IntegerValue.storyName = "integer value";
DecimalValue.storyName = "decimal value";
Icon.storyName = "icon";
Validation.storyName = "validation";
Zoom.storyName = "zoom";
Styling.storyName = "styling";
