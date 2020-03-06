import { CalendarIcon } from "@orbit-ui/react-icons";
import { Dropdown } from "@orbit-ui/react-dropdown/src";
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

export function createMale(props = {}) {
    return {
        key: "Male",
        text: "Male",
        value: "Male",
        ...props
    };
}

export function createFemale(props = {}) {
    return {
        key: "Female",
        text: "Female",
        value: "Female",
        ...props
    };
}

stories()
    .add("default", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale()]}
                    size="small"
                    defaultOpen
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale()]}
                    defaultOpen
                />
            </div>
            <div className="flex">
                <Dropdown
                    selection
                    options={[createMale(), createFemale()]}
                    size="large"
                    defaultOpen
                />
            </div>

        </div>
    )
    .add("active", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ active: true })]}
                    size="small"
                    defaultOpen
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ active: true })]}
                    defaultOpen
                />
            </div>
            <div className="flex">
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ active: true })]}
                    size="large"
                    defaultOpen
                />
            </div>
        </div>
    )
    .add("selected", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ selected: true })]}
                    size="small"
                    defaultOpen
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ selected: true })]}
                    defaultOpen
                />
            </div>
            <div className="flex">
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ selected: true })]}
                    size="large"
                    defaultOpen
                />
            </div>

        </div>
    )
    .add("disabled", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ disabled: true })]}
                    size="small"
                    defaultOpen
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ disabled: true })]}
                    defaultOpen
                />
            </div>
            <div className="flex">
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ disabled: true })]}
                    size="large"
                    defaultOpen
                />
            </div>

        </div>
    )
    .add("description", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ description: "I am a description!" })]}
                    size="small"
                    defaultOpen
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ description: "I am a description!" })]}
                    defaultOpen
                />
            </div>
            <div className="flex">
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ description: "I am a description!" })]}
                    size="large"
                    defaultOpen
                />
            </div>
        </div>
    )
    .add("icons left", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ icons: <CalendarIcon /> })]}
                    size="small"
                    defaultOpen
                    className="mr5"
                />
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />] })]}
                    size="small"
                    defaultOpen
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ icons: <CalendarIcon /> })]}
                    defaultOpen
                    className="mr5"
                />
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />] })]}
                    defaultOpen
                />
            </div>
            <div className="flex">
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ icons: <CalendarIcon /> })]}
                    size="large"
                    defaultOpen
                    className="mr5"
                />
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />] })]}
                    size="large"
                    defaultOpen
                />
            </div>
        </div>
    )
    .add("icon right", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ icons: <CalendarIcon />, iconsPosition: "right" })]}
                    size="small"
                    defaultOpen
                    className="mr5"
                />
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />], iconsPosition: "right" })]}
                    size="small"
                    defaultOpen
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ icons: <CalendarIcon />, iconsPosition: "right" })]}
                    defaultOpen
                    className="mr5"
                />
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />], iconsPosition: "right" })]}
                    defaultOpen
                />
            </div>
            <div className="flex">
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ icons: <CalendarIcon />, iconsPosition: "right" })]}
                    size="large"
                    defaultOpen
                    className="mr5"
                />
                <Dropdown
                    selection
                    options={[createMale(), createFemale({ icons: [<CalendarIcon />, <CalendarIcon />, <CalendarIcon />], iconsPosition: "right" })]}
                    size="large"
                    defaultOpen
                />
            </div>
        </div>
    )
    .add("raw", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), { raw: <a href="https://en.wikipedia.org/wiki/Female">Female</a>, value: "Female", key: "female" }]}
                    size="small"
                    defaultOpen
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), { raw: <a href="https://en.wikipedia.org/wiki/Female">Female</a>, value: "Female", key: "female" }]}
                    defaultOpen
                />
            </div>
            <div className="flex">
                <Dropdown
                    selection
                    options={[createMale(), { raw: <a href="https://en.wikipedia.org/wiki/Female">Female</a>, value: "Female", key: "female" }]}
                    size="large"
                    defaultOpen
                />
            </div>
        </div>
    )
    .add("avatar", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale({ avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } }), createFemale({ avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } })]}
                    size="small"
                    defaultOpen
                    className="mr5"
                />
                <Dropdown
                    selection
                    options={[createMale({ avatar: <img src="https://randomuser.me/api/portraits/men/14.jpg" alt="Male" /> }), createFemale({ avatar: <img src="https://randomuser.me/api/portraits/women/14.jpg" alt="Female" /> })]}
                    size="small"
                    defaultOpen
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale({ avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } }), createFemale({ avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } })]}
                    defaultOpen
                    className="mr5"
                />
                <Dropdown
                    selection
                    options={[createMale({ avatar: <img src="https://randomuser.me/api/portraits/men/14.jpg" alt="Male" /> }), createFemale({ avatar: <img src="https://randomuser.me/api/portraits/women/14.jpg" alt="Female" /> })]}
                    defaultOpen
                />
            </div>
            <div className="flex">
                <Dropdown
                    selection
                    options={[createMale({ avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } }), createFemale({ avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } })]}
                    size="large"
                    defaultOpen
                    className="mr5"
                />
                <Dropdown
                    selection
                    options={[createMale({ avatar: <img src="https://randomuser.me/api/portraits/men/14.jpg" alt="Male" /> }), createFemale({ avatar: <img src="https://randomuser.me/api/portraits/women/14.jpg" alt="Female" /> })]}
                    size="large"
                    defaultOpen
                />
            </div>
        </div>
    )
    .add("actions", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale()]}
                    actions={[{ content: <a href="https://www.google.com">Google</a> }]}
                    size="small"
                    defaultOpen
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    selection
                    options={[createMale(), createFemale()]}
                    actions={[{ content: <a href="https://www.google.com">Google</a> }]}
                    defaultOpen
                />
            </div>
            <div className="flex">
                <Dropdown
                    selection
                    options={[createMale(), createFemale()]}
                    actions={[{ content: <a href="https://www.google.com">Google</a> }]}
                    size="large"
                    defaultOpen
                />
            </div>
        </div>
    );
