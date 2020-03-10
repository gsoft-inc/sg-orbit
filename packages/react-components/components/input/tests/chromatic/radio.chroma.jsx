import { Radio } from "@orbit-ui/react-input/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Radio"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

function createRadio({ label = "Milky Way", ...otherProps } = {}) {
    return (
        <Radio
            label={label}
            {...otherProps}
        />
    );
}

stories()
    .add("default", () =>
        createRadio()
    )
    .add("checked", () =>
        createRadio({
            checked: true
        })
    )
    .add("no label", () =>
        createRadio({
            label: null
        })
    )
    .add("disabled", () =>
        <div className="flex">
            {createRadio({
                disabled: true,
                className: "mr5"
            })}
            {createRadio({
                disabled: true,
                checked: true,
                className: "mr5"
            })}
            {createRadio({
                disabled: true,
                label: null
            })}
        </div>
    )
    .add("readonly", () =>
        <div className="flex">
            {createRadio({
                readOnly: true,
                className: "mr5"
            })}
            {createRadio({
                readOnly: true,
                checked: true,
                className: "mr5"
            })}
            {createRadio({
                readOnly: true,
                label: null
            })}
        </div>
    );
