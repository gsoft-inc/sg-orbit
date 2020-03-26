import { Button } from "@react-components/button";
import { CloseIcon, MagnifierIcon } from "@react-components/icons";
import { Input } from "@react-components/input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { isNil } from "lodash";

// TODO: variations doesn't make sense right now since error is also variations and are part of default & transparent stories.

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Input"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Input />
    )
    .add("placeholder", () =>
        <Input placeholder="Search..." />
    )
    .add("value", () =>
        <div className="flex">
            <Input value="SpaceX will win the race!" placeholder="Search..." className="mr5" />
            <Input defaultValue="SpaceX will win the race!" placeholder="Search..." />
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="flex mb5">
                <Input icon={<MagnifierIcon />} placeholder="Search..." className="mr5" />
                <Input icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." />
            </div>
            <div className="flex mb5">
                <Input defaultValue="SpaceX will win the race!" icon={<MagnifierIcon />} className="mr5" />
                <Input defaultValue="SpaceX will win the race!" icon={<MagnifierIcon />} iconPosition="left" />
            </div>
            <div className="flex mb5">
                <Input icon={<MagnifierIcon />} disabled placeholder="Search..." className="mr5" />
                <Input icon={<MagnifierIcon />} iconPosition="left" disabled placeholder="Search..." />
            </div>
            <div className="flex mb5">
                <Input icon={<MagnifierIcon />} loading placeholder="Search..." className="mr5" />
                <Input icon={<MagnifierIcon />} iconPosition="left" loading placeholder="Search..." />
            </div>
            <div className="flex items-end mb5">
                <Input size="small" icon={<MagnifierIcon />} placeholder="Search..." className="mr5" />
                <Input icon={<MagnifierIcon />} placeholder="Search..." className="mr5" />
                <Input size="large" icon={<MagnifierIcon />} placeholder="Search..." className="mr5" />
            </div>
            <div className="flex items-end">
                <Input size="small" icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." className="mr5" />
                <Input icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." className="mr5" />
                <Input size="large" icon={<MagnifierIcon />} iconPosition="left" placeholder="Search..." className="mr5" />
            </div>
        </div>
    )
    .add("focus", () =>
        <Input focus placeholder="Search..." />
    )
    .add("disabled", () =>
        <Input disabled placeholder="Search..." />
    )
    .add("loading", () =>
        <div className="flex flex-column">
            <div className="flex items-end mb5">
                <Input size="small" loading placeholder="Search..." className="mr5" />
                <Input loading placeholder="Search..." className="mr5" />
                <Input size="large" loading placeholder="Search..." />
            </div>
            <div className="flex items-end">
                <Input size="small" loading iconPosition="left" placeholder="Search..." className="mr5" />
                <Input loading iconPosition="left" placeholder="Search..." className="mr5" />
                <Input size="large" loading iconPosition="left" placeholder="Search..." />
            </div>
        </div>
    )
    .add("fluid", () =>
        <div className="flex flex-column">
            <div className="mb5">
                <Input fluid placeholder="Search..." />
            </div>
            <div className="w-10">
                <Input fluid placeholder="Search..." />
            </div>
        </div>
    )
    .add("error", () =>
        <Input error placeholder="Search..." />
    )
    .add("transparent", () =>
        <Input transparent placeholder="Search..." />
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="flex items-end mb5">
                <Input placeholder="Search..." size="small" className="mr5" />
                <Input placeholder="Search..." className="mr5" />
                <Input placeholder="Search..." size="large" />
            </div>
            <div className="flex items-end">
                <Input defaultValue="SpaceX will win the race!" size="small" className="mr5" />
                <Input defaultValue="SpaceX will win the race!" className="mr5" />
                <Input defaultValue="SpaceX will win the race!" size="large" />
            </div>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <Input className="border-red mr5" />
            <Input style={{ border: "1px solid red" }} />
        </div>
    );

function setRedBackground(element) {
    if (!isNil(element)) {
        element.classList.add("bg-red");
    }
}

stories("/button")
    .add("element ref", () =>
        <Input button={<Button icon={<CloseIcon />} ref={setRedBackground} />} />
    )
    .add("object", () =>
        <div className="flex">
            <Input button={{ icon: <CloseIcon /> }} className="mr5" />
            <Input button={{ icon: <CloseIcon />, className: "bg-red mr5" }} />
            <Input button={{ icon: <CloseIcon />, ref: setRedBackground }} />
        </div>
    )
    .add("disabled", () =>
        <Input button={<Button icon={<CloseIcon />} />} disabled />
    )
    .add("loading", () =>
        <div className="flex">
            <Input button={<Button icon={<CloseIcon />} />} loading className="mr5" />
            <Input icon={<CloseIcon />} loading className="mr5" />
            <Input icon={<CloseIcon />} loading iconPosition="left" />
        </div>
    )
    .add("size", () =>
        <div className="flex items-end">
            <Input size="small" button={<Button icon={<CloseIcon />} />} className="mr5" />
            <Input button={<Button icon={<CloseIcon />} />} className="mr5" />
            <Input size="large" button={<Button icon={<CloseIcon />} />} />
        </div>
    );
