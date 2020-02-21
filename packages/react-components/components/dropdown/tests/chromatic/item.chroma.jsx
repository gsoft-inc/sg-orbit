import { CalendarIcon } from "@orbit-ui/react-icons";
import { Dropdown } from "@orbit-ui/react-dropdown/src";
// import { Dropdown } from "semantic-ui-react";
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
    .add("icon before content", () =>
        <Dropdown
            selection
            options={[createMale(), createFemale({ icon: <CalendarIcon /> })]}
            defaultOpen
        />
    )
    .add("icon in content", () =>
        <Dropdown
            selection
            options={[createMale(), createFemale(), { content: <span>With icon <CalendarIcon /></span>, value: "Frank the tank" }]}
            defaultOpen
        />
    )
    .add("content", () =>
        <Dropdown
            selection
            options={[createMale(), { content: <a href="https://en.wikipedia.org/wiki/Female">Female</a>, value: "Female" }]}
            defaultOpen
        />
    )
    .add("actions", () =>
        <Dropdown
            selection
            options={[createMale(), createFemale()]}
            actions={[{ content: <a href="https://www.google.com">Google</a> }]}
            defaultOpen
        />
    );
