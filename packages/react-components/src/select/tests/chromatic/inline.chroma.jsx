/* eslint max-len: 0 */
import { CalendarIcon, MagnifierIcon } from "@react-components/icons";
import { Select } from "@react-components/select";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Select/inline"))
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

const GENDERS_WITH_AVATAR = [
    { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
    { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
];

const GENDERS_WITH_ICONS = [
    { ...MALE, icons: <CalendarIcon /> },
    { ...FEMALE, icons: <CalendarIcon /> }
];

const GENDERS_WITH_ICONS_RIGHT = [
    { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
    { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
];

function createInlineSelect({ options = GENDERS, ...otherProps } = {}) {
    return <Select
        placeholder="select gender"
        inline
        options={options}
        {...otherProps}
    />;
}

stories()
    .add("default", () =>
        <div className="flex">
            {createInlineSelect({
                className: "mr5"
            })}
            {createInlineSelect({
                defaultOpen: true
            })}
        </div>
    )
    .add("selected value", () =>
        <div className="flex">
            {createInlineSelect({
                defaultValue: "Female",
                className: "mr5"
            })}
            {createInlineSelect({
                defaultValue: "Female",
                defaultOpen: true
            })}
        </div>
    )
    .add("in a block", () =>
        <div className="flex flex-column">
            <div className="mb12">
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect()}elementum viverra maximus.
                </div>
            </div>
            <div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect({ defaultOpen: true })}elementum viverra maximus.
                </div>
            </div>
        </div>
    )
    .add("disabled", () =>
        createInlineSelect({
            disabled: true
        })
    )
    .add("error", () =>
        <div className="flex">
            {createInlineSelect({
                error: true,
                className: "mr5"
            })}
            {createInlineSelect({
                error: true,
                defaultOpen: true
            })}
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect({ icon: <MagnifierIcon /> })}elementum viverra maximus.
            </div>
            <div className="mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect({ icon: <MagnifierIcon /> })}elementum viverra maximus.
            </div>
            <div className="f5 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect({ icon: <MagnifierIcon /> })}elementum viverra maximus.
            </div>
            <div className="f1 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et lacus at euismod {createInlineSelect({ icon: <MagnifierIcon /> })}elementum viverra maximus.
            </div>
            <div className="f5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect({ icon: <MagnifierIcon />, disabled: true })}elementum viverra maximus.
            </div>
        </div>
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect()}elementum viverra maximus.
            </div>
            <div className="mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect()}elementum viverra maximus.
            </div>
            <div className="f5 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect()}elementum viverra maximus.
            </div>
            <div className="f1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et lacus at euismod {createInlineSelect()}elementum viverra maximus.
            </div>
        </div>
    )
    .add("item avatar", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">
                Lorem ipsum dolor sit {createInlineSelect({ options: GENDERS_WITH_AVATAR })}, consectetur adipiscing elit {createInlineSelect({ options: GENDERS_WITH_AVATAR, defaultValue: "Female" })}. Pellentesque vestibulum <br /> et lacus at euismod elementum viverra maximus.
            </div>
            <div className="mb12">
                Lorem ipsum dolor sit {createInlineSelect({ options: GENDERS_WITH_AVATAR })}, consectetur adipiscing elit {createInlineSelect({ options: GENDERS_WITH_AVATAR, defaultValue: "Female" })}. Pellentesque vestibulum <br /> et lacus at euismod elementum viverra maximus.
            </div>
            <div className="f5 mb12">
                Lorem ipsum dolor sit {createInlineSelect({ options: GENDERS_WITH_AVATAR })}, consectetur adipiscing elit {createInlineSelect({ options: GENDERS_WITH_AVATAR, defaultValue: "Female" })}. Pellentesque vestibulum <br /> et lacus at euismod elementum viverra maximus.
            </div>
            <div className="f1">
                Lorem ipsum dolor sit {createInlineSelect({ options: GENDERS_WITH_AVATAR })}, consectetur adipiscing elit {createInlineSelect({ options: GENDERS_WITH_AVATAR, defaultValue: "Female" })}. Pellentesque vestibulum <br /> et lacus at euismod elementum viverra maximus.
            </div>
        </div>
    )
    .add("item icons", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">
                Lorem ipsum dolor sit {createInlineSelect({ options: GENDERS_WITH_ICONS })}, consectetur adipiscing elit {createInlineSelect({ options: GENDERS_WITH_ICONS, defaultValue: "Female" })}. Pellentesque vestibulum <br /> et lacus at {createInlineSelect({ options: GENDERS_WITH_ICONS_RIGHT, defaultValue: "Female" })} euismod elementum viverra maximus.
            </div>
            <div className="mb12">
                Lorem ipsum dolor sit {createInlineSelect({ options: GENDERS_WITH_ICONS })}, consectetur adipiscing elit {createInlineSelect({ options: GENDERS_WITH_ICONS, defaultValue: "Female" })}. Pellentesque vestibulum <br /> et lacus at {createInlineSelect({ options: GENDERS_WITH_ICONS_RIGHT, defaultValue: "Female" })} euismod elementum viverra maximus.
            </div>
            <div className="f5 mb12">
                Lorem ipsum dolor sit {createInlineSelect({ options: GENDERS_WITH_ICONS })}, consectetur adipiscing elit {createInlineSelect({ options: GENDERS_WITH_ICONS, defaultValue: "Female" })}. Pellentesque vestibulum <br /> et lacus at {createInlineSelect({ options: GENDERS_WITH_ICONS_RIGHT, defaultValue: "Female" })} euismod elementum viverra maximus.
            </div>
            <div className="f1">
                Lorem ipsum dolor sit {createInlineSelect({ options: GENDERS_WITH_ICONS })}, consectetur adipiscing elit {createInlineSelect({ options: GENDERS_WITH_ICONS, defaultValue: "Female" })}. Pellentesque vestibulum <br /> et lacus at {createInlineSelect({ options: GENDERS_WITH_ICONS_RIGHT, defaultValue: "Female" })} euismod elementum viverra maximus.
            </div>
        </div>
    );
