import { EditIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { NumberInput } from "@react-components/input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("NumberInput"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <NumberInput placeholder="Age" />
            <div>
                <NumberInput disabled placeholder="Age" />
            </div>
        </Stack>
    )
    .add("min / max", () =>
        <Stack>
            <Inline>
                <NumberInput min={1} max={15} defaultValue={20} placeholder="Age" />
                <NumberInput min={1} max={15} defaultValue={-20} placeholder="Age" />
            </Inline>
            <div>
                <NumberInput validationState="valid" min={1} max={15} defaultValue={20} placeholder="Age" />
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
            <div>
                <NumberInput disabled icon={<EditIcon />} placeholder="Age" />
            </div>
        </Stack>
    )
    .add("fluid", () =>
        <NumberInput fluid placeholder="Age" />
    )
    .add("validation", () =>
        <Inline>
            <NumberInput validationState="invalid" placeholder="Age" />
            <NumberInput validationState="valid" placeholder="Age" />
        </Inline>
    )
    .add("readonly", () =>
        <NumberInput readOnly placeholder="Age" />
    )
    .add("loading", () =>
        <NumberInput loading placeholder="Age" />
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
    .add("autofocus with delay", () =>
        <NumberInput autoFocus autoFocusDelay={5} placeholder="Age" />
    );
