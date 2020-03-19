import { Button } from "@orbit-ui/react-button/src";
import { CloseIcon, CommunicationIcon, MagnifierIcon } from "@orbit-ui/react-icons/src";
import { Label, Tag } from "@orbit-ui/react-label/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { isNil } from "lodash";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Label"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex">
                 <div className="flex flex-column items-start">
                     <Label>Notification Sent</Label>
                     <Label icon={<MagnifierIcon />} iconPosition="right">Notification Sent</Label>
                     <Label icon={<CommunicationIcon />}>Notification Sent</Label>
                     <Label button={<Button icon={<CloseIcon />} />}>
                        Group added
                     </Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label basic>Notification Sent</Label>
                     <Label basic icon={<MagnifierIcon />} iconPosition="right">Notification Sent</Label>
                     <Label basic icon={<CommunicationIcon />}>Notification Sent</Label>
                     <Label basic button={<Button icon={<CloseIcon />} />}>
                        Group added
                     </Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label size="small">Notification Sent</Label>
                     <Label size="small" icon={<CommunicationIcon />}>Notification Sent</Label>
                     <Label size="small" icon={<MagnifierIcon />} iconPosition="right">Notification Sent</Label>
                     <Label size="large">Notification Sent</Label>
                     <Label size="large" icon={<CommunicationIcon />}>Notification Sent</Label>
                     <Label size="large" icon={ <MagnifierIcon />} iconPosition="right">Notification Sent</Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label basic size="small">Notification Sent</Label>
                     <Label basic size="small" icon={<CommunicationIcon />}>Notification Sent</Label>
                     <Label basic size="small" icon={<MagnifierIcon />} iconPosition="right">Notification Sent</Label>
                     <Label basic size="large">Notification Sent</Label>
                     <Label basic size="large" icon={<CommunicationIcon />}>Notification Sent</Label>
                     <Label basic size="large" icon={ <MagnifierIcon />} iconPosition="right">Notification Sent</Label>
                 </div>
                 <div className="flex items-start">
                     <div className="flex flex-column items-start">
                         <Label circular size="tiny">R</Label>
                         <Label circular size="small">R</Label>
                         <Label circular size="medium">R</Label>
                         <Label circular size="large">R</Label>
                         <Label circular size="big">R</Label>
                         <Label circular size="huge">R</Label>
                         <Label circular size="massive">R</Label>
                     </div>
                     <div className="flex flex-column items-start">
                         <Label basic circular size="tiny">R</Label>
                         <Label basic circular size="small">R</Label>
                         <Label basic circular size="medium">R</Label>
                         <Label basic circular size="large">R</Label>
                         <Label basic circular size="big">R</Label>
                         <Label basic circular size="huge">R</Label>
                         <Label basic circular size="massive">R</Label>
                     </div>
                     <div className="flex flex-column items-start">
                         <Label circular size="tiny" icon={<CommunicationIcon />} />
                         <Label circular size="small" icon={<CommunicationIcon />} />
                         <Label circular size="medium" icon={<CommunicationIcon />} />
                         <Label circular size="large" icon={<CommunicationIcon />} />
                         <Label circular size="big" icon={<CommunicationIcon />} />
                         <Label circular size="huge" icon={<CommunicationIcon />} />
                         <Label circular size="massive" icon={<CommunicationIcon />} />
                     </div>
                     <div className="flex flex-column items-start">
                         <Label basic circular size="tiny" icon={<CommunicationIcon />} />
                         <Label basic circular size="small" icon={<CommunicationIcon />} />
                         <Label basic circular size="medium" icon={<CommunicationIcon />} />
                         <Label basic circular size="large" icon={<CommunicationIcon />} />
                         <Label basic circular size="big" icon={<CommunicationIcon />} />
                         <Label basic circular size="huge" icon={<CommunicationIcon />} />
                         <Label basic circular size="massive" icon={<CommunicationIcon />} />
                     </div>
                 </div>
             </div>
    )
    .add("with tag",
         () =>
             <div className="flex">
                 <div className="flex flex-column items-start">
                     <Label tag={<Tag className="bg-red" />} size="mini">
                            Group added
                     </Label>
                     <Label tag={<Tag className="bg-red" />} size="mini" button={<Button icon={<CloseIcon />} />}>
                        Group added
                     </Label>
                     <Label tag={<Tag className="bg-red" />} size="mini" icon={<CommunicationIcon />} iconPosition="right">
                         Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />} size="mini">
                            Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />} size="mini" button={<Button icon={<CloseIcon />} />}>
                        Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />} size="mini" icon={<CommunicationIcon />} iconPosition="right">
                         Group added
                     </Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label tag={<Tag className="bg-red" />} size="tiny">
                            Group added
                     </Label>
                     <Label tag={<Tag className="bg-red" />} size="tiny" button={<Button icon={<CloseIcon />} />}>
                        Group added
                     </Label>
                     <Label tag={<Tag className="bg-red" />} size="tiny" icon={<CommunicationIcon />} iconPosition="right">
                         Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />} size="tiny">
                            Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />} size="tiny" button={<Button icon={<CloseIcon />} />}>
                        Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />} size="tiny" icon={<CommunicationIcon />} iconPosition="right">
                         Group added
                     </Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label tag={<Tag className="bg-red" />} size="small">
                         Group added
                     </Label>
                     <Label tag={<Tag className="bg-red" />} size="small" button={<Button icon={<CloseIcon />} />}>
                        Group added
                     </Label>
                     <Label tag={<Tag className="bg-red" />} size="small" icon={<CommunicationIcon />} iconPosition="right" >
                          Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />} size="small">
                         Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />} size="small" button={<Button icon={<CloseIcon />} />}>
                        Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />} size="small" icon={<CommunicationIcon />} iconPosition="right" >
                          Group added
                     </Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label tag={<Tag className="bg-red" />}>
                            Group added
                     </Label>
                     <Label tag={<Tag className="bg-red" />} button={<Button icon={<CloseIcon />} />}>
                        Group added
                     </Label>
                     <Label tag={<Tag className="bg-red" />} icon={<CommunicationIcon />} iconPosition="right">
                         Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />}>
                            Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />} button={<Button icon={<CloseIcon />} />}>
                        Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />} icon={<CommunicationIcon />} iconPosition="right">
                         Group added
                     </Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label tag={<Tag className="bg-red" />} size="large">
                         Group added
                     </Label>
                     <Label tag={<Tag className="bg-red" />} size="large" button={<Button icon={<CloseIcon />} />}>
                        Group added
                     </Label>
                     <Label tag={<Tag className="bg-red" />} size="large" icon={<CommunicationIcon />} iconPosition="right">
                         Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />} size="large">
                         Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />} size="large" button={<Button icon={<CloseIcon />} />}>
                        Group added
                     </Label>
                     <Label basic tag={<Tag className="bg-red" />} size="large" icon={<CommunicationIcon />} iconPosition="right">
                         Group added
                     </Label>
                 </div>
             </div>
    )
    .add("naked", () =>
        <div className="flex">
            <div className="flex flex-column items-start">
                <Label naked>Notification Sent</Label>
                <Label naked icon={<MagnifierIcon />} iconPosition="right">Notification Sent</Label>
                <Label circular naked size="medium">R</Label>
                <Label tag={<Tag className="bg-red" />} naked>
                    Group added
                </Label>
            </div>
            <div className="flex flex-column items-start">
                <Label
                    naked
                    style={{
                        backgroundColor: "#FFF6E7",
                        color: "var(--marine-500)",
                        border: "1px solid #FEE9C3"
                    }}
                >
                    Notification Sent
                </Label>
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
        </div>
    )
    .add("highlight", () =>
        <Label highlight>Notification Sent</Label>
    )
    .add("custom css class", () =>
        <Label className="bg-red">Notification Sent</Label>
    )
    .add("default", () =>
        <Label icon={<CommunicationIcon />}>Notification Sent</Label>
    )
    .add("right", () =>
        <Label icon={<CommunicationIcon />} iconPosition="right">Notification Sent</Label>
    )
    .add("css class", () =>
        <Label icon={<CommunicationIcon className="fill-red" />}>Notification Sent</Label>
    );

function setRedBackground(element) {
    if (!isNil(element)) {
        element.classList.add("bg-red");
    }
}

stories("/button")
    .add("element", () =>
        <div className="flex">
            <Label button={<Button icon={<CloseIcon />} />}>Group added</Label>
            <Label button={<Button icon={<CloseIcon />} className= "bg-red" />}>Group added</Label>
            <Label button={<Button icon={<CloseIcon />} ref={setRedBackground} />}>Group added</Label>
        </div>
    )
    .add("object", () =>
        <div className="flex">
            <Label button={{ icon: <CloseIcon /> }}>Group added</Label>
            <Label button={{ icon: <CloseIcon />, className: "bg-red" }}>Group added</Label>
            <Label button={{ icon: <CloseIcon />, ref: setRedBackground }}>Group added</Label>
        </div>
    )
    .add("size", () =>
        <div className="flex items-end">
            <Label size="mini" button={<Button icon={<CloseIcon />} />}>Group added</Label>
            <Label size="tiny" button={<Button icon={<CloseIcon />} />}>Group added</Label>
            <Label size="small" button={<Button icon={<CloseIcon />} />}>Group added</Label>
            <Label button={<Button icon={<CloseIcon />} />}>Group added</Label>
            <Label size="large" button={<Button icon={<CloseIcon />} />}>Group added</Label>
        </div>
    );

stories("/tag")
    .add("element", () =>
        <div className="flex">
            <Label tag={<Tag className="bg-red" />}>Group added</Label>
            <Label tag={<Tag ref={setRedBackground} />}>Group added</Label>
        </div>
    )
    .add("object", () =>
        <div className="flex">
            <Label tag={{ className: "bg-red" }}>Group added</Label>
            <Label tag={{ ref: setRedBackground }}>Group added</Label>
        </div>
    )
    .add("size", () =>
        <div className="flex items-end">
            <Label size="mini" tag={<Tag className="bg-red" />}>Group added</Label>
            <Label size="tiny" tag={<Tag className="bg-red" />}>Group added</Label>
            <Label size="small" tag={<Tag className="bg-red" />}>Group added</Label>
            <Label tag={<Tag className="bg-red" />}>Group added</Label>
            <Label size="large" tag={<Tag className="bg-red" />}>Group added</Label>
        </div>
    );

