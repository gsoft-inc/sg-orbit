import { AddIcon } from "@orbit-ui/react-icons";
import { Button } from "@orbit-ui/react-button";
import { Dropdown } from "semantic-ui-react";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Dropdown/inline"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

export const GENDERS = [
    {
        key: "Male",
        text: "Male",
        value: "Male"
    },
    {
        key: "Female",
        text: "Female",
        value: "Female"
    }
];

stories()
    .add("default", () =>
        <div className="flex">
            <Dropdown
                placeholder="Gender"
                inline
                options={GENDERS}
                className="mr5"
            />
            <Dropdown
                placeholder="Gender"
                inline
                options={GENDERS}
                defaultOpen
            />
        </div>
    )
    .add("in a block", () =>
        <div className="flex flex-column">
            <div className="mb12">
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et<br /> et lacus at euismod <Dropdown
                    placeholder="select gender"
                    inline
                    options={GENDERS}
                /> elementum viverra maximus.</div>
            </div>
            <div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et<br /> et lacus at euismod <Dropdown
                    placeholder="select gender"
                    inline
                    options={GENDERS}
                    defaultOpen
                /> elementum viverra maximus.</div>
            </div>
        </div>
    )
    .add("in a block", () =>
        <Dropdown
            placeholder="Gender"
            inline
            disabled
            options={GENDERS}
        />
    );
