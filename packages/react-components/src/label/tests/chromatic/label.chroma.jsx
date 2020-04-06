import { Button } from "@react-components/button";
import { CloseIcon, LightbulbIcon } from "@react-components/icons";
import { Label } from "@react-components/label";
import { Tag } from "@react-components/tag";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createSharedStories } from "./shared-stories";
import { isNil } from "lodash";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Label"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

createSharedStories(<Label />, stories("/standard"));

createSharedStories(<Label basic />, stories("/basic"));

createSharedStories(<Label naked />, stories("/naked"))
    .add("coloured", () =>
        <div className="flex flex-column items-start">
            <Label
                naked
                style={{
                    backgroundColor: "#FFF6E7",
                    color: "var(--marine-500)",
                    border: "1px solid #FEE9C3"
                }}
                className="mb5"
            >Notification Sent</Label>
            <Label
                circular
                naked
                style={{
                    backgroundColor: "#FFF6E7",
                    color: "var(--marine-500)",
                    border: "1px solid #FEE9C3"
                }}
            >R</Label>
        </div>
    );

stories("/compact")
    .add("default", () =>
        <div className="flex flex-column">
            <div className="flex mb5">
                <Label compact className="mr5">Notification Sent</Label>
                <Label compact highlight className="mr5">Notification Sent</Label>
                <Label compact className="bg-red mr5">Notification Sent</Label>
                <Label compact style={{ backgroundColor: "red" }}>Notification Sent</Label>
            </div>
            <div className="flex items-end mb5">
                <Label compact size="mini" className="mr5">Notification Sent</Label>
                <Label compact size="tiny" className="mr5">Notification Sent</Label>
                <Label compact size="small" className="mr5">Notification Sent</Label>
                <Label compact className="mr5">Notification Sent</Label>
                <Label compact size="large">Notification Sent</Label>
            </div>
            <div className="flex items-end mb5">
                <Label compact size="mini" icon={<LightbulbIcon />} className="mr5">Notification Sent</Label>
                <Label compact size="tiny" icon={<LightbulbIcon />} className="mr5">Notification Sent</Label>
                <Label compact size="small" icon={<LightbulbIcon />} className="mr5">Notification Sent</Label>
                <Label compact icon={<LightbulbIcon />} className="mr5">Notification Sent</Label>
                <Label compact size="large" icon={<LightbulbIcon />}>Notification Sent</Label>
            </div>
            <div className="flex items-end mb5">
                <Label compact size="mini" icon={<LightbulbIcon />} iconPosition="right" className="mr5">Notification Sent</Label>
                <Label compact size="tiny" icon={<LightbulbIcon />} iconPosition="right" className="mr5">Notification Sent</Label>
                <Label compact size="small" icon={<LightbulbIcon />} iconPosition="right" className="mr5">Notification Sent</Label>
                <Label compact icon={<LightbulbIcon />} iconPosition="right" className="mr5">Notification Sent</Label>
                <Label compact size="large" icon={<LightbulbIcon />} iconPosition="right">Notification Sent</Label>
            </div>
            <div className="flex items-end mb5">
                <Label compact size="mini" icon={<LightbulbIcon />} className="mr5" />
                <Label compact size="tiny" icon={<LightbulbIcon />} className="mr5" />
                <Label compact size="small" icon={<LightbulbIcon />} className="mr5" />
                <Label compact icon={<LightbulbIcon />} className="mr5" />
                <Label compact size="large" icon={<LightbulbIcon />} />
            </div>
            <div className="flex mb5">
                <Label compact icon={<LightbulbIcon className="fill-red" />}>Notification Sent</Label>
            </div>
            <div className="flex items-end mb5">
                <Label compact size="mini" tag={<Tag className="bg-red" />} className="mr5">Notification Sent</Label>
                <Label compact size="tiny" tag={<Tag className="bg-red" />} className="mr5">Notification Sent</Label>
                <Label compact size="small" tag={<Tag className="bg-red" />} className="mr5">Notification Sent</Label>
                <Label compact tag={<Tag className="bg-red" />} className="mr5">Notification Sent</Label>
                <Label compact size="large" tag={<Tag className="bg-red" />}>Notification Sent</Label>
            </div>
            <div className="flex items-end mb5">
                <Label compact size="mini" tag={<Tag className="bg-red" />} icon={<LightbulbIcon />} iconPosition="right" className="mr5">Notification Sent</Label>
                <Label compact size="tiny" tag={<Tag className="bg-red" />} icon={<LightbulbIcon />} iconPosition="right" className="mr5">Notification Sent</Label>
                <Label compact size="small" tag={<Tag className="bg-red" />} icon={<LightbulbIcon />} iconPosition="right" className="mr5">Notification Sent</Label>
                <Label compact tag={<Tag className="bg-red" />} icon={<LightbulbIcon />} iconPosition="right" className="mr5">Notification Sent</Label>
                <Label compact size="large" tag={<Tag className="bg-red" />} icon={<LightbulbIcon />} iconPosition="right">Notification Sent</Label>
            </div>
            <div className="flex items-end mb5">
                <Label compact size="mini" button={<Button icon={<CloseIcon />} />} className="mr5">Notification Sent</Label>
                <Label compact size="tiny" button={<Button icon={<CloseIcon />} />} className="mr5">Notification Sent</Label>
                <Label compact size="small" button={<Button icon={<CloseIcon />} />} className="mr5">Notification Sent</Label>
                <Label compact button={<Button icon={<CloseIcon />} />} className="mr5">Notification Sent</Label>
                <Label compact size="large" button={<Button icon={<CloseIcon />} />}>Notification Sent</Label>
            </div>
            <div className="flex items-end mb5">
                <Label compact size="mini" button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} className="mr5">Notification Sent</Label>
                <Label compact size="tiny" button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} className="mr5">Notification Sent</Label>
                <Label compact size="small" button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} className="mr5">Notification Sent</Label>
                <Label compact button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} className="mr5">Notification Sent</Label>
                <Label compact size="large" button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />}>Notification Sent</Label>
            </div>
        </div>
    );

function setRedBackground(element) {
    if (!isNil(element)) {
        element.classList.add("bg-red");
    }
}

stories("/button")
    .add("element ref", () =>
        <Label button={<Button icon={<LightbulbIcon />} className= "bg-red" />} className="mr5">Notification Sent</Label>
    )
    .add("object", () =>
        <div className="flex">
            <Label button={{ icon: <LightbulbIcon /> }} className="mr5">Notification Sent</Label>
            <Label button={{ icon: <LightbulbIcon />, className: "bg-red" }} className="mr5">Notification Sent</Label>
            <Label button={{ icon: <LightbulbIcon />, ref: setRedBackground }}>Notification Sent</Label>
        </div>
    );

stories("/tag")
    .add("element ref", () =>
        <Label tag={<Tag ref={setRedBackground} />}>Notification Sent</Label>
    )
    .add("object", () =>
        <div className="flex">
            <Label tag={{ className: "bg-red" }} className="mr5">Notification Sent</Label>
            <Label tag={{ ref: setRedBackground }}>Notification Sent</Label>
        </div>
    );

