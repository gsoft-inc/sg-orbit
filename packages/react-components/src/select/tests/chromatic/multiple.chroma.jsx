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
        search
        multiple
        options={options}
        {...otherProps}
    />;
}

stories()
    .add("default", () =>
        <div className="flex">
            {createMultipleSelect({
                wrapperClassName: "mr5"
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
                wrapperClassName: "mr5"
            })}
            {createMultipleSelect({
                defaultValue: ["Female", "Male"],
                wrapperClassName: "mr5"
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    size: "small",
                    defaultValue: ["Female", "Male"],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ "marginBottom": "150px" }}>
                {createMultipleSelect({
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    defaultValue: ["Female", "Male"],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createMultipleSelect({
                    size: "large",
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    size: "large",
                    defaultValue: ["Female", "Male"],
                    wrapperClassName: "mr5"
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
                    wrapperClassName: "mr5"
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
                wrapperClassName: "mr5"
            })}
            {createMultipleSelect({
                disabled: true,
                defaultValue: ["Female", "Male"],
                wrapperClassName: "mr5"
            })}
        </div>
    )
    .add("error", () =>
        <div className="flex">
            {createMultipleSelect({
                error: true,
                wrapperClassName: "mr5"
            })}
            {createMultipleSelect({
                error: true,
                wrapperClassName: "mr5",
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    loading: true,
                    defaultValue: ["Female"],
                    size: "small",
                    wrapperClassName: "mr5"
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    loading: true,
                    defaultValue: ["Female"],
                    wrapperClassName: "mr5"
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    loading: true,
                    defaultValue: ["Female"],
                    size: "large",
                    wrapperClassName: "mr5"
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: ["Male"],
                    size: "small",
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    size: "small",
                    defaultOpen: true,
                    wrapperClassName: "mr5"
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: ["Male"],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    defaultOpen: true,
                    wrapperClassName: "mr5"
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: ["Male"],
                    size: "large",
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    size: "large",
                    defaultOpen: true,
                    wrapperClassName: "mr5"
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: ["Male"],
                    size: "small",
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    size: "small",
                    defaultOpen: true,
                    wrapperClassName: "mr5"
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: ["Male"],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    defaultOpen: true,
                    wrapperClassName: "mr5"
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: ["Male"],
                    size: "large",
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    icon: <MagnifierIcon />,
                    size: "large",
                    defaultOpen: true,
                    wrapperClassName: "mr5"
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    search: true,
                    size: "small",
                    defaultValue: ["Female", "Male"],
                    wrapperClassName: "mr5"
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    search: true,
                    defaultValue: ["Female", "Male"],
                    wrapperClassName: "mr5"
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    search: true,
                    size: "large",
                    defaultValue: ["Female", "Male"],
                    wrapperClassName: "mr5"
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
    .add("styling", () =>
        <div className="flex">
            {createMultipleSelect({
                wrapperClassName: "border-red mr5"
            })}
            {createMultipleSelect({
                wrapperClassName: "mr5",
                wrapperStyle: {
                    border: "1px solid red"
                }
            })}
            {createMultipleSelect({
                wrapperClassName: "mr5",
                className: "border-red"
            })}
            {createMultipleSelect({
                style: {
                    border: "1px solid red"
                }
            })}
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    size: "small",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: ["Female"],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    size: "small",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultOpen: true,
                    wrapperClassName: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createMultipleSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: ["Female"],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultOpen: true,
                    wrapperClassName: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createMultipleSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: ["Female"],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultOpen: true,
                    wrapperClassName: "mr5"
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
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: ["Female"],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: ["Female"],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultOpen: true,
                    wrapperClassName: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createMultipleSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: ["Female"],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: ["Female"],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultOpen: true,
                    wrapperClassName: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createMultipleSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: ["Female"],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: ["Female"],
                    wrapperClassName: "mr5"
                })}
                {createMultipleSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultOpen: true,
                    wrapperClassName: "mr5"
                })}
            </div>
        </div>
    );
