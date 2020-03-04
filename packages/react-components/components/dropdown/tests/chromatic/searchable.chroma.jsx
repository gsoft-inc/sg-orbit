import { Dropdown } from "@orbit-ui/react-dropdown/src";
import { MagnifierIcon } from "@orbit-ui/react-icons";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Dropdown/searchable"))
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
                selection
                search
                options={GENDERS}
                className="mr5"
            />
            <Dropdown
                placeholder="Gender"
                selection
                search
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
                         search
                         size="small"
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         className="mr5"
                         selection
                         search
                         value="Male"
                         size="small"
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         defaultOpen
                         selection
                         search
                         size="small"
                         options={GENDERS}
                     />
                 </div>
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     <Dropdown
                         placeholder="Gender"
                         selection
                         search
                         options={GENDERS}
                         className="mr5"
                     />
                     <Dropdown
                         placeholder="Gender"
                         selection
                         search
                         value="Male"
                         options={GENDERS}
                         className="mr5"
                     />
                     <Dropdown
                         placeholder="Gender"
                         defaultOpen
                         selection
                         search
                         options={GENDERS}
                     />
                 </div>
                 <div className="flex">
                     <Dropdown
                         placeholder="Gender"
                         className="mr5"
                         selection
                         search
                         size="large"
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         className="mr5"
                         selection
                         search
                         value="Male"
                         size="large"
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         defaultOpen
                         selection
                         search
                         size="large"
                         options={GENDERS}
                     />
                 </div>
             </div>
    )
    .add("disabled", () =>
        <Dropdown
            placeholder="Gender"
            selection
            search
            disabled
            options={GENDERS}
        />
    )
    .add("clearable", () =>
        <div className="flex">
            <Dropdown
                placeholder="Gender"
                selection
                search
                clearable
                defaultValue="Male"
                options={GENDERS}
                className="mr5"
            />
            <Dropdown
                placeholder="Gender"
                selection
                search
                clearable
                defaultValue="Male"
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
                    search
                    icon={<MagnifierIcon />}
                    options={GENDERS}
                    size="small"
                    className="mr5"
                />
                <Dropdown
                    placeholder="Gender"
                    selection
                    search
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
                    search
                    icon={<MagnifierIcon />}
                    options={GENDERS}
                    className="mr5"
                />
                <Dropdown
                    placeholder="Gender"
                    selection
                    search
                    icon={<MagnifierIcon />}
                    options={GENDERS}
                    defaultOpen
                />
            </div>
            <div className="flex">
                <Dropdown
                    placeholder="Gender"
                    selection
                    search
                    icon={<MagnifierIcon />}
                    options={GENDERS}
                    size="large"
                    className="mr5"
                />
                <Dropdown
                    placeholder="Gender"
                    selection
                    search
                    icon={<MagnifierIcon />}
                    options={GENDERS}
                    size="large"
                    defaultOpen
                />
            </div>
        </div>
    );
