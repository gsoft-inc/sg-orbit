import { CalendarIcon, MagnifierIcon } from "@react-components/icons";
import { cloneElement } from "react";

const MALE = { key: "Male", text: "Male", value: "Male" };
const FEMALE = { key: "Female", text: "Female", value: "Female" };

function Select({ element, ...rest }) {
    return cloneElement(element, {
        placeholder: "Gender",
        options: [
            MALE,
            FEMALE
        ],
        ...rest
    });
}

function AvatarSelect({ element, ...rest }) {
    return cloneElement(element, {
        placeholder: "Gender",
        options: [
            { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
            { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
        ],
        ...rest
    });
}

function IconsSelect({ element, iconsPosition = "left", ...rest }) {
    return cloneElement(element, {
        placeholder: "Gender",
        options: [
            { ...MALE, icons: <CalendarIcon />, iconsPosition },
            { ...FEMALE, icons: <CalendarIcon />, iconsPosition }
        ],
        ...rest
    });
}

export function createTestSuite(select, stories) {
    return stories
        .add("default", () =>
            <Select element={select} />
        )
        .add("open", () =>
            <Select element={select} open />
        )
        .add("defaultOpen", () =>
            <Select element={select} defaultOpen />
        )
        .add("selected value", () =>
            <div className="flex">
                <Select element={select} defaultValue="Female" wrapperClassName="mr5" />
                <Select element={select} defaultValue="Female" open />
            </div>
        )
        .add("size", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <Select element={select} size="small" wrapperClassName="mr5" />
                    <Select element={select} size="small" defaultValue="Female" wrapperClassName="mr5" />
                    <Select element={select} size="small" defaultValue="Female" open />
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <Select element={select} wrapperClassName="mr5" />
                    <Select element={select} defaultValue="Female" wrapperClassName="mr5" />
                    <Select element={select} defaultValue="Female" open />
                </div>
                <div className="flex">
                    <Select element={select} size="large" wrapperClassName="mr5" />
                    <Select element={select} size="large" defaultValue="Female" wrapperClassName="mr5" />
                    <Select element={select} size="large" defaultValue="Female" open />
                </div>
            </div>
        )
        .add("fluid", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <Select element={select} fluid wrapperClassName="mr5" />
                    <Select element={select} fluid open />
                </div>
                <div className="flex">
                    <div className="w-30 mr5">
                        <Select element={select} fluid />
                    </div>
                    <div className="w-30">
                        <Select element={select} fluid open />
                    </div>
                </div>
            </div>
        )
        .add("interaction states", () =>
            <div className="flex">
                <Select element={select} active wrapperClassName="mr5" />
                <Select element={select} focus wrapperClassName="mr5" />
                <Select element={select} hover wrapperClassName="mr5" />
                <Select element={select} focus hover />
            </div>
        )
        .add("disabled", () =>
            <div className="flex">
                <Select element={select} disabled wrapperClassName="mr5" />
                <Select element={select} disabled defaultValue="Female" />
            </div>
        )
        .add("clearable", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <Select element={select} clearable defaultValue="Female" size="small" wrapperClassName="mr5" />
                    <Select element={select} clearable defaultValue="Female" wrapperClassName="mr5" />
                    <Select element={select} clearable defaultValue="Female" size="large" wrapperClassName="mr5" />
                </div>
                <div className="flex">
                    <Select element={select} clearable defaultValue="Female" open />
                </div>
            </div>
        )
        .add("error", () =>
            <div className="flex">
                <Select element={select} error wrapperClassName="mr5" />
                <Select element={select} error open />
            </div>
        )
        .add("loading", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <Select element={select} loading size="small" wrapperClassName="mr5" />
                    <Select element={select} loading size="small" defaultValue="Female" wrapperClassName="mr5" />
                    <Select element={select} loading size="small" open />
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <Select element={select} loading wrapperClassName="mr5" />
                    <Select element={select} loading defaultValue="Female" wrapperClassName="mr5" />
                    <Select element={select} loading open />
                </div>
                <div className="flex">
                    <Select element={select} loading size="large" wrapperClassName="mr5" />
                    <Select element={select} loading size="large" defaultValue="Female" wrapperClassName="mr5" />
                    <Select element={select} loading size="large" open />
                </div>
            </div>
        )
        .add("upward", () =>
            <div style={{ marginTop: "50px" }}>
                <Select element={select} upward open />
            </div>
        )
        .add("icon", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <Select element={select} icon={<MagnifierIcon />} size="small" wrapperClassName="mr5" />
                    <Select element={select} icon={<MagnifierIcon />} size="small" defaultValue="Male" wrapperClassName="mr5" />
                    <Select element={select} icon={<MagnifierIcon />} size="small" open />
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <Select element={select} icon={<MagnifierIcon />} wrapperClassName="mr5" />
                    <Select element={select} icon={<MagnifierIcon />} defaultValue="Male" wrapperClassName="mr5" />
                    <Select element={select} icon={<MagnifierIcon />} open />
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <Select element={select} icon={<MagnifierIcon />} size="large" wrapperClassName="mr5" />
                    <Select element={select} icon={<MagnifierIcon />} size="large" defaultValue="Male" wrapperClassName="mr5" />
                    <Select element={select} icon={<MagnifierIcon />} size="large" open />
                </div>
                <div className="flex">
                    <Select element={select} icon={<MagnifierIcon />} disabled />
                </div>
            </div>
        )
        .add("styling", () =>
            <div className="flex">
                <Select element={select} wrapperClassName="border-red mr5" />
                <Select
                    element={select}
                    wrapperClassName="mr5"
                    wrapperStyle={{
                        border: "1px solid red"
                    }}
                />
                <Select element={select} wrapperClassName="mr5" className="border-red" />
                <Select
                    element={select}
                    style={{
                        border: "1px solid red"
                    }}
                />
            </div>
        )
        .add("item avatar", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <AvatarSelect element={select} size="small" wrapperClassName="mr5" />
                    <AvatarSelect element={select} size="small" defaultValue="Female" wrapperClassName="mr5" />
                    <AvatarSelect element={select} size="small" open />
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <AvatarSelect element={select} wrapperClassName="mr5" />
                    <AvatarSelect element={select} defaultValue="Female" wrapperClassName="mr5" />
                    <AvatarSelect element={select} open />
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <AvatarSelect element={select} size="large" wrapperClassName="mr5" />
                    <AvatarSelect element={select} size="large" defaultValue="Female" wrapperClassName="mr5" />
                    <AvatarSelect element={select} size="large" open />
                </div>
            </div>
        )
        .add("item icons", () =>
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <IconsSelect element={select} size="small" wrapperClassName="mr5" />
                    <IconsSelect element={select} size="small" defaultValue="Female" wrapperClassName="mr5" />
                    <IconsSelect element={select} size="small" defaultValue="Female" iconsPosition="right" wrapperClassName="mr5" />
                    <IconsSelect element={select} size="small" open />
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <IconsSelect element={select} wrapperClassName="mr5" />
                    <IconsSelect element={select} defaultValue="Female" wrapperClassName="mr5" />
                    <IconsSelect element={select} defaultValue="Female" iconsPosition="right" wrapperClassName="mr5" />
                    <IconsSelect element={select} open />
                </div>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <IconsSelect element={select} size="large" wrapperClassName="mr5" />
                    <IconsSelect element={select} size="large" defaultValue="Female" wrapperClassName="mr5" />
                    <IconsSelect element={select} size="large" defaultValue="Female" iconsPosition="right" wrapperClassName="mr5" />
                    <IconsSelect element={select} size="large" open />
                </div>
            </div>
        );

}
