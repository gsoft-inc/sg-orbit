import { CalendarIcon, MagnifierIcon } from "@react-components/icons";
import { cloneElement } from "react";

const MALE = { key: "Male", text: "Male", value: "Male" };
const FEMALE = { key: "Female", text: "Female", value: "Female" };
const GENDERS = [MALE, FEMALE];

function createSearchableSelect(select, { options = GENDERS, ...otherProps } = {}) {
    return cloneElement(select, {
        placeholder: "Gender",
        search: true,
        options,
        ...otherProps
    });
}

export function createSharedStories(select, stories) {
    stories
        .add("default", () =>
            <div className="flex">
                {createSearchableSelect(select, {
                    className: "mr5"
                })}
                {createSearchableSelect(select, {
                    defaultOpen: true
                })}
            </div>
        )
        .add("size", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSearchableSelect(select, {
                        className: "mr5",
                        size: "small"
                    })}
                    {createSearchableSelect(select, {
                        defaultValue: "Male",
                        className: "mr5",
                        size: "small"
                    })}
                    {createSearchableSelect(select, {
                        size: "small",
                        defaultOpen: true
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSearchableSelect(select, {
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        defaultValue: "Male",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        defaultOpen: true
                    })}
                </div>
                <div className="flex">
                    {createSearchableSelect(select, {
                        className: "mr5",
                        size: "large"
                    })}
                    {createSearchableSelect(select, {
                        defaultValue: "Male",
                        className: "mr5",
                        size: "large"
                    })}
                    {createSearchableSelect(select, {
                        size: "large",
                        defaultOpen: true
                    })}
                </div>
            </div>
        )
        .add("disabled", () =>
            createSearchableSelect(select, {
                className: "mr5",
                disabled: true
            })
        )
        .add("error", () =>
            <div className="flex">
                {createSearchableSelect(select, {
                    error: true,
                    className: "mr5"
                })}
                {createSearchableSelect(select, {
                    error: true,
                    className: "mr5",
                    defaultOpen: true
                })}
            </div>
        )
        .add("loading", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSearchableSelect(select, {
                        loading: true,
                        size: "small",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        loading: true,
                        defaultValue: "Female",
                        size: "small",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        loading: true,
                        size: "small",
                        defaultOpen: true
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSearchableSelect(select, {
                        loading: true,
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        loading: true,
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        loading: true,
                        defaultOpen: true
                    })}
                </div>
                <div className="flex">
                    {createSearchableSelect(select, {
                        loading: true,
                        size: "large",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        loading: true,
                        defaultValue: "Female",
                        size: "large",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        loading: true,
                        size: "large",
                        defaultOpen: true
                    })}
                </div>
            </div>
        )
        .add("clearable", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSearchableSelect(select, {
                        clearable: true,
                        defaultValue: "Male",
                        size: "small",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        clearable: true,
                        defaultValue: "Male",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        clearable: true,
                        defaultValue: "Male",
                        size: "large"

                    })}
                </div>
                <div className="flex">
                    {createSearchableSelect(select, {
                        clearable: true,
                        defaultValue: "Male",
                        defaultOpen: true
                    })}
                </div>
            </div>
        )
        .add("icon", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSearchableSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "small",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultValue: "Male",
                        size: "small",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "small",
                        defaultOpen: true
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSearchableSelect(select, {
                        icon: <MagnifierIcon />,
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultValue: "Male",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultOpen: true
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSearchableSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "large",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultValue: "Male",
                        size: "large",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "large",
                        defaultOpen: true
                    })}
                </div>
                <div className="flex">
                    {createSearchableSelect(select, {
                        icon: <MagnifierIcon />,
                        disabled: true
                    })}
                </div>
            </div>
        )
        .add("item avatar", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSearchableSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
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
                    {createSearchableSelect(select, {
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        defaultOpen: true,
                        className: "mr5"
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSearchableSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
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
                    {createSearchableSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                            { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
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
                    {createSearchableSelect(select, {
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        options: [
                            { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                            { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        defaultOpen: true,
                        className: "mr5"
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSearchableSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                            { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSearchableSelect(select, {
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
