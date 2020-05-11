import { CalendarIcon, MagnifierIcon } from "@react-components/icons";
import { Select } from "@react-components/select";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Select/searchable"))
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

function createSearchableSelect({ options = GENDERS, ...otherProps } = {}) {
    return <Select
        placeholder="Gender"
        search
        options={options}
        {...otherProps}
    />;
}

stories()
    .add("default", () =>
        <div className="flex">
            {createSearchableSelect({
                className: "mr5"
            })}
            {createSearchableSelect({
                defaultOpen: true
            })}
        </div>
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSearchableSelect({
                    className: "mr5",
                    size: "small"
                })}
                {createSearchableSelect({
                    defaultValue: "Male",
                    className: "mr5",
                    size: "small"
                })}
                {createSearchableSelect({
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSearchableSelect({
                    className: "mr5"
                })}
                {createSearchableSelect({
                    defaultValue: "Male",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSearchableSelect({
                    className: "mr5",
                    size: "large"
                })}
                {createSearchableSelect({
                    defaultValue: "Male",
                    className: "mr5",
                    size: "large"
                })}
                {createSearchableSelect({
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("disabled", () =>
        createSearchableSelect({
            className: "mr5",
            disabled: true
        })
    )
    .add("error", () =>
        <div className="flex">
            {createSearchableSelect({
                error: true,
                className: "mr5"
            })}
            {createSearchableSelect({
                error: true,
                className: "mr5",
                defaultOpen: true
            })}
        </div>
    )
    .add("loading", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSearchableSelect({
                    loading: true,
                    size: "small",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    loading: true,
                    defaultValue: "Female",
                    size: "small",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    loading: true,
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSearchableSelect({
                    loading: true,
                    className: "mr5"
                })}
                {createSearchableSelect({
                    loading: true,
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    loading: true,
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSearchableSelect({
                    loading: true,
                    size: "large",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    loading: true,
                    defaultValue: "Female",
                    size: "large",
                    className: "mr5"
                })}
                {createSearchableSelect({
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
                {createSearchableSelect({
                    clearable: true,
                    defaultValue: "Male",
                    size: "small",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    clearable: true,
                    defaultValue: "Male",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    clearable: true,
                    defaultValue: "Male",
                    size: "large"

                })}
            </div>
            <div className="flex">
                {createSearchableSelect({
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
                {createSearchableSelect({
                    icon: <MagnifierIcon />,
                    size: "small",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: "Male",
                    size: "small",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    icon: <MagnifierIcon />,
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSearchableSelect({
                    icon: <MagnifierIcon />,
                    className: "mr5"
                })}
                {createSearchableSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: "Male",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    icon: <MagnifierIcon />,
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSearchableSelect({
                    icon: <MagnifierIcon />,
                    size: "large",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: "Male",
                    size: "large",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    icon: <MagnifierIcon />,
                    size: "large",
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSearchableSelect({
                    icon: <MagnifierIcon />,
                    disabled: true
                })}
            </div>
        </div>
    )
    .add("item avatar", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSearchableSelect({
                    size: "small",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    className: "mr5"
                })}
                {createSearchableSelect({
                    size: "small",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSearchableSelect({
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
                {createSearchableSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    className: "mr5"
                })}
                {createSearchableSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultOpen: true,
                    className: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSearchableSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    className: "mr5"
                })}
                {createSearchableSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSearchableSelect({
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
                {createSearchableSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    className: "mr5"
                })}
                {createSearchableSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSearchableSelect({
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
                {createSearchableSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    className: "mr5"
                })}
                {createSearchableSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultOpen: true,
                    className: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSearchableSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    className: "mr5"
                })}
                {createSearchableSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSearchableSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: "Female",
                    className: "mr5"
                })}
                {createSearchableSelect({
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
