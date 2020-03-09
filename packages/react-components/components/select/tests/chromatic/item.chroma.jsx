import { CalendarIcon } from "@orbit-ui/react-icons/src";
import { Select } from "@orbit-ui/react-select/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Select/item"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

function createMale(props = {}) {
    return { key: "Male", text: "Male", value: "Male", ...props };
}

function createFemale(props = {}) {
    return { key: "Female", text: "Female", value: "Female", ...props };
}

const GENDERS = [createMale(), createFemale()];

function createSelect({ options = GENDERS, ...otherProps } = {}) {
    return <Select
        options={options}
        {...otherProps}
    />;
}

stories()
    .add("default", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("active", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ active: true })],
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ active: true })],
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    options: [createMale(), createFemale({ active: true })],
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("selected", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ selected: true })],
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ selected: true })],
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    options: [createMale(), createFemale({ selected: true })],
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("disabled", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ disabled: true })],
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ disabled: true })],
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    options: [createMale(), createFemale({ disabled: true })],
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("description", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ description: "I am a description!" })],
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ description: "I am a description!" })],
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    options: [createMale(), createFemale({ description: "I am a description!" })],
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("icons left", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ icons: <CalendarIcon /> })],
                    size: "small",
                    defaultOpen: true,
                    className: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />] })],
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ icons: <CalendarIcon /> })],
                    defaultOpen: true,
                    className: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />] })],
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    options: [createMale(), createFemale({ icons: <CalendarIcon /> })],
                    size: "large",
                    defaultOpen: true,
                    className: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />] })],
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("icon right", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ icons: <CalendarIcon />, iconsPosition: "right" })],
                    size: "small",
                    defaultOpen: true,
                    className: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />], iconsPosition: "right" })],
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale(), createFemale({ icons: <CalendarIcon />, iconsPosition: "right" })],
                    defaultOpen: true,
                    className: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />], iconsPosition: "right" })],
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    options: [createMale(), createFemale({ icons: <CalendarIcon />, iconsPosition: "right" })],
                    size: "large",
                    defaultOpen: true,
                    className: "mr5"
                })}
                {createSelect({
                    options: [createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />], iconsPosition: "right" })],
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("avatar", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale({ avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } }), createFemale({ avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } })],
                    size: "small",
                    defaultOpen: true,
                    className: "mr5"
                })}
                {createSelect({
                    options: [createMale({ avatar: <img src="https://randomuser.me/api/portraits/men/14.jpg" alt="Male" /> }), createFemale({ avatar: <img src="https://randomuser.me/api/portraits/women/14.jpg" alt="Female" /> })],
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [createMale({ avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } }), createFemale({ avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } })],
                    defaultOpen: true,
                    className: "mr5"
                })}
                {createSelect({
                    options: [createMale({ avatar: <img src="https://randomuser.me/api/portraits/men/14.jpg" alt="Male" /> }), createFemale({ avatar: <img src="https://randomuser.me/api/portraits/women/14.jpg" alt="Female" /> })],
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    options: [createMale({ avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } }), createFemale({ avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } })],
                    size: "large",
                    defaultOpen: true,
                    className: "mr5"
                })}
                {createSelect({
                    options: [createMale({ avatar: <img src="https://randomuser.me/api/portraits/men/14.jpg" alt="Male" /> }), createFemale({ avatar: <img src="https://randomuser.me/api/portraits/women/14.jpg" alt="Female" /> })],
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    );
