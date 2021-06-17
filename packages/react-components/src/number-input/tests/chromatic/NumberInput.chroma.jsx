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
    .add("test", () =>
        <NumberInput placeholder="Age" min={15} />
    )
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
    );
