import { AddIcon } from "@orbit-ui/react-icons/src";
import { Button } from "@orbit-ui/react-button/src";
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

const ACTIONS = [
    { key: "New", text: "New", value: "New" },
    { key: "Open...", text: "Open...", value: "Open..." },
    { key: "Rename...", text: "Rename...", value: "Rename..." },
    { key: "Save As...", text: "Save As...", value: "Save As..." },
    { key: "Make a copy...", text: "Make a copy...", value: "Make a copy..." }
];

function createDropdown({ options = GENDERS, ...otherProps } = {}) {
    return <Dropdown
        options={options}
        {...otherProps}
    />;
}

function createMenu({ options = ACTIONS, ...otherProps } = {}) {
    return <Dropdown
        options={options}
        {...otherProps}
    />;
}

stories()
    .add("default",
         () =>
             <div className="flex flex-column">
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     {createMenu({
                         text: "File",
                         selection: false,
                         className: "mr5"
                     })}
                     {createMenu({
                         text: "File",
                         selection: false,
                         defaultOpen: true
                     })}
                 </div>
             </div>
    )
    .add("trigger",
         () =>
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
                 <div className="flex" style={{ marginBottom: "150px" }}>
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
