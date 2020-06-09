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

function MultipleSelect(props) {
    return (
        <Select
            placeholder="Gender"
            multiple
            options={[
                MALE,
                FEMALE
            ]}
            {...props}
        />
    );
}

function AvatarMultipleSelect(props) {
    return (
        <Select
            placeholder="Gender"
            multiple
            options={[
                { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
            ]}
            {...props}
        />
    );
}

function IconsMultipleSelect({ iconsPosition = "left", ...rest }) {
    return (
        <Select
            placeholder="Gender"
            multiple
            options={[
                { ...MALE, icons: <CalendarIcon />, iconsPosition },
                { ...FEMALE, icons: <CalendarIcon />, iconsPosition }
            ]}
            {...rest}
        />
    );
}

stories()
    .add("default", () =>
        <MultipleSelect />
    )
    .add("open", () =>
        <MultipleSelect open />
    )
    .add("default open", () =>
        <MultipleSelect defaultOpen />
    )
    .add("selected value", () =>
        <div className="flex">
            <MultipleSelect
                defaultValue={["Female"]}
                wrapperClassName="mr5"
            />
            <MultipleSelect
                defaultValue={["Female", "Male"]}
                wrapperClassName="mr5"
            />
            <MultipleSelect
                defaultValue={["Female"]}
                open
            />
        </div>
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ "marginBottom": "150px" }}>
                <MultipleSelect
                    size="small"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    size="small"
                    defaultValue={["Female", "Male"]}
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    size="small"
                    open
                />
            </div>
            <div className="flex" style={{ "marginBottom": "150px" }}>
                <MultipleSelect
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    defaultValue={["Female", "Male"]}
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    open
                />
            </div>
            <div className="flex">
                <MultipleSelect
                    size="large"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    size="large"
                    defaultValue={["Female", "Male"]}
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    size="large"
                    open
                />
            </div>
        </div>
    )
    .add("fluid", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <MultipleSelect
                    fluid
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    fluid
                    defaultOpen
                />
            </div>
            <div className="flex">
                <div className="w-30 mr5">
                    <MultipleSelect
                        fluid
                    />
                </div>
                <div className="w-30">
                    <MultipleSelect
                        fluid
                        defaultOpen
                    />
                </div>
            </div>
        </div>
    )
    .add("interaction states", () =>
        <div className="flex">
            <MultipleSelect
                active
                wrapperClassName="mr5"
            />
            <MultipleSelect
                focus
                wrapperClassName="mr5"
            />
            <MultipleSelect
                hover
                wrapperClassName="mr5"
            />
            <MultipleSelect
                focus
                hover
            />
        </div>
    )
    .add("disabled", () =>
        <div className="flex">
            <MultipleSelect
                disabled
                wrapperClassName="mr5"
            />
            <MultipleSelect
                disabled
                defaultValue={["Female", "Male"]}
                wrapperClassName="mr5"
            />
        </div>
    )
    .add("error", () =>
        <div className="flex">
            <MultipleSelect
                error
                wrapperClassName="mr5"
            />
            <MultipleSelect
                error
                wrapperClassName="mr5"
                open
            />
        </div>
    )
    .add("loading", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <MultipleSelect
                    loading
                    size="small"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    loading
                    defaultValue={["Female"]}
                    size="small"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    loading
                    size="small"
                    open
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <MultipleSelect
                    loading
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    loading
                    defaultValue={["Female"]}
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    loading
                    open
                />
            </div>
            <div className="flex">
                <MultipleSelect
                    loading
                    size="large"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    loading
                    defaultValue={["Female"]}
                    size="large"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    loading
                    size="large"
                    open
                />
            </div>
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    size="small"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    defaultValue={["Male"]}
                    size="small"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    size="small"
                    open
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    size="small"
                    search
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    defaultValue={["Male"]}
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    open
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    search
                />
            </div>
            <div className="flex">
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    size="large"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    defaultValue={["Male"]}
                    size="large"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    size="large"
                    open
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    size="large"
                    search
                />
            </div>
        </div>
    )
    .add("searchable", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ "marginBottom": "150px" }}>
                <MultipleSelect
                    search
                    size="small"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    search
                    size="small"
                    defaultValue={["Female", "Male"]}
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    search
                    size="small"
                    open
                />
            </div>
            <div className="flex" style={{ "marginBottom": "150px" }}>
                <MultipleSelect
                    search
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    search
                    defaultValue={["Female", "Male"]}
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    search
                    open
                />
            </div>
            <div className="flex" style={{ "marginBottom": "150px" }}>
                <MultipleSelect
                    search
                    size="large"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    search
                    size="large"
                    defaultValue={["Female", "Male"]}
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    search
                    size="large"
                    open
                />
            </div>
            <div className="flex">
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    disabled
                />
            </div>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <MultipleSelect
                wrapperClassName="border-red mr5"
            />
            <MultipleSelect
                wrapperClassName="mr5"
                wrapperStyle={{
                    border: "1px solid red"
                }}
            />
            <MultipleSelect
                wrapperClassName="mr5"
                className="border-red"
            />
            <MultipleSelect
                style={{
                    border: "1px solid red"
                }}
            />
        </div>
    )
    .add("item avatar", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <AvatarMultipleSelect
                    size="small"
                    style={{
                        border: "1px solid red"
                    }}
                    wrapperClassName="mr5"
                />
                <AvatarMultipleSelect
                    size="small"
                    style={{
                        border: "1px solid red"
                    }}
                    defaultValue={["Female"]}
                    wrapperClassName="mr5"
                />
                <AvatarMultipleSelect
                    size="small"
                    style={{
                        border: "1px solid red"
                    }}
                    open
                    wrapperClassName="mr5"
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <AvatarMultipleSelect
                    style={{
                        border: "1px solid red"
                    }}
                    wrapperClassName="mr5"
                />
                <AvatarMultipleSelect
                    style={{
                        border: "1px solid red"
                    }}
                    defaultValue={["Female"]}
                    wrapperClassName="mr5"
                />
                <AvatarMultipleSelect
                    style={{
                        border: "1px solid red"
                    }}
                    open
                    wrapperClassName="mr5"
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <AvatarMultipleSelect
                    size="large"
                    style={{
                        border: "1px solid red"
                    }}
                    wrapperClassName="mr5"
                />
                <AvatarMultipleSelect
                    size="large"
                    style={{
                        border: "1px solid red"
                    }}
                    defaultValue={["Female"]}
                    wrapperClassName="mr5"
                />
                <AvatarMultipleSelect
                    size="large"
                    style={{
                        border: "1px solid red"
                    }}
                    open
                    wrapperClassName="mr5"
                />
            </div>
        </div>
    )
    .add("item icons", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <IconsMultipleSelect
                    size="small"
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    size="small"
                    defaultValue={["Female"]}
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    size="small"
                    defaultValue={["Female"]}
                    iconsPosition="right"
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    size="small"
                    open
                    wrapperClassName="mr5"
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <IconsMultipleSelect
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    defaultValue={["Female"]}
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    defaultValue={["Female"]}
                    iconsPosition="right"
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    open
                    wrapperClassName="mr5"
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <IconsMultipleSelect
                    size="large"
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    size="large"
                    defaultValue={["Female"]}
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    size="large"
                    defaultValue={["Female"]}
                    iconsPosition="right"
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    size="large"
                    open
                    wrapperClassName="mr5"
                />
            </div>
        </div>
    );
