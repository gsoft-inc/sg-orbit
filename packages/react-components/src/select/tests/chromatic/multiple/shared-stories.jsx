import { CalendarIcon, MagnifierIcon } from "@react-components/icons";
import { cloneElement } from "react";

const MALE = { key: "Male", text: "Male", value: "Male" };
const FEMALE = { key: "Female", text: "Female", value: "Female" };
const GENDERS = [MALE, FEMALE];

function createMultipleSelect(select, { options = GENDERS, ...otherProps } = {}) {
    return cloneElement(select, {
        placeholder: "Gender",
        multiple: true,
        options,
        ...otherProps
    });
}

export function createSharedStories(select, stories) {
    stories
        .add("default", () =>
            <div className="flex">
                {createMultipleSelect(select, {
                    className: "mr5"
                })}
                {createMultipleSelect(select, {
                    defaultOpen: true
                })}
            </div>
        )
        .add("selected value", () =>
            <div className="flex">
                {createMultipleSelect(select, {
                    defaultValue: ["Female"],
                    className: "mr5"
                })}
                {createMultipleSelect(select, {
                    defaultValue: ["Female", "Male"],
                    className: "mr5"
                })}
                {createMultipleSelect(select, {
                    defaultValue: ["Female"],
                    defaultOpen: true
                })}
            </div>
        )
        .add("size", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ "marginBottom": "150px" }}>
                    {createMultipleSelect(select, {
                        size: "small",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        size: "small",
                        defaultValue: ["Female", "Male"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        size: "small",
                        defaultOpen: true
                    })}
                </div>
                <div className="flex" style={{ "marginBottom": "150px" }}>
                    {createMultipleSelect(select, {
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        defaultValue: ["Female", "Male"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        defaultOpen: true
                    })}
                </div>
                <div className="flex">
                    {createMultipleSelect(select, {
                        size: "large",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        size: "large",
                        defaultValue: ["Female", "Male"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        size: "large",
                        defaultOpen: true
                    })}
                </div>
            </div>
        )
        .add("fluid", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createMultipleSelect(select, {
                        fluid: true,
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        fluid: true,
                        defaultOpen: true
                    })}
                </div>
                <div className="flex">
                    <div className="w-30 mr5">
                        {createMultipleSelect(select, {
                            fluid: true
                        })}
                    </div>
                    <div className="w-30">
                        {createMultipleSelect(select, {
                            fluid: true,
                            defaultOpen: true
                        })}
                    </div>
                </div>
            </div>
        )
        .add("disabled", () =>
            <div className="flex">
                {createMultipleSelect(select, {
                    disabled: true,
                    className: "mr5"
                })}
                {createMultipleSelect(select, {
                    disabled: true,
                    defaultValue: ["Female", "Male"],
                    className: "mr5"
                })}
            </div>
        )
        .add("error", () =>
            <div className="flex">
                {createMultipleSelect(select, {
                    error: true,
                    className: "mr5"
                })}
                {createMultipleSelect(select, {
                    error: true,
                    className: "mr5",
                    defaultOpen: true
                })}
            </div>
        )
        .add("loading", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createMultipleSelect(select, {
                        loading: true,
                        size: "small",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        loading: true,
                        defaultValue: ["Female"],
                        size: "small",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        loading: true,
                        size: "small",
                        defaultOpen: true
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createMultipleSelect(select, {
                        loading: true,
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        loading: true,
                        defaultValue: ["Female"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        loading: true,
                        defaultOpen: true
                    })}
                </div>
                <div className="flex">
                    {createMultipleSelect(select, {
                        loading: true,
                        size: "large",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        loading: true,
                        defaultValue: ["Female"],
                        size: "large",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
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
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "small",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultValue: ["Male"],
                        size: "small",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "small",
                        defaultOpen: true,
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "small",
                        search: true
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultValue: ["Male"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultOpen: true,
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        search: true
                    })}
                </div>
                <div className="flex">
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "large",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultValue: ["Male"],
                        size: "large",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "large",
                        defaultOpen: true,
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
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
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "small",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultValue: ["Male"],
                        size: "small",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "small",
                        defaultOpen: true,
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "small",
                        search: true
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultValue: ["Male"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultOpen: true,
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        search: true
                    })}
                </div>
                <div className="flex">
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "large",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultValue: ["Male"],
                        size: "large",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "large",
                        defaultOpen: true,
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
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
                    {createMultipleSelect(select, {
                        search: true,
                        size: "small",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        search: true,
                        size: "small",
                        defaultValue: ["Female", "Male"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        search: true,
                        size: "small",
                        defaultOpen: true
                    })}
                </div>
                <div className="flex" style={{ "marginBottom": "150px" }}>
                    {createMultipleSelect(select, {
                        search: true,
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        search: true,
                        defaultValue: ["Female", "Male"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        search: true,
                        defaultOpen: true
                    })}
                </div>
                <div className="flex" style={{ "marginBottom": "150px" }}>
                    {createMultipleSelect(select, {
                        search: true,
                        size: "large",
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        search: true,
                        size: "large",
                        defaultValue: ["Female", "Male"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        search: true,
                        size: "large",
                        defaultOpen: true
                    })}
                </div>
                <div className="flex">
                    {createMultipleSelect(select, {
                        icon: <MagnifierIcon />,
                        disabled: true
                    })}
                </div>
            </div>
        )
        .add("item avatar", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createMultipleSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        defaultValue: ["Female"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
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
                    {createMultipleSelect(select, {
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        defaultValue: ["Female"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        defaultOpen: true,
                        className: "mr5"
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createMultipleSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        defaultValue: ["Female"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
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
                    {createMultipleSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        defaultValue: ["Female"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                            { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                        ],
                        defaultValue: ["Female"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
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
                    {createMultipleSelect(select, {
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        defaultValue: ["Female"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        options: [
                            { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                            { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                        ],
                        defaultValue: ["Female"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        defaultOpen: true,
                        className: "mr5"
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createMultipleSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        defaultValue: ["Female"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                            { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                        ],
                        defaultValue: ["Female"],
                        className: "mr5"
                    })}
                    {createMultipleSelect(select, {
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
}
