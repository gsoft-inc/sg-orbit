import { CalendarIcon } from "@orbit-ui/react-icons";
import { Dropdown } from "@orbit-ui/react-dropdown/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Dropdown/item"))
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
        <Dropdown
            selection
            options={[createMale(), createFemale()]}
            defaultOpen
        />
    )
    .add("active", () =>
        <Dropdown
            selection
            options={[createMale(), createFemale({ active: true })]}
            defaultOpen
        />
    )
    .add("selected", () =>
        <Dropdown
            selection
            options={[createMale(), createFemale({ selected: true })]}
            defaultOpen
        />
    )
    .add("disabled", () =>
        <Dropdown
            selection
            options={[createMale(), createFemale({ disabled: true })]}
            defaultOpen
        />
    )
    .add("description", () =>
        <Dropdown
            selection
            options={[createMale(), createFemale({ description: "I am a description!" })]}
            defaultOpen
        />
    )
    .add("icons left", () =>
        <div className="flex">
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
    )
    .add("icon right", () =>
        <div className="flex">
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
    )
    .add("raw", () =>
        <Dropdown
            selection
            options={[createMale(), { raw: <a href="https://en.wikipedia.org/wiki/Female">Female</a>, value: "Female", key: "female" }]}
            defaultOpen
        />
    )
    .add("avatar", () =>
        <div className="flex">
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
    )
    .add("actions", () =>
        <Dropdown
            selection
            options={[createMale(), createFemale()]}
            actions={[{ content: <a href="https://www.google.com">Google</a> }]}
            defaultOpen
        />
    );
