import { Inline, Stack } from "@components/layout";
import { Div } from "@components/html";
import { PencilMajorIcon } from "@components/icons";
import { NumberInput } from "@components/number-input";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/NumberInput",
    component: NumberInput,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
} as ComponentMeta<typeof NumberInput>;

type NumberInputStory = ComponentStoryObj<typeof NumberInput>;

export const Default: NumberInputStory = {
    storyName: "default",
    render: () => (
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
    )
};

export const IntegerValue: NumberInputStory = {
    storyName: "integer value",
    render: () => (
        <NumberInput defaultValue={12} step={1} placeholder="Age" />
    )
};

export const DecimalValue: NumberInputStory = {
    storyName: "decimal value",
    render: () => (
        <NumberInput defaultValue={12.10} step={0.1} placeholder="Grams" />
    )
};

export const Icon: NumberInputStory = {
    storyName: "icon",
    render: () => (
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
    )
};


export const Validation: NumberInputStory = {
    storyName: "validation",
    render: () => (
        <Inline>
            <NumberInput validationState="invalid" placeholder="Age" />
            <NumberInput validationState="valid" placeholder="Age" />
        </Inline>
    )
};

export const Zoom: NumberInputStory = {
    storyName: "zoom",
    render: () => (
        <Stack>
            <Div className="zoom-in">
                <NumberInput placeholder="Age" />
            </Div>
            <Div className="zoom-out">
                <NumberInput placeholder="Age" />
            </Div>
        </Stack>
    )
};

export const Styling: NumberInputStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <NumberInput border="warning-7" placeholder="Age" />
            <NumberInput className="border-red" placeholder="Age" />
            <NumberInput style={{ border: "1px solid red" }} placeholder="Age" />
            <NumberInput wrapperProps={{ className: "border-red" }} placeholder="Age" />
            <NumberInput wrapperProps={{ style: { border: "1px solid red" } }} placeholder="Age" />
        </Inline>
    )
};
