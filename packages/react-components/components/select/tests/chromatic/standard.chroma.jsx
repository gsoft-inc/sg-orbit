import { AddIcon, MagnifierIcon } from "@orbit-ui/react-icons";
import { Button } from "@orbit-ui/react-button";
import { Dropdown } from "@orbit-ui/react-dropdown/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Select/standard"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

const GENDERS = [
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
                selection
                options={GENDERS}
                className="mr5"
            />
            <Dropdown
                placeholder="Gender"
                selection
                options={GENDERS}
                defaultOpen
            />
        </div>
    )
    .add("sizes",
         () =>
             <div className="flex flex-column">
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     <Dropdown
                         placeholder="Gender"
                         className="mr5"
                         selection
                         size="small"
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         className="mr5"
                         selection
                         value="Male"
                         size="small"
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         defaultOpen
                         selection
                         size="small"
                         options={GENDERS}
                     />
                 </div>
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     <Dropdown
                         placeholder="Gender"
                         selection
                         options={GENDERS}
                         className="mr5"
                     />
                     <Dropdown
                         placeholder="Gender"
                         selection
                         value="Male"
                         options={GENDERS}
                         className="mr5"
                     />
                     <Dropdown
                         placeholder="Gender"
                         defaultOpen
                         selection
                         options={GENDERS}
                     />
                 </div>
                 <div className="flex">
                     <Dropdown
                         placeholder="Gender"
                         className="mr5"
                         selection
                         size="large"
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         className="mr5"
                         selection
                         value="Male"
                         size="large"
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         defaultOpen
                         selection
                         size="large"
                         options={GENDERS}
                     />
                 </div>
             </div>
    )
    .add("fluid", () =>
        <div className="flex">
            <Dropdown
                placeholder="Gender"
                selection
                fluid
                options={GENDERS}
                className="mr5"
            />
            <Dropdown
                placeholder="Gender"
                selection
                fluid
                options={GENDERS}
                defaultOpen
            />
        </div>
    )
    .add("disabled", () =>
        <Dropdown
            placeholder="Gender"
            selection
            disabled
            options={GENDERS}
        />
    )
    .add("clearable", () =>
        <div className="flex">
            <Dropdown
                placeholder="Gender"
                selection
                clearable
                defaultValue="Male"
                options={GENDERS}
                className="mr5"
            />
            <Dropdown
                placeholder="Gender"
                selection
                clearable
                defaultValue="Male"
                options={GENDERS}
                defaultOpen
            />
        </div>
    )
    .add("error", () =>
        <div className="flex">
            <Dropdown
                placeholder="Gender"
                selection
                error
                options={GENDERS}
                className="mr5"
            />
            <Dropdown
                placeholder="Gender"
                selection
                error
                options={GENDERS}
                defaultOpen
            />
        </div>
    )
    .add("trigger", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    trigger={<AddIcon />}
                    options={GENDERS}
                    className="mr5"
                />
                <Dropdown
                    trigger={<AddIcon />}
                    options={GENDERS}
                    defaultOpen
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    trigger={<Button>Open</Button>}
                    options={GENDERS}
                    className="mr5"
                />
                <Dropdown
                    trigger={<Button>Open</Button>}
                    options={GENDERS}
                    defaultOpen
                    className="mr5"
                />
                <Dropdown
                    trigger={<Button circular icon={<AddIcon />} />}
                    options={GENDERS}
                    className="mr5"
                />
                <Dropdown
                    trigger={<Button circular icon={<AddIcon />} />}
                    options={GENDERS}
                    defaultOpen
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    trigger={<span>Open</span>}
                    options={GENDERS}
                    className="mr5"
                />
                <Dropdown
                    trigger={<span>Open</span>}
                    options={GENDERS}
                    defaultOpen
                />
            </div>
        </div>
    )
    .add("loading", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    placeholder="Gender"
                    className="mr5"
                    selection
                    loading
                    size="small"
                    options={GENDERS}
                />
                <Dropdown
                    placeholder="Gender"
                    className="mr5"
                    selection
                    loading
                    value="Male"
                    size="small"
                    options={GENDERS}
                />
                <Dropdown
                    placeholder="Gender"
                    defaultOpen
                    selection
                    loading
                    size="small"
                    options={GENDERS}
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    placeholder="Gender"
                    selection
                    loading
                    options={GENDERS}
                    className="mr5"
                />
                <Dropdown
                    placeholder="Gender"
                    selection
                    loading
                    value="Male"
                    options={GENDERS}
                    className="mr5"
                />
                <Dropdown
                    placeholder="Gender"
                    defaultOpen
                    selection
                    loading
                    options={GENDERS}
                />
            </div>
            <div className="flex">
                <Dropdown
                    placeholder="Gender"
                    className="mr5"
                    selection
                    loading
                    size="large"
                    options={GENDERS}
                />
                <Dropdown
                    placeholder="Gender"
                    className="mr5"
                    selection
                    loading
                    value="Male"
                    size="large"
                    options={GENDERS}
                />
                <Dropdown
                    placeholder="Gender"
                    defaultOpen
                    selection
                    loading
                    size="large"
                    options={GENDERS}
                />
            </div>
        </div>
    )
    .add("upward", () =>
        <div className="flex mt12">
            <Dropdown
                placeholder="Gender"
                selection
                upward
                options={GENDERS}
                className="mr5"
            />
            <Dropdown
                placeholder="Gender"
                selection
                upward
                options={GENDERS}
                defaultOpen
            />
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    placeholder="Gender"
                    selection
                    icon={<MagnifierIcon />}
                    options={GENDERS}
                    size="small"
                    className="mr5"
                />
                <Dropdown
                    placeholder="Gender"
                    selection
                    icon={<MagnifierIcon />}
                    options={GENDERS}
                    size="small"
                    defaultOpen
                />
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <Dropdown
                    placeholder="Gender"
                    selection
                    icon={<MagnifierIcon />}
                    options={GENDERS}
                    className="mr5"
                />
                <Dropdown
                    placeholder="Gender"
                    selection
                    icon={<MagnifierIcon />}
                    options={GENDERS}
                    defaultOpen
                />
            </div>
            <div className="flex">
                <Dropdown
                    placeholder="Gender"
                    selection
                    icon={<MagnifierIcon />}
                    options={GENDERS}
                    size="large"
                    className="mr5"
                />
                <Dropdown
                    placeholder="Gender"
                    selection
                    icon={<MagnifierIcon />}
                    options={GENDERS}
                    size="large"
                    defaultOpen
                />
            </div>
        </div>
    );
