/* eslint max-len: 0 */

import { Button } from "@orbit-ui/react-button/src";
import { CloseIcon, CommunicationIcon, MagnifierIcon } from "@orbit-ui/icons";
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
             <div className="flex flex-row">
                 <div className="flex flex-column items-start">
                     <Label>Notification Sent</Label>
                     <Label icon={<MagnifierIcon />} iconPosition="right">Notification Sent</Label>
                     <Label icon={<CommunicationIcon />}>Notification Sent</Label>
                     <Label button={<Button icon={<CloseIcon />} />}>
                        Group added
                     </Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label circular size="mini">R</Label>
                     <Label circular size="tiny">R</Label>
                     <Label circular size="small">R</Label>
                     <Label circular size="medium">R</Label>
                     <Label circular size="large">R</Label>
                     <Label circular size="big">R</Label>
                     <Label circular size="huge">R</Label>
                     <Label circular size="massive">R</Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label circular size="mini" icon={<CommunicationIcon />} />
                     <Label circular size="tiny" icon={<CommunicationIcon />} />
                     <Label circular size="small" icon={<CommunicationIcon />} />
                     <Label circular size="medium" icon={<CommunicationIcon />} />
                     <Label circular size="large" icon={<CommunicationIcon />} />
                     <Label circular size="big" icon={<CommunicationIcon />} />
                     <Label circular size="huge" icon={<CommunicationIcon />} />
                     <Label circular size="massive" icon={<CommunicationIcon />} />
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
                     <Label tag={<Tag className="bg-red" />}>
                            Group added
                     </Label>
                     <Label tag={<Tag className="bg-red" />} icon={<CommunicationIcon />} iconPosition="right">
                         Group added
                     </Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label tag={<Tag className="bg-red" />} size="small">
                         Group added
                     </Label>
                     <Label tag={<Tag className="bg-red" />} size="small" icon={<CommunicationIcon />} iconPosition="right" >
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
                 </div>
             </div>
    );

stories()
    .add("basic", () =>
        <div className="flex flex-row">
            <div className="flex flex-column items-start">
                <Label basic>Notification Sent</Label>
                <Label basic icon={<MagnifierIcon />} iconPosition="right">Notification Sent</Label>
                <Label basic icon={<CommunicationIcon />}>Notification Sent</Label>
                <Label basic button={<Button icon={<CloseIcon />} />}>
                    Group added
                </Label>
            </div>
            <div className="flex flex-column items-start">
                <Label basic circular size="mini">R</Label>
                <Label basic circular size="tiny">R</Label>
                <Label basic circular size="small">R</Label>
                <Label basic circular size="medium">R</Label>
                <Label basic circular size="large">R</Label>
                <Label basic circular size="big">R</Label>
                <Label basic circular size="huge">R</Label>
                <Label basic circular size="massive">R</Label>
            </div>
            <div className="flex flex-column items-start">
                <Label basic circular size="mini" icon={<CommunicationIcon />} />
                <Label basic circular size="tiny" icon={<CommunicationIcon />} />
                <Label basic circular size="small" icon={<CommunicationIcon />} />
                <Label basic circular size="medium" icon={<CommunicationIcon />} />
                <Label basic circular size="large" icon={<CommunicationIcon />} />
                <Label basic circular size="big" icon={<CommunicationIcon />} />
                <Label basic circular size="huge" icon={<CommunicationIcon />} />
                <Label basic circular size="massive" icon={<CommunicationIcon />} />
            </div>
            <div className="flex flex-column items-start">
                <Label basic size="small">Notification Sent</Label>
                <Label basic size="small" icon={<CommunicationIcon />}>Notification Sent</Label>
                <Label basic size="small" icon={<MagnifierIcon />} iconPosition="right">Notification Sent</Label>
                <Label basic size="large">Notification Sent</Label>
                <Label basic size="large" icon={<CommunicationIcon />}>Notification Sent</Label>
                <Label basic size="large" icon={ <MagnifierIcon />} iconPosition="right">Notification Sent</Label>
            </div>
            <div className="flex flex-column items-start">
                <Label basic tag={<Tag className="bg-red" />}>
                    Group added
                </Label>
                <Label basic tag={<Tag className="bg-red" />} icon={<CommunicationIcon />} iconPosition="right">
                    Group added
                </Label>
            </div>
            <div className="flex flex-column items-start">
                <Label basic tag={<Tag className="bg-red" />} size="small">
                    Group added
                </Label>
                <Label basic tag={<Tag className="bg-red" />} size="small" button={<Button icon={<CloseIcon />} />}>
                    Group added
                </Label>
                <Label basic tag={<Tag className="bg-red" />} size="small" icon={<CommunicationIcon />} iconPosition="right">
                    Group added
                </Label>
            </div>
            <div className="flex flex-column items-start">
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
    );

stories()
    .add("naked", () =>
        <div className="flex flex-row">
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
    );

stories()
    .add("custom css class", () =>
        <Label className="bg-red">Notification Sent</Label>
    );

stories("/shorthand props/icons")
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

stories("/shorthand props/button/render")
    .add("default", () =>
        <Label button={<Button icon={<CloseIcon />} />}>
            Group added
        </Label>
    )
    .add("css class", () =>
        <Label button={<Button icon={<CloseIcon />} className= "bg-red" />}>
            Group added
        </Label>
    )
    .add("ref", () =>
        <Label button={<Button icon={<CloseIcon />} ref={setRedBackground} />}>
            Group added
        </Label>
    );

stories("/shorthand props/button/object")
    .add("default", () =>
        <Label button={{ icon: <CloseIcon /> }}>
            Group added
        </Label>
    )
    .add("css class", () =>
        <Label button={{ icon: <CloseIcon />, className: "bg-red" }}>
            Group added
        </Label>
    )
    .add("ref", () =>
        <Label button={{ icon: <CloseIcon />, ref: setRedBackground }}>
            Group added
        </Label>
    );

stories("/shorthand props/tag/render")
    .add("default", () =>
        <Label tag={<Tag className="bg-red" />}>
            Group added
        </Label>
    )
    .add("ref", () =>
        <Label tag={<Tag ref={setRedBackground} />}>
            Group added
        </Label>
    );

stories("/shorthand props/tag/object")
    .add("default", () =>
        <Label tag={{ className: "bg-red" }}>
            Group added
        </Label>
    )
    .add("ref", () =>
        <Label tag={{ ref: setRedBackground }}>
            Group added
        </Label>
    );

