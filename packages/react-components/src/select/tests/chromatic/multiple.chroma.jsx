import { CalendarIcon, MagnifierIcon } from "@react-components/icons";
import { Select } from "@react-components/select";
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

const MALE = { key: "Male", text: "Male", value: "Male" };
const FEMALE = { key: "Female", text: "Female", value: "Female" };
const GENDERS = [MALE, FEMALE];

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
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createMultipleSelect({
                    fluid: true,
                    className: "mr5"
                })}
                {createMultipleSelect({
                    fluid: true,
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                <div className="w-30 mr5">
                    {createMultipleSelect({
                        fluid: true
                    })}
                </div>
                <div className="w-30">
                    {createMultipleSelect({
                        fluid: true,
                        defaultOpen: true
                    })}
                </div>
            </div>
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
            <div className="flex" style={{ "marginBottom": "150px" }}>
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
            <div className="flex">
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    disabled: true
                })}
            </div>
        </div>
    )
    .add("item avatar", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createMultipleSelect({
                    size: "small",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    size: "small",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: ["Female"],
                    className: "mr5"
                })}
                {createMultipleSelect({
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
                {createMultipleSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: ["Female"],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultOpen: true,
                    className: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createMultipleSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: ["Female"],
                    className: "mr5"
                })}
                {createMultipleSelect({
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
                {createMultipleSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: ["Female"],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: ["Female"],
                    className: "mr5"
                })}
                {createMultipleSelect({
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
                {createMultipleSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: ["Female"],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: ["Female"],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultOpen: true,
                    className: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createMultipleSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: ["Female"],
                    className: "mr5"
                })}
                {createMultipleSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: ["Female"],
                    className: "mr5"
                })}
                {createMultipleSelect({
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
    );

