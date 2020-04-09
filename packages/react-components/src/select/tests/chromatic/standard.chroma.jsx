/* eslint-disable max-len */

import { CalendarIcon, MagnifierIcon } from "@react-components/icons";
import { Select } from "@react-components/select";
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

const MALE = { key: "Male", text: "Male", value: "Male" };
const FEMALE = { key: "Female", text: "Female", value: "Female" };
const GENDERS = [MALE, FEMALE];

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
    .add("selected value", () =>
        <div className="flex">
            {createSelect({
                defaultValue: "Female",
                className: "mr5"
            })}
            {createSelect({
                defaultValue: "Female",
                defaultOpen: true
            })}
        </div>
    )
    .add("size",
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
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    fluid: true,
                    className: "mr5"
                })}
                {createSelect({
                    fluid: true,
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                <div className="w-30 mr5">
                    {createSelect({
                        fluid: true
                    })}
                </div>
                <div className="w-30">
                    {createSelect({
                        fluid: true,
                        defaultOpen: true
                    })}
                </div>
            </div>
        </div>
    )
    .add("disabled", () =>
        <div className="flex">
            {createSelect({
                disabled: true,
                className: "mr5"
            })}
            {createSelect({
                disabled: true,
                defaultValue: "Female"
            })}
        </div>
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
            <div className="flex" style={{ marginBottom: "150px" }}>
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
            <div className="flex">
                {createSelect({
                    icon: <MagnifierIcon />,
                    disabled: true
                })}
            </div>
        </div>
    )
    .add("item avatar", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    size: "small",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    className: "mr5"
                })}
                {createSelect({
                    size: "small",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSelect({
                    size: "small",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultOpen: true,
                    className: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    className: "mr5"
                })}
                {createSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultOpen: true,
                    className: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    className: "mr5"
                })}
                {createSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultOpen: true,
                    className: "mr5"
                })}
            </div>
        </div>
    )
    .add("item icons", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    className: "mr5"
                })}
                {createSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultOpen: true,
                    className: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    className: "mr5"
                })}
                {createSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultOpen: true,
                    className: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    className: "mr5"
                })}
                {createSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultOpen: true,
                    className: "mr5"
                })}
            </div>
        </div>
    )
    .add("item actions", () =>
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
    .add("item overflow", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [
                        MALE,
                        { ...FEMALE, text: "Super long text that will not fit without overflowing" }
                    ],
                    defaultOpen: true,
                    className: "mr5"
                })}
                {createSelect({
                    options: [
                        MALE,
                        { ...FEMALE, description: "Super long text that will not fit without overflowing" }
                    ],
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    options: [
                        MALE,
                        { ...FEMALE, icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />], iconsPosition: "right" }
                    ],
                    defaultOpen: true,
                    className: "mr5"
                })}
                {createSelect({
                    options: [
                        MALE,
                        { ...FEMALE, icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />, <CalendarIcon />] }
                    ],
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            {createSelect({
                className: "border-red mr5"
            })}
            {createSelect({
                style: { border: "1px solid red" }
            })}
        </div>
    );
