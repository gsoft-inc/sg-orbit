import { Dropdown } from "semantic-ui-react";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Dropdown/standard"))
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

export const FRIENDS = [
    {
        key: "Jenny Hess",
        text: "Jenny Hess",
        value: "Jenny Hess",
        image: {
            avatar: true,
            src: "https://randomuser.me/api/portraits/women/4.jpg",
            size: "mini"
        }
    },
    {
        key: "Elliot Fu",
        text: "Elliot Fu",
        value: "Elliot Fu",
        image: {
            avatar: true,
            src: "https://randomuser.me/api/portraits/women/12.jpg",
            size: "mini"
        }
    },
    {
        key: "Stevie Feliciano",
        text: "Stevie Feliciano",
        value: "Stevie Feliciano",
        image: {
            avatar: true,
            src: "https://randomuser.me/api/portraits/men/14.jpg",
            size: "mini"
        }
    },
    {
        key: "Christian",
        text: "Christian",
        value: "Christian",
        image: {
            avatar: true,
            src: "https://randomuser.me/api/portraits/men/12.jpg",
            size: "mini"
        }
    }
];

// TODO: Add a test for a fluid dropdown
// TODO: add tests for: disabled, trigger, clearable, loading, basic, icon, compact, direction, upward, inline

stories()
    .add("sizes",
         () =>
             <div className="flex flex-column">
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     <Dropdown
                         placeholder="Gender"
                         className="small"
                         selection
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         className="small"
                         open
                         selection
                         options={GENDERS}
                     />
                 </div>
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     <Dropdown
                         placeholder="Gender"
                         selection
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         open
                         selection
                         options={GENDERS}
                     />
                 </div>
                 <div className="flex">
                     <Dropdown
                         placeholder="Gender"
                         className="large"
                         selection
                         options={GENDERS}
                     />
                     <Dropdown
                         placeholder="Gender"
                         className="large"
                         open
                         selection
                         options={GENDERS}
                     />
                 </div>
             </div>
    )
    .add("complex items",
         () =>
             <div className="flex flex-column">
                 <div className="flex" style={{ marginBottom: "200px" }}>
                     <Dropdown
                         placeholder="Select Friend"
                         className="small"
                         selection
                         options={FRIENDS}
                     />
                     <Dropdown
                         placeholder="Select Friend"
                         className="small"
                         open
                         selection
                         options={FRIENDS}
                     />
                 </div>
                 <div className="flex" style={{ marginBottom: "200px" }}>
                     <Dropdown
                         placeholder="Select Friend"
                         selection
                         options={FRIENDS}
                     />
                     <Dropdown
                         placeholder="Select Friend"
                         open
                         selection
                         options={FRIENDS}
                     />
                 </div>
                 <div className="flex">
                     <Dropdown
                         placeholder="Select Friend"
                         className="large"
                         selection
                         options={FRIENDS}
                     />
                     <Dropdown
                         placeholder="Select Friend"
                         className="large"
                         open
                         selection
                         options={FRIENDS}
                     />
                 </div>
             </div>
    )
    .add("fluid", () =>
        <Dropdown
            placeholder="Select Friend"
            selection
            fluid
            options={GENDERS}
        />
    );
