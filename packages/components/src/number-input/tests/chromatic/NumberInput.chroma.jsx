import { Div } from "@components/html";
import { EditIcon } from "@components/icons";
import { Inline, Stack } from "@components/layout";
import { NumberInput } from "@components/number-input";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/NumberInput")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
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
    .add("integer value", () =>
        <NumberInput defaultValue={12} step={1} placeholder="Age" />
    )
    .add("decimal value", () =>
        <NumberInput defaultValue={12.10} step={0.1} placeholder="Grams" />
    )
    .add("icon", () =>
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
        </Stack>
    )
    .add("validation", () =>
        <Inline>
            <NumberInput validationState="invalid" placeholder="Age" />
            <NumberInput validationState="valid" placeholder="Age" />
        </Inline>
    )
    .add("zoom", () =>
        <Stack>
            <Div className="zoom-in">
                <NumberInput placeholder="Age" />
            </Div>
            <Div className="zoom-out">
                <NumberInput placeholder="Age" />
            </Div>
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <NumberInput border="warning-7" placeholder="Age" />
            <NumberInput className="border-red" placeholder="Age" />
            <NumberInput style={{ border: "1px solid red" }} placeholder="Age" />
        </Inline>
    );
