import { CalendarIcon, MagnifierIcon } from "@react-components/icons";
import { Select } from "@react-components/select";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@stories/utils";

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
                    size="sm"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    size="sm"
                    defaultValue={["Female", "Male"]}
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    size="sm"
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
                    size="lg"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    size="lg"
                    defaultValue={["Female", "Male"]}
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    size="lg"
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
                    size="sm"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    loading
                    defaultValue={["Female"]}
                    size="sm"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    loading
                    size="sm"
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
                    size="lg"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    loading
                    defaultValue={["Female"]}
                    size="lg"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    loading
                    size="lg"
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
                    size="sm"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    defaultValue={["Male"]}
                    size="sm"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    size="sm"
                    open
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    size="sm"
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
                    size="lg"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    defaultValue={["Male"]}
                    size="lg"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    size="lg"
                    open
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    icon={<MagnifierIcon />}
                    size="lg"
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
                    size="sm"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    search
                    size="sm"
                    defaultValue={["Female", "Male"]}
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    search
                    size="sm"
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
                    size="lg"
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    search
                    size="lg"
                    defaultValue={["Female", "Male"]}
                    wrapperClassName="mr5"
                />
                <MultipleSelect
                    search
                    size="lg"
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
                    size="sm"
                    wrapperClassName="mr5"
                />
                <AvatarMultipleSelect
                    size="sm"
                    defaultValue={["Female"]}
                    wrapperClassName="mr5"
                />
                <AvatarMultipleSelect
                    size="sm"
                    open
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <AvatarMultipleSelect
                    wrapperClassName="mr5"
                />
                <AvatarMultipleSelect
                    defaultValue={["Female"]}
                    wrapperClassName="mr5"
                />
                <AvatarMultipleSelect
                    open
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <AvatarMultipleSelect
                    size="lg"
                    wrapperClassName="mr5"
                />
                <AvatarMultipleSelect
                    size="lg"
                    defaultValue={["Female"]}
                    wrapperClassName="mr5"
                />
                <AvatarMultipleSelect
                    size="lg"
                    open
                />
            </div>
        </div>
    )
    .add("item icons", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <IconsMultipleSelect
                    size="sm"
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    size="sm"
                    defaultValue={["Female"]}
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    size="sm"
                    defaultValue={["Female"]}
                    iconsPosition="right"
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    size="sm"
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
                    size="lg"
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    size="lg"
                    defaultValue={["Female"]}
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    size="lg"
                    defaultValue={["Female"]}
                    iconsPosition="right"
                    wrapperClassName="mr5"
                />
                <IconsMultipleSelect
                    size="lg"
                    open
                    wrapperClassName="mr5"
                />
            </div>
        </div>
    );
