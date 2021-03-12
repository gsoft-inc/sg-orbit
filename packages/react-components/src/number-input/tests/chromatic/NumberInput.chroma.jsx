import { EditIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { NumberInput } from "@react-components/number-input";
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
            <div>
                <NumberInput fluid placeholder="Age" />
            </div>
            <div className="w-10">
                <NumberInput fluid placeholder="Age" />
            </div>
            <div>
                <NumberInput loading fluid placeholder="Age" />
            </div>
        </Stack>
    )
    .add("min / max", () =>
        <Stack>
            <Inline>
                <NumberInput min={1} max={15} defaultValue={20} placeholder="Age" />
                <NumberInput min={1} max={15} defaultValue={-20} placeholder="Age" />
            </Inline>
            <NumberInput validationState="valid" min={1} max={15} defaultValue={20} placeholder="Age" />
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
            <div>
                <NumberInput fluid icon={<EditIcon />} placeholder="Age" />
            </div>
            <div className="w-10">
                <NumberInput fluid icon={<EditIcon />} placeholder="Age" />
            </div>
            <div>
                <NumberInput loading fluid icon={<EditIcon />} placeholder="Age" />
            </div>
        </Stack>
    )
    .add("validation", () =>
        <Inline>
            <NumberInput validationState="invalid" placeholder="Age" />
            <NumberInput validationState="valid" placeholder="Age" />
        </Inline>
    )
    .add("transparent", () =>
        <NumberInput variant="transparent" placeholder="Age" />
    )
    .add("autofocus", () =>
        <NumberInput autoFocus placeholder="Age" />
    )
    .add("when disabled do not autofocus", () =>
        <NumberInput autoFocus disabled placeholder="Age" />
    )
    .add("when readonly do not autofocus", () =>
        <NumberInput autoFocus readOnly placeholder="Age" />
    )
    .add("autofocus with delay", () =>
        <NumberInput autoFocus={50} placeholder="Age" />
    );
