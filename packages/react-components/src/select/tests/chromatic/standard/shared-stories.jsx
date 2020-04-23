import { CalendarIcon, MagnifierIcon } from "@react-components/icons";
import { cloneElement } from "react";

const MALE = { key: "Male", text: "Male", value: "Male" };
const FEMALE = { key: "Female", text: "Female", value: "Female" };
const GENDERS = [MALE, FEMALE];

function createSelect(element, { options = GENDERS, ...otherProps } = {}) {
    return cloneElement(element, {
        placeholder: "Gender",
        options,
        ...otherProps
    });
}

export function createSharedStories(select, stories) {
    stories
        .add("default", () =>
            <div className="flex">
                {createSelect(select, {
                    className: "mr5"
                })}
                {createSelect(select, {
                    defaultOpen: true
                })}
            </div>
        )
        .add("selected value", () =>
            <div className="flex">
                {createSelect(select, {
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSelect(select, {
                    defaultValue: "Female",
                    defaultOpen: true
                })}
            </div>
        )
        .add("size",
             () =>
                 <div className="flex flex-column">
                     <div className="flex" style={{ marginBottom: "150px" }}>
                         {createSelect(select, {
                             size: "small",
                             className: "mr5"
                         })}
                         {createSelect(select, {
                             size: "small",
                             defaultValue: "Female",
                             className: "mr5"
                         })}
                         {createSelect(select, {
                             size: "small",
                             defaultOpen: true
                         })}
                     </div>
                     <div className="flex" style={{ marginBottom: "150px" }}>
                         {createSelect(select, {
                             className: "mr5"
                         })}
                         {createSelect(select, {
                             defaultValue: "Female",
                             className: "mr5"
                         })}
                         {createSelect(select, {
                             defaultOpen: true
                         })}
                     </div>
                     <div className="flex">
                         {createSelect(select, {
                             size: "large",
                             className: "mr5"
                         })}
                         {createSelect(select, {
                             size: "large",
                             defaultValue: "Female",
                             className: "mr5"
                         })}
                         {createSelect(select, {
                             size: "large",
                             defaultOpen: true
                         })}
                     </div>
                 </div>
        )
        .add("fluid", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSelect(select, {
                        fluid: true,
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        fluid: true,
                        defaultOpen: true
                    })}
                </div>
                <div className="flex">
                    <div className="w-30 mr5">
                        {createSelect(select, {
                            fluid: true
                        })}
                    </div>
                    <div className="w-30">
                        {createSelect(select, {
                            fluid: true,
                            defaultOpen: true
                        })}
                    </div>
                </div>
            </div>
        )
        .add("disabled", () =>
            <div className="flex">
                {createSelect(select, {
                    disabled: true,
                    className: "mr5"
                })}
                {createSelect(select, {
                    disabled: true,
                    defaultValue: "Female"
                })}
            </div>
        )
        .add("clearable", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSelect(select, {
                        clearable: true,
                        defaultValue: "Female",
                        size: "small",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        clearable: true,
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        clearable: true,
                        defaultValue: "Female",
                        size: "large"
                    })}
                </div>
                <div className="flex">
                    {createSelect(select, {
                        clearable: true,
                        defaultValue: "Female",
                        defaultOpen: true
                    })}
                </div>
            </div>
        )
        .add("error", () =>
            <div className="flex">
                {createSelect(select, {
                    error: true,
                    className: "mr5"
                })}
                {createSelect(select, {
                    error: true,
                    className: "mr5",
                    defaultOpen: true
                })}
            </div>
        )
        .add("loading", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSelect(select, {
                        loading: true,
                        size: "small",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        loading: true,
                        defaultValue: "Female",
                        size: "small",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        loading: true,
                        size: "small",
                        defaultOpen: true
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSelect(select, {
                        loading: true,
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        loading: true,
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        loading: true,
                        defaultOpen: true
                    })}
                </div>
                <div className="flex">
                    {createSelect(select, {
                        loading: true,
                        size: "large",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        loading: true,
                        defaultValue: "Female",
                        size: "large",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        loading: true,
                        size: "large",
                        defaultOpen: true
                    })}
                </div>
            </div>
        )
        .add("upward", () =>
            <div style={{ marginTop: "50px" }}>
                {createSelect(select, {
                    upward: true,
                    defaultOpen: true
                })}
            </div>
        )
        .add("icon", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "small",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultValue: "Male",
                        size: "small",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "small",
                        defaultOpen: true
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSelect(select, {
                        icon: <MagnifierIcon />,
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultValue: "Male",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultOpen: true
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "large",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        icon: <MagnifierIcon />,
                        defaultValue: "Male",
                        size: "large",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        icon: <MagnifierIcon />,
                        size: "large",
                        defaultOpen: true
                    })}
                </div>
                <div className="flex">
                    {createSelect(select, {
                        icon: <MagnifierIcon />,
                        disabled: true
                    })}
                </div>
            </div>
        )
        .add("item avatar", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSelect(select, {
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
                    {createSelect(select, {
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        defaultOpen: true,
                        className: "mr5"
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSelect(select, {
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
                    {createSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        size: "small",
                        options: [
                            { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                            { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSelect(select, {
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
                    {createSelect(select, {
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        options: [
                            { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                            { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        defaultOpen: true,
                        className: "mr5"
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, icons: <CalendarIcon /> },
                            { ...FEMALE, icons: <CalendarIcon /> }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSelect(select, {
                        size: "large",
                        options: [
                            { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                            { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                        ],
                        defaultValue: "Female",
                        className: "mr5"
                    })}
                    {createSelect(select, {
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
                    {createSelect(select, {
                        size: "small",
                        actions: [{ content: <a href="https://www.google.com">Google</a> }],
                        defaultOpen: true
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createSelect(select, {
                        actions: [{ content: <a href="https://www.google.com">Google</a> }],
                        defaultOpen: true
                    })}
                </div>
                <div className="flex">
                    {createSelect(select, {
                        size: "large",
                        actions: [{ content: <a href="https://www.google.com">Google</a> }],
                        defaultOpen: true
                    })}
                </div>
            </div>
        )
        .add("styling", () =>
            <div className="flex">
                {createSelect(select, {
                    className: "border-red mr5"
                })}
                {createSelect(select, {
                    style: { border: "1px solid red" }
                })}
            </div>
        );
}
