import { Dropdown } from "semantic-ui-react";
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
                         className="small mr5"
                         selection
                         search
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         className="small mr5"
                         selection
                         search
                         value="Male"
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         className="small"
                         defaultOpen
                         selection
                         search
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
                         className="large mr5"
                         selection
                         search
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         className="large mr5"
                         selection
                         search
                         value="Male"
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         className="large"
                         defaultOpen
                         selection
                         search
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
    );
