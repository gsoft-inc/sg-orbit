import { MagnifierIcon } from "@orbit-ui/react-icons/src";
import { Select } from "@orbit-ui/react-select/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Select/multiple"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

const GENDERS = [
    { key: "Male", text: "Male", value: "Male" },
    { key: "Female", text: "Female", value: "Female" }
];

function createMultipleSelect({ options = GENDERS, ...otherProps } = {}) {
    return <Select
        placeholder="Gender"
        multiple
        options={options}
        {...otherProps}
    />;
}

stories()
    .add("default", () =>
        <div className="flex">
            {createMultipleSelect({
                className: "mr5"
            })}
            {createMultipleSelect({
                defaultOpen: true
            })}
        </div>
    )
    .add("selected value", () =>
        <div className="flex">
            {createMultipleSelect({
                defaultValue: ["Female"],
                className: "mr5"
            })}
            {createMultipleSelect({
                defaultValue: ["Female", "Male"],
                className: "mr5"
            })}
            {createMultipleSelect({
                defaultValue: ["Female"],
                defaultOpen: true
            })}
        </div>
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ "marginBottom": "150px" }}>
                {createMultipleSelect({
                    size: "small",
                    className: "mr5"
                })}
                {createMultipleSelect({
                    size: "small",
                    defaultValue: ["Female", "Male"],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ "marginBottom": "150px" }}>
                {createMultipleSelect({
                    className: "mr5"
                })}
                {createMultipleSelect({
                    defaultValue: ["Female", "Male"],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createMultipleSelect({
                    size: "large",
                    className: "mr5"
                })}
                {createMultipleSelect({
                    size: "large",
                    defaultValue: ["Female", "Male"],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("fluid", () =>
        <div className="flex">
            {createMultipleSelect({
                fluid: true,
                className: "mr5"
            })}
            {createMultipleSelect({
                fluid: true,
                className: "mr5",
                defaultOpen: true
            })}
        </div>
    )
    .add("disabled", () =>
        <div className="flex">
            {createMultipleSelect({
                disabled: true,
                className: "mr5"
            })}
            {createMultipleSelect({
                disabled: true,
                defaultValue: ["Female", "Male"],
                className: "mr5"
            })}
        </div>
    )
    .add("error", () =>
        <div className="flex">
            {createMultipleSelect({
                error: true,
                className: "mr5"
            })}
            {createMultipleSelect({
                error: true,
                className: "mr5",
                defaultOpen: true
            })}
        </div>
    )
    .add("loading", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createMultipleSelect({
                    loading: true,
                    size: "small",
                    className: "mr5"
                })}
                {createMultipleSelect({
                    loading: true,
                    defaultValue: ["Female"],
                    size: "small",
                    className: "mr5"
                })}
                {createMultipleSelect({
                    loading: true,
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createMultipleSelect({
                    loading: true,
                    className: "mr5"
                })}
                {createMultipleSelect({
                    loading: true,
                    defaultValue: ["Female"],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    loading: true,
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createMultipleSelect({
                    loading: true,
                    size: "large",
                    className: "mr5"
                })}
                {createMultipleSelect({
                    loading: true,
                    defaultValue: ["Female"],
                    size: "large",
                    className: "mr5"
                })}
                {createMultipleSelect({
                    loading: true,
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    size: "small",
                    className: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: ["Male"],
                    size: "small",
                    className: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    size: "small",
                    defaultOpen: true,
                    className: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    size: "small",
                    search: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    className: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: ["Male"],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    defaultOpen: true,
                    className: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    search: true
                })}
            </div>
            <div className="flex">
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    size: "large",
                    className: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: ["Male"],
                    size: "large",
                    className: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    size: "large",
                    defaultOpen: true,
                    className: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    size: "large",
                    search: true
                })}
            </div>
        </div>
    )
    .add("searchable", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ "marginBottom": "150px" }}>
                {createMultipleSelect({
                    search: true,
                    size: "small",
                    className: "mr5"
                })}
                {createMultipleSelect({
                    search: true,
                    size: "small",
                    defaultValue: ["Female", "Male"],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    search: true,
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ "marginBottom": "150px" }}>
                {createMultipleSelect({
                    search: true,
                    className: "mr5"
                })}
                {createMultipleSelect({
                    search: true,
                    defaultValue: ["Female", "Male"],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    search: true,
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createMultipleSelect({
                    search: true,
                    size: "large",
                    className: "mr5"
                })}
                {createMultipleSelect({
                    search: true,
                    size: "large",
                    defaultValue: ["Female", "Male"],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    search: true,
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    );
