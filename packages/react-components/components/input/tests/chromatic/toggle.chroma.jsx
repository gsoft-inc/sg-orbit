import { Toggle } from "@orbit-ui/react-input/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Toggle"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

function createToggle({ label = "Milky Way", ...otherProps } = {}) {
    return (
        <Toggle
            label={label}
            {...otherProps}
        />
    );
}

stories()
    .add("default", () =>
        createToggle()
    )
    .add("checked", () =>
        createToggle({
            checked: true
        })
    )
    .add("no label", () =>
        createToggle({
            label: null
        })
    )
    .add("disabled", () =>
        <div className="flex">
            {createToggle({
                disabled: true,
                className: "mr5"
            })}
            {createToggle({
                disabled: true,
                checked: true,
                className: "mr5"
            })}
            {createToggle({
                disabled: true,
                label: null
            })}
        </div>
    )
    .add("readonly", () =>
        <div className="flex">
            {createToggle({
                readOnly: true,
                className: "mr5"
            })}
            {createToggle({
                readOnly: true,
                checked: true,
                className: "mr5"
            })}
            {createToggle({
                readOnly: true,
                label: null
            })}
        </div>
    );
