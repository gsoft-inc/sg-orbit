import { AddIcon } from "@orbit-ui/react-icons";
import { Button } from "@orbit-ui/react-button";
import { Dropdown } from "@orbit-ui/react-dropdown/src";
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
    .add("complex items",
         () =>
             <div className="flex flex-column">
                 <div className="flex" style={{ marginBottom: "200px" }}>
                     <Dropdown
                         placeholder="Select Friend"
                         className="small mr5"
                         selection
                         options={FRIENDS}
                     />
                     <Dropdown
                         placeholder="Select Friend"
                         className="small"
                         defaultOpen
                         selection
                         options={FRIENDS}
                     />
                 </div>
                 <div className="flex" style={{ marginBottom: "200px" }}>
                     <Dropdown
                         placeholder="Select Friend"
                         selection
                         options={FRIENDS}
                         className="mr5"
                     />
                     <Dropdown
                         placeholder="Select Friend"
                         defaultOpen
                         selection
                         options={FRIENDS}
                     />
                 </div>
                 <div className="flex">
                     <Dropdown
                         placeholder="Select Friend"
                         className="large mr5"
                         selection
                         options={FRIENDS}
                     />
                     <Dropdown
                         placeholder="Select Friend"
                         className="large"
                         defaultOpen
                         selection
                         options={FRIENDS}
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
        <div className="flex">
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
                options={GENDERS}
                defaultOpen
            />
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
    );
