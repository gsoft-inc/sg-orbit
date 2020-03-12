import { MagnifierIcon } from "@orbit-ui/react-icons/src";
import { Select } from "@orbit-ui/react-select/src";
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

const GENDERS = [
    { key: "Male", text: "Male", value: "Male" },
    { key: "Female", text: "Female", value: "Female" }
];

function createInlineSelect({ options = GENDERS, ...otherProps } = {}) {
    return <Select
        placeholder="select gender"
        inline
        options={options}
        {...otherProps}
    />;
}

stories()
    .add("default", () =>
        <div className="flex">
            {createInlineSelect({
                className: "mr5"
            })}
            {createInlineSelect({
                defaultOpen: true
            })}
        </div>
    )
    .add("selected value", () =>
        <div className="flex">
            {createInlineSelect({
                defaultValue: "Female",
                className: "mr5"
            })}
            {createInlineSelect({
                defaultValue: "Female",
                defaultOpen: true
            })}
        </div>
    )
    .add("in a block", () =>
        <div className="flex flex-column">
            <div className="mb12">
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect()}elementum viverra maximus.
                </div>
            </div>
            <div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect({ defaultOpen: true })}elementum viverra maximus.
                </div>
            </div>
        </div>
    )
    .add("disabled", () =>
        createInlineSelect({
            disabled: true
        })
    )
    .add("error", () =>
        <div className="flex">
            {createInlineSelect({
                error: true,
                className: "mr5"
            })}
            {createInlineSelect({
                error: true,
                defaultOpen: true
            })}
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect({ icon: <MagnifierIcon /> })}elementum viverra maximus.
            </div>
            <div className="mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect({ icon: <MagnifierIcon /> })}elementum viverra maximus.
            </div>
            <div className="f5 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect({ icon: <MagnifierIcon /> })}elementum viverra maximus.
            </div>
            <div className="f1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et lacus at euismod {createInlineSelect({ icon: <MagnifierIcon /> })}elementum viverra maximus.
            </div>
        </div>
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect()}elementum viverra maximus.
            </div>
            <div className="mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect()}elementum viverra maximus.
            </div>
            <div className="f5 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineSelect()}elementum viverra maximus.
            </div>
            <div className="f1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et lacus at euismod {createInlineSelect()}elementum viverra maximus.
            </div>
        </div>
    );
