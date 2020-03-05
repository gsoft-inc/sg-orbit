import { Dropdown } from "@orbit-ui/react-dropdown/src";
import { MagnifierIcon } from "@orbit-ui/react-icons";
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
    .add("selected value", () =>
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
                value="Male"
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
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <Dropdown
                    placeholder="select gender"
                    inline
                    options={GENDERS}
                /> elementum viverra maximus.</div>
            </div>
            <div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <Dropdown
                    placeholder="select gender"
                    inline
                    options={GENDERS}
                    defaultOpen
                /> elementum viverra maximus.</div>
            </div>
        </div>
    )
    .add("disabled", () =>
        <Dropdown
            placeholder="Gender"
            inline
            disabled
            options={GENDERS}
        />
    )
    .add("error", () =>
        <div className="flex">
            <Dropdown
                placeholder="Gender"
                inline
                error
                options={GENDERS}
                className="mr5"
            />
            <Dropdown
                placeholder="Gender"
                inline
                error
                options={GENDERS}
                defaultOpen
            />
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <Dropdown
                placeholder="select gender"
                inline
                icon={<MagnifierIcon />}
                options={GENDERS}
            /> elementum viverra maximus.</div>
            <div className="mb12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <Dropdown
                placeholder="select gender"
                inline
                icon={<MagnifierIcon />}
                options={GENDERS}
            /> elementum viverra maximus.</div>
            <div className="f5 mb12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <Dropdown
                placeholder="select gender"
                inline
                icon={<MagnifierIcon />}
                options={GENDERS}
            /> elementum viverra maximus.</div>
            <div className="f1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et lacus at euismod <Dropdown
                placeholder="select gender"
                inline
                icon={<MagnifierIcon />}
                options={GENDERS}
            /> elementum viverra maximus.</div>
        </div>
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <Dropdown
                placeholder="select gender"
                inline
                options={GENDERS}
            /> elementum viverra maximus.</div>
            <div className="mb12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <Dropdown
                placeholder="select gender"
                inline
                options={GENDERS}
            /> elementum viverra maximus.</div>
            <div className="f5 mb12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod <Dropdown
                placeholder="select gender"
                inline
                options={GENDERS}
            /> elementum viverra maximus.</div>
            <div className="f1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et lacus at euismod <Dropdown
                placeholder="select gender"
                inline
                options={GENDERS}
            /> elementum viverra maximus.</div>
        </div>
    );
