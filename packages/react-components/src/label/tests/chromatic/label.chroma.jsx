import { Button } from "@react-components/button";
import { CommunicationIcon } from "@react-components/icons";
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

function setRedBackground(element) {
    if (!isNil(element)) {
        element.classList.add("bg-red");
    }
}

stories("/button")
    .add("element ref", () =>
        <Label button={<Button icon={<CommunicationIcon />} className= "bg-red" />} className="mr5">Notification Sent</Label>
    )
    .add("object", () =>
        <div className="flex">
            <Label button={{ icon: <CommunicationIcon /> }} className="mr5">Notification Sent</Label>
            <Label button={{ icon: <CommunicationIcon />, className: "bg-red" }} className="mr5">Notification Sent</Label>
            <Label button={{ icon: <CommunicationIcon />, ref: setRedBackground }}>Notification Sent</Label>
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

