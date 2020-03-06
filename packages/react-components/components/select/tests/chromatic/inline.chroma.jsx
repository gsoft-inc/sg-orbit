import { Dropdown } from "@orbit-ui/react-dropdown/src";
import { MagnifierIcon } from "@orbit-ui/react-icons";
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

export const GENDERS = [
    { key: "Male", text: "Male", value: "Male" },
    { key: "Female", text: "Female", value: "Female" }
];

function createInlineDropdown({ options = GENDERS, ...otherProps } = {}) {
    return <Dropdown
        inline
        placeholder="select gender"
        options={options}
        {...otherProps}
    />;
}

stories()
    .add("default", () =>
        <div className="flex">
            {createInlineDropdown({
                className: "mr5"
            })}
            {createInlineDropdown({
                defaultOpen: true
            })}
        </div>
    )
    .add("selected value", () =>
        <div className="flex">
            {createInlineDropdown({
                value: "Female",
                className: "mr5"
            })}
            {createInlineDropdown({
                value: "Female",
                defaultOpen: true
            })}
        </div>
    )
    .add("in a block", () =>
        <div className="flex flex-column">
            <div className="mb12">
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineDropdown()} elementum viverra maximus.
                </div>
            </div>
            <div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineDropdown({ defaultOpen: true })} elementum viverra maximus.
                </div>
            </div>
        </div>
    )
    .add("disabled", () =>
        <div>
            {createInlineDropdown({
                disabled: true
            })}
        </div>
    )
    .add("error", () =>
        <div className="flex">
            {createInlineDropdown({
                error: true,
                className: "mr5"
            })}
            {createInlineDropdown({
                error: true,
                defaultOpen: true
            })}
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineDropdown({ icon: <MagnifierIcon /> })} elementum viverra maximus.
            </div>
            <div className="mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineDropdown({ icon: <MagnifierIcon /> })} elementum viverra maximus.
            </div>
            <div className="f5 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineDropdown({ icon: <MagnifierIcon /> })} elementum viverra maximus.
            </div>
            <div className="f1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et lacus at euismod {createInlineDropdown({ icon: <MagnifierIcon /> })} elementum viverra maximus.
            </div>
        </div>
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineDropdown()} elementum viverra maximus.
            </div>
            <div className="mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineDropdown()} elementum viverra maximus.
            </div>
            <div className="f5 mb12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum <br /> et lacus at euismod {createInlineDropdown()} elementum viverra maximus.
            </div>
            <div className="f1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et lacus at euismod {createInlineDropdown()} elementum viverra maximus.
            </div>
        </div>
    );
