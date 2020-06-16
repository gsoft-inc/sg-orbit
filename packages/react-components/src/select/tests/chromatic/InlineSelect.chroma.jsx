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

function InlineSelect(props) {
    return (
        <Select
            placeholder="select gender"
            inline
            options={[
                MALE,
                FEMALE
            ]}
            {...props}
        />
    );
}

function IconsInlineSelect({ iconsPosition = "left", ...rest }) {
    return (
        <Select
            placeholder="select gender"
            inline
            options={[
                { ...MALE, icons: <CalendarIcon />, iconsPosition },
                { ...FEMALE, icons: <CalendarIcon />, iconsPosition }
            ]}
            {...rest}
        />
    );
}

function AvatarInlineSelect(props) {
    return (
        <Select
            placeholder="select gender"
            inline
            options={[
                { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
            ]}
            {...props}
        />
    );
}

stories()
    .add("default", () =>
        <InlineSelect />
    )
    .add("open", () =>
        <InlineSelect open />
    )
    .add("default open", () =>
        <InlineSelect defaultOpen />
    )
    .add("selected value", () =>
        <div className="flex">
            <InlineSelect
                defaultValue="Female"
                wrapperClassName="mr5"
            />
            <InlineSelect
                defaultValue="Female"
                open
            />
        </div>
    )
    .add("in a block", () =>
        <div className="flex flex-column">
            <div className="mb12">
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect />elementum viverra maximus.
                </div>
            </div>
            <div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect open />elementum viverra maximus.
                </div>
            </div>
        </div>
    )
    .add("interaction states", () =>
        <div className="flex">
            <InlineSelect
                active
                wrapperClassName="mr5"
            />
            <InlineSelect
                focus
                wrapperClassName="mr5"
            />
            <InlineSelect
                hover
                wrapperClassName="mr5"
            />
            <InlineSelect
                focus
                hover
            />
        </div>
    )
    .add("disabled", () =>
        <InlineSelect
            disabled
        />
    )
    .add("loading", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">
                Lore euismod <InlineSelect loading />elementum viverra maximus.
            </div>
            <div className="mb12">
                Lore euismod <InlineSelect loading />elementum viverra maximus.
            </div>
            <div className="f6 mb12">
                Lore euismod <InlineSelect loading />elementum viverra maximus.
            </div>
            <div className="f5 mb12">
                Lore euismod <InlineSelect loading />elementum viverra maximus.
            </div>
            <div className="f1">
                Lore euismod <InlineSelect loading />elementum viverra maximus.
            </div>
        </div>
    )
    .add("error", () =>
        <div className="flex">
            <InlineSelect
                error
                wrapperClassName="mr5"
            />
            <InlineSelect
                error
                open
            />
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect icon={<MagnifierIcon />} />elementum viverra maximus.
            </div>
            <div className="mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect icon={<MagnifierIcon />} />elementum viverra maximus.
            </div>
            <div className="f6 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect icon={<MagnifierIcon />} />elementum viverra maximus.
            </div>
            <div className="f5 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect icon={<MagnifierIcon />} />elementum viverra maximus.
            </div>
            <div className="f1 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et lacus at euismod <InlineSelect icon={<MagnifierIcon />} />elementum viverra maximus.
            </div>
            <div className="f5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect icon={<MagnifierIcon />} disabled />elementum viverra maximus.
            </div>
        </div>
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect />elementum viverra maximus.
            </div>
            <div className="mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect />elementum viverra maximus.
            </div>
            <div className="f6 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect />elementum viverra maximus.
            </div>
            <div className="f5 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <InlineSelect />elementum viverra maximus.
            </div>
            <div className="f1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et lacus at euismod <InlineSelect />elementum viverra maximus.
            </div>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <InlineSelect
                wrapperClassName="border-red mr5"
            />
            <InlineSelect
                wrapperClassName="border-red mr5"
                wrapperStyle={{
                    border: "1px solid red"
                }}
            />
            <InlineSelect
                wrapperClassName="mr5"
                className="border-red"
            />
            <InlineSelect
                style={{
                    border: "1px solid red"
                }}
            />
        </div>
    )
    .add("item avatar", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">
                Lorem ipsum dolor sit <AvatarInlineSelect />, consectetur adipiscing elit <AvatarInlineSelect defaultValue="Female" />. Pellentesque vestibulum <br /> et lacus at euismod elementum viverra maximus.
            </div>
            <div className="mb12">
                Lorem ipsum dolor sit <AvatarInlineSelect />, consectetur adipiscing elit <AvatarInlineSelect defaultValue="Female" />. Pellentesque vestibulum <br /> et lacus at euismod elementum viverra maximus.
            </div>
            <div className="f6 mb12">
                Lorem ipsum dolor sit <AvatarInlineSelect />, consectetur adipiscing elit <AvatarInlineSelect defaultValue="Female" />. Pellentesque vestibulum <br /> et lacus at euismod elementum viverra maximus.
            </div>
            <div className="f5 mb12">
                Lorem ipsum dolor sit <AvatarInlineSelect />, consectetur adipiscing elit <AvatarInlineSelect defaultValue="Female" />. Pellentesque vestibulum <br /> et lacus at euismod elementum viverra maximus.
            </div>
            <div className="f1">
                Lorem ipsum dolor sit <AvatarInlineSelect />, consectetur adipiscing elit <AvatarInlineSelect defaultValue="Female" />. Pellentesque vestibulum <br /> et lacus at euismod elementum viverra maximus.
            </div>
        </div>
    )
    .add("item icons", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">
                Lorem ipsum dolor sit <IconsInlineSelect />, consectetur adipiscing elit <IconsInlineSelect defaultValue="Female" />. Pellentesque vestibulum <br /> et lacus at <IconsInlineSelect defaultValue="Female" iconsPosition="right" /> euismod elementum viverra maximus.
            </div>
            <div className="mb12">
                Lorem ipsum dolor sit <IconsInlineSelect />, consectetur adipiscing elit <IconsInlineSelect defaultValue="Female" />. Pellentesque vestibulum <br /> et lacus at <IconsInlineSelect defaultValue="Female" iconsPosition="right" /> euismod elementum viverra maximus.
            </div>
            <div className="f6 mb12">
                Lorem ipsum dolor sit <IconsInlineSelect />, consectetur adipiscing elit <IconsInlineSelect defaultValue="Female" />. Pellentesque vestibulum <br /> et lacus at <IconsInlineSelect defaultValue="Female" iconsPosition="right" /> euismod elementum viverra maximus.
            </div>
            <div className="f5 mb12">
                Lorem ipsum dolor sit <IconsInlineSelect />, consectetur adipiscing elit <IconsInlineSelect defaultValue="Female" />. Pellentesque vestibulum <br /> et lacus at <IconsInlineSelect defaultValue="Female" iconsPosition="right" /> euismod elementum viverra maximus.
            </div>
            <div className="f1">
                Lorem ipsum dolor sit <IconsInlineSelect />, consectetur adipiscing elit <IconsInlineSelect defaultValue="Female" />. Pellentesque vestibulum <br /> et lacus at <IconsInlineSelect defaultValue="Female" iconsPosition="right" /> euismod elementum viverra maximus.
            </div>
        </div>
    );
