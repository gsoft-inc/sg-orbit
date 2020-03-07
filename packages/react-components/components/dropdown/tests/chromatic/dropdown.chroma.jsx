import { AddIcon } from "@orbit-ui/react-icons";
import { Button } from "@orbit-ui/react-button";
import { Dropdown } from "@orbit-ui/react-dropdown/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Dropdown"))
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

function createDropdown({ options = GENDERS, ...otherProps } = {}) {
    return <Dropdown
        options={options}
        {...otherProps}
    />;
}

stories()
    .add("trigger", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createDropdown({
                    trigger: <AddIcon />,
                    className: "mr5"
                })}
                {createDropdown({
                    trigger: <AddIcon />,
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createDropdown({
                    trigger: <Button>Open</Button>,
                    className: "mr5"
                })}
                {createDropdown({
                    trigger: <Button>Open</Button>,
                    className: "mr5",
                    defaultOpen: true
                })}
                {createDropdown({
                    trigger: <Button circular icon={<AddIcon />} />,
                    className: "mr5"
                })}
                {createDropdown({
                    trigger: <Button circular icon={<AddIcon />} />,
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createDropdown({
                    trigger: <span>Open</span>,
                    className: "mr5"
                })}
                {createDropdown({
                    trigger: <span>Open</span>,
                    defaultOpen: true
                })}
            </div>
        </div>
    );
