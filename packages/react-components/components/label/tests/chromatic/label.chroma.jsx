/* eslint max-len: 0 */

import { Button } from "@orbit-ui/react-button/src";
import { CloseIcon24, CommunicationIcon, MagnifierIcon } from "@orbit-ui/icons";
import { Label } from "@orbit-ui/react-label/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Label"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("defaul",
         () =>
             <div className="flex flex-row">
                 <div className="flex flex-column items-start">
                     <Label>Notification Sent</Label>
                     <Label>Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
                     <Label><CommunicationIcon className="mr2 w6 h6" />Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
                     <Label><CommunicationIcon className="mr2 w6 h6" />Notification Sent</Label>
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
                     <Label circular empty color="red" size="mini"></Label>
                     <Label circular empty color="red" size="tiny"></Label>
                     <Label circular empty color="red" size="small"></Label>
                     <Label circular empty color="red" size="medium"></Label>
                     <Label circular empty color="red" size="large"></Label>
                     <Label circular empty color="red" size="big"></Label>
                     <Label circular empty color="red" size="huge"></Label>
                     <Label circular empty color="red" size="massive"></Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label size="small">Notification Sent</Label>
                     <Label size="small"><CommunicationIcon className="mr2 w6 h6" />Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
                     <Label size="small"><CommunicationIcon className="mr2 w6 h6" />Notification Sent</Label>
                     <Label size="small">Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
                     <Label size="large">Notification Sent</Label>
                     <Label size="large"><CommunicationIcon className="mr2 w6 h6" />Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
                     <Label size="large"><CommunicationIcon className="mr2 w6 h6" />Notification Sent</Label>
                     <Label size="large">Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label tag>
                         <Label circular empty size="tiny" color="red" />
                             Group added
                     </Label>
                     <Label tag>
                         <Label circular empty size="tiny" color="red" />
                             Group added
                         <Button icon circular size="tiny" ghost>
                             <CloseIcon24 className="w4 h4" />
                         </Button>
                     </Label>
                     <Label tag>
                         <Label circular empty size="tiny" color="red" />
                             Group added
                         <CommunicationIcon className="ml2 w6 h6" />
                     </Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label tag size="small">
                         <Label circular empty size="tiny" color="red" />
                            Group added
                     </Label>
                     <Label tag size="small">
                         <Label circular empty size="tiny" color="red" />
                             Group added
                         <Button icon circular size="tiny" ghost>
                             <CloseIcon24 className="w4 h4" />
                         </Button>
                     </Label>
                     <Label tag size="small">
                         <Label circular empty size="tiny" color="red" />
                             Group added
                         <CommunicationIcon className="ml2 w6 h6" />
                     </Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label tag size="large">
                         <Label circular empty size="tiny" color="red" />
                             Group added
                     </Label>
                     <Label tag size="large">
                         <Label circular empty size="tiny" color="red" />
                             Group added
                         <Button icon circular size="tiny" ghost>
                             <CloseIcon24 className="w4 h4" />
                         </Button>
                     </Label>
                     <Label tag size="large">
                         <Label circular empty size="tiny" color="red" />
                             Group added
                         <CommunicationIcon className="ml2 w6 h6" />
                     </Label>
                 </div>
             </div>
    ).add("basic", () =>
        <div className="flex flex-row">
            <div className="flex flex-column items-start">
                <Label basic>Notification Sent</Label>
                <Label basic>Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
                <Label basic><CommunicationIcon className="mr2 w6 h6" />Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
                <Label basic><CommunicationIcon className="mr2 w6 h6" />Notification Sent</Label>
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
                <Label basic circular empty color="red" size="mini"></Label>
                <Label basic circular empty color="red" size="tiny"></Label>
                <Label basic circular empty color="red" size="small"></Label>
                <Label basic circular empty color="red" size="medium"></Label>
                <Label basic circular empty color="red" size="large"></Label>
                <Label basic circular empty color="red" size="big"></Label>
                <Label basic circular empty color="red" size="huge"></Label>
                <Label basic circular empty color="red" size="massive"></Label>
            </div>
            <div className="flex flex-column items-start">
                <Label basic size="small">Notification Sent</Label>
                <Label basic size="small"><CommunicationIcon className="mr2 w6 h6" />Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
                <Label basic size="small"><CommunicationIcon className="mr2 w6 h6" />Notification Sent</Label>
                <Label basic size="small">Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
                <Label basic size="large">Notification Sent</Label>
                <Label basic size="large"><CommunicationIcon className="mr2 w6 h6" />Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
                <Label basic size="large"><CommunicationIcon className="mr2 w6 h6" />Notification Sent</Label>
                <Label basic size="large">Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
            </div>
            <div className="flex flex-column items-start">
                <Label basic tag>
                    <Label circular empty size="tiny" color="red" />
                        Group added
                </Label>
                <Label basic tag>
                    <Label circular empty size="tiny" color="red" />
                        Group added
                    <Button icon circular size="tiny" ghost>
                        <CloseIcon24 className="w4 h4" />
                    </Button>
                </Label>
                <Label basic tag>
                    <Label circular empty size="tiny" color="red" />
                        Group added
                    <CommunicationIcon className="ml2 w6 h6" />
                </Label>
            </div>
            <div className="flex flex-column items-start">
                <Label basic tag size="small">
                    <Label circular empty size="tiny" color="red" />
                    Group added
                </Label>
                <Label basic tag size="small">
                    <Label circular empty size="tiny" color="red" />
                        Group added
                    <Button icon circular size="tiny" ghost>
                        <CloseIcon24 className="w4 h4" />
                    </Button>
                </Label>
                <Label basic tag size="small">
                    <Label circular empty size="tiny" color="red" />
                        Group added
                    <CommunicationIcon className="ml2 w6 h6" />
                </Label>
            </div>
            <div className="flex flex-column items-start">
                <Label basic tag size="large">
                    <Label circular empty size="tiny" color="red" />
                        Group added
                </Label>
                <Label basic tag size="large">
                    <Label circular empty size="tiny" color="red" />
                        Group added
                    <Button icon circular size="tiny" ghost>
                        <CloseIcon24 className="w4 h4" />
                    </Button>
                </Label>
                <Label basic tag size="large">
                    <Label circular empty size="tiny" color="red" />
                        Group added
                    <CommunicationIcon className="ml2 w6 h6" />
                </Label>
            </div>
        </div>
    )
    .add("naked", () =>
        <div className="flex flex-row">
            <div className="flex flex-column items-start">
                <Label naked>Notification Sent</Label>
                <Label naked>Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
                <Label circular naked size="medium">R</Label>
                <Label tag naked>
                    <Label circular empty size="tiny" color="red" />
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
                <Label
                    naked
                    circular
                    empty
                    size="tiny"
                    style={{
                        backgroundColor: "#AAFF32"
                    }}
                ></Label>
            </div>
        </div>
    );
