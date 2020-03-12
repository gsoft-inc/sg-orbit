import { MagnifierIcon } from "@orbit-ui/react-icons/src";
import { Select } from "@orbit-ui/react-select/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Select/standard"))
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

function createSelect({ options = GENDERS, ...otherProps } = {}) {
    return <Select
        placeholder="Gender"
        options={options}
        {...otherProps}
    />;
}

stories()
    .add("default", () =>
        <div className="flex">
            {createSelect({
                className: "mr5"
            })}
            {createSelect({
                defaultOpen: true
            })}
        </div>
    )
    .add("sizes",
         () =>
             <div className="flex flex-column">
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     {createSelect({
                         size: "small",
                         className: "mr5"
                     })}
                     {createSelect({
                         size: "small",
                         defaultValue: "Female",
                         className: "mr5"
                     })}
                     {createSelect({
                         size: "small",
                         defaultOpen: true
                     })}
                 </div>
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     {createSelect({
                         className: "mr5"
                     })}
                     {createSelect({
                         defaultValue: "Female",
                         className: "mr5"
                     })}
                     {createSelect({
                         defaultOpen: true
                     })}
                 </div>
                 <div className="flex">
                     {createSelect({
                         size: "large",
                         className: "mr5"
                     })}
                     {createSelect({
                         size: "large",
                         defaultValue: "Female",
                         className: "mr5"
                     })}
                     {createSelect({
                         size: "large",
                         defaultOpen: true
                     })}
                 </div>
             </div>
    )
    .add("fluid", () =>
        <div className="flex">
            {createSelect({
                fluid: true,
                className: "mr5"
            })}
            {createSelect({
                fluid: true,
                className: "mr5",
                defaultOpen: true
            })}
        </div>
    )
    .add("disabled", () =>
        createSelect({
            disabled: true
        })
    )
    .add("clearable", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    clearable: true,
                    defaultValue: "Female",
                    size: "small",
                    className: "mr5"
                })}
                {createSelect({
                    clearable: true,
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSelect({
                    clearable: true,
                    defaultValue: "Female",
                    size: "large"
                })}
            </div>
            <div className="flex">
                {createSelect({
                    clearable: true,
                    defaultValue: "Female",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("error", () =>
        <div className="flex">
            {createSelect({
                error: true,
                className: "mr5"
            })}
            {createSelect({
                error: true,
                className: "mr5",
                defaultOpen: true
            })}
        </div>
    )
    .add("loading", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    loading: true,
                    size: "small",
                    className: "mr5"
                })}
                {createSelect({
                    loading: true,
                    defaultValue: "Female",
                    size: "small",
                    className: "mr5"
                })}
                {createSelect({
                    loading: true,
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    loading: true,
                    className: "mr5"
                })}
                {createSelect({
                    loading: true,
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSelect({
                    loading: true,
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    loading: true,
                    size: "large",
                    className: "mr5"
                })}
                {createSelect({
                    loading: true,
                    defaultValue: "Female",
                    size: "large",
                    className: "mr5"
                })}
                {createSelect({
                    loading: true,
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("upward", () =>
        <div style={{ marginTop: "50px" }}>
            { createSelect({
                upward: true,
                defaultOpen: true
            })}
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    icon: <MagnifierIcon />,
                    size: "small",
                    className: "mr5"
                })}
                {createSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: "Male",
                    size: "small",
                    className: "mr5"
                })}
                {createSelect({
                    icon: <MagnifierIcon />,
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    icon: <MagnifierIcon />,
                    className: "mr5"
                })}
                {createSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: "Male",
                    className: "mr5"
                })}
                {createSelect({
                    icon: <MagnifierIcon />,
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    icon: <MagnifierIcon />,
                    size: "large",
                    className: "mr5"
                })}
                {createSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: "Male",
                    size: "large",
                    className: "mr5"
                })}
                {createSelect({
                    icon: <MagnifierIcon />,
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("actions", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    size: "small",
                    actions: [{ content: <a href="https://www.google.com">Google</a> }],
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    actions: [{ content: <a href="https://www.google.com">Google</a> }],
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    size: "large",
                    actions: [{ content: <a href="https://www.google.com">Google</a> }],
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("multiple values", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ "marginBottom": "150px" }}>
                {createSelect({
                    size: "small",
                    multiple: true
                })}
                {createSelect({
                    size: "small",
                    multiple: true,
                    defaultValue: [ "Female", "Male" ]
                })}
                {createSelect({
                    size: "small",
                    multiple: true,
                    defaultValue: [ "Female" ],
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ "marginBottom": "150px" }}>
                {createSelect({
                    multiple: true
                })}
                {createSelect({
                    multiple: true,
                    defaultValue: [ "Female", "Male" ]
                })}
                {createSelect({
                    multiple: true,
                    defaultValue: [ "Female" ],
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    size: "large",
                    multiple: true
                })}
                {createSelect({
                    size: "large",
                    multiple: true,
                    defaultValue: [ "Female", "Male" ]
                })}
                {createSelect({
                    size: "large",
                    multiple: true,
                    defaultValue: [ "Female" ],
                    defaultOpen: true
                })}
            </div>
        </div>
    );
