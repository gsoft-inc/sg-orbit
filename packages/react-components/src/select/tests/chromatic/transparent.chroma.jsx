import { CalendarIcon, MagnifierIcon } from "@react-components/icons";
import { Select } from "@react-components/select";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

const MALE = { key: "Male", text: "Male", value: "Male" };
const FEMALE = { key: "Female", text: "Female", value: "Female" };
const GENDERS = [MALE, FEMALE];

function createTransparentSelect({ options = GENDERS, ...otherProps } = {}) {
    return <Select
        placeholder="Gender"
        transparent
        options={options}
        {...otherProps}
    />;
}

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Select/transparent"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <div className="flex">
            {createTransparentSelect({
                wrapperClassName: "mr5"
            })}
            {createTransparentSelect({
                defaultOpen: true
            })}
        </div>
    )
    .add("selected value", () =>
        <div className="flex">
            {createTransparentSelect({
                defaultValue: "Female",
                wrapperClassName: "mr5"
            })}
            {createTransparentSelect({
                defaultValue: "Female",
                defaultOpen: true
            })}
        </div>
    )
    .add("size",
         () =>
             <div className="flex flex-column">
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     {createTransparentSelect({
                         size: "small",
                         wrapperClassName: "mr5"
                     })}
                     {createTransparentSelect({
                         size: "small",
                         defaultValue: "Female",
                         wrapperClassName: "mr5"
                     })}
                     {createTransparentSelect({
                         size: "small",
                         defaultOpen: true
                     })}
                 </div>
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     {createTransparentSelect({
                         wrapperClassName: "mr5"
                     })}
                     {createTransparentSelect({
                         defaultValue: "Female",
                         wrapperClassName: "mr5"
                     })}
                     {createTransparentSelect({
                         defaultOpen: true
                     })}
                 </div>
                 <div className="flex">
                     {createTransparentSelect({
                         size: "large",
                         wrapperClassName: "mr5"
                     })}
                     {createTransparentSelect({
                         size: "large",
                         defaultValue: "Female",
                         wrapperClassName: "mr5"
                     })}
                     {createTransparentSelect({
                         size: "large",
                         defaultOpen: true
                     })}
                 </div>
             </div>
    )
    .add("fluid", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createTransparentSelect({
                    fluid: true,
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    fluid: true,
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                <div className="w-30 mr5">
                    {createTransparentSelect({
                        fluid: true
                    })}
                </div>
                <div className="w-30">
                    {createTransparentSelect({
                        fluid: true,
                        defaultOpen: true
                    })}
                </div>
            </div>
        </div>
    )
    .add("focus", () =>
        createTransparentSelect({
            focus: true
        })
    )
    .add("disabled", () =>
        <div className="flex">
            {createTransparentSelect({
                disabled: true,
                wrapperClassName: "mr5"
            })}
            {createTransparentSelect({
                disabled: true,
                defaultValue: "Female"
            })}
        </div>
    )
    .add("clearable", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createTransparentSelect({
                    clearable: true,
                    defaultValue: "Female",
                    size: "small",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    clearable: true,
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    clearable: true,
                    defaultValue: "Female",
                    size: "large"
                })}
            </div>
            <div className="flex">
                {createTransparentSelect({
                    clearable: true,
                    defaultValue: "Female",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("error", () =>
        <div className="flex">
            {createTransparentSelect({
                error: true,
                wrapperClassName: "mr5"
            })}
            {createTransparentSelect({
                error: true,
                wrapperClassName: "mr5",
                defaultOpen: true
            })}
        </div>
    )
    .add("loading", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createTransparentSelect({
                    loading: true,
                    size: "small",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    loading: true,
                    defaultValue: "Female",
                    size: "small",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    loading: true,
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createTransparentSelect({
                    loading: true,
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    loading: true,
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    loading: true,
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createTransparentSelect({
                    loading: true,
                    size: "large",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    loading: true,
                    defaultValue: "Female",
                    size: "large",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    loading: true,
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("upward", () =>
        <div style={{ marginTop: "50px" }}>
            {createTransparentSelect({
                upward: true,
                defaultOpen: true
            })}
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createTransparentSelect({
                    icon: <MagnifierIcon />,
                    size: "small",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: "Male",
                    size: "small",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    icon: <MagnifierIcon />,
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createTransparentSelect({
                    icon: <MagnifierIcon />,
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: "Male",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    icon: <MagnifierIcon />,
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createTransparentSelect({
                    icon: <MagnifierIcon />,
                    size: "large",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: "Male",
                    size: "large",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    icon: <MagnifierIcon />,
                    size: "large",
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createTransparentSelect({
                    icon: <MagnifierIcon />,
                    disabled: true
                })}
            </div>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            {createTransparentSelect({
                wrapperClassName: "border-red mr5"
            })}
            {createTransparentSelect({
                wrapperClassName: "mr5",
                wrapperStyle: {
                    border: "1px solid red"
                }
            })}
            {createTransparentSelect({
                wrapperClassName: "mr5",
                className: "border-red"
            })}
            {createTransparentSelect({
                style: {
                    border: "1px solid red"
                }
            })}
        </div>
    )
    .add("item avatar", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createTransparentSelect({
                    size: "small",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    size: "small",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
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
                {createTransparentSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultOpen: true,
                    wrapperClassName: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createTransparentSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
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
                {createTransparentSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
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
                {createTransparentSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultOpen: true,
                    wrapperClassName: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createTransparentSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createTransparentSelect({
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
    )
    .add("item actions", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createTransparentSelect({
                    size: "small",
                    actions: [{ content: <a href="https://www.google.com">Google</a> }],
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createTransparentSelect({
                    actions: [{ content: <a href="https://www.google.com">Google</a> }],
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createTransparentSelect({
                    size: "large",
                    actions: [{ content: <a href="https://www.google.com">Google</a> }],
                    defaultOpen: true
                })}
            </div>
        </div>
    );
