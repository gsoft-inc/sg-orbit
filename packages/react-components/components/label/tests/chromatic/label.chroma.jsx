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
    .add("default",
         () =>
             <>
                 <div className="flex flex-row">
                     <div className="flex flex-column items-start">
                         <Label>Notification Sent</Label>
                         <Label>Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
                         <Label><CommunicationIcon className="mr2 w6 h6" />Notification Sent <MagnifierIcon className="ml2 w6 h6" /></Label>
                         <Label><CommunicationIcon className="mr2 w6 h6" />Notification Sent</Label>
                     </div>
                     <div className="flex flex-column items-start">
                         <Label circular>R</Label>
                         <Label circular size="mini">R</Label>
                         <Label circular size="tiny">R</Label>
                         <Label circular size="small">R</Label>
                         <Label circular size="medium">R</Label>
                         <Label circular size="large">R</Label>
                         <Label circular size="big">R</Label>
                         <Label circular size="huge">R</Label>
                         <Label circular size="massive">R</Label>
                         <Label circular size="mini" empty color="red" />
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
                             <Label circular empty size="mini" color="red" />
                             Group added
                         </Label>
                         <Label tag>
                             <Label circular empty size="mini" color="red" />
                             Group added
                             <Button icon circular size="tiny" className="transparent">
                                 <CloseIcon24 className="w4 h4" />
                             </Button>
                         </Label>
                         <Label tag>
                             <Label circular empty size="mini" color="red" />
                             Group added
                             <CommunicationIcon className="ml2 w6 h6" />
                         </Label>
                     </div>
                     <div className="flex flex-column items-start">
                         <Label tag size="small">
                             <Label circular empty size="mini" color="red" />
                            Group added
                         </Label>
                         <Label tag size="small">
                             <Label circular empty size="mini" color="red" />
                             Group added
                             <Button icon circular size="tiny" className="transparent">
                                 <CloseIcon24 className="w4 h4" />
                             </Button>
                         </Label>
                         <Label tag size="small">
                             <Label circular empty size="mini" color="red" />
                             Group added
                             <CommunicationIcon className="ml2 w6 h6" />
                         </Label>
                     </div>
                     <div className="flex flex-column items-start">
                         <Label tag size="large">
                             <Label circular empty size="mini" color="red" />
                             Group added
                         </Label>
                         <Label tag size="large">
                             <Label circular empty size="mini" color="red" />
                             Group added
                             <Button icon circular size="tiny" className="transparent">
                                 <CloseIcon24 className="w4 h4" />
                             </Button>
                         </Label>
                         <Label tag size="large">
                             <Label circular empty size="mini" color="red" />
                             Group added
                             <CommunicationIcon className="ml2 w6 h6" />
                         </Label>
                     </div>
                 </div>
             </>
    ).add("basic", () =>
        <div className="flex flex-row">
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
                <Label tag basic>
                    <Label circular empty size="mini" color="red" />
                    Group added
                </Label>
                <Label tag basic>
                    <Label circular empty size="mini" color="red" />
                    Group added
                    <Button icon circular size="tiny" className="transparent">
                        <CloseIcon24 className="w4 h4" />
                    </Button>
                </Label>
                <Label tag basic>
                    <Label circular empty size="mini" color="red" />
                    Group added
                    <CommunicationIcon className="ml2 w6 h6" />
                </Label>
            </div>
            <div className="flex flex-column items-start">
                <Label tag basic size="small">
                    <Label circular empty size="mini" color="red" />
                    Group added
                </Label>
                <Label tag basic size="small">
                    <Label circular empty size="mini" color="red" />
                    Group added
                    <Button icon circular size="tiny" className="transparent">
                        <CloseIcon24 className="w4 h4" />
                    </Button>
                </Label>
                <Label tag basic size="small">
                    <Label circular empty size="mini" color="red" />
                    Group added
                    <CommunicationIcon className="ml2 w6 h6" />
                </Label>
            </div>
            <div className="flex flex-column items-start">
                <Label tag basic size="large">
                    <Label circular empty size="mini" color="red" />
                    Group added
                </Label>
                <Label tag basic size="large">
                    <Label circular empty size="mini" color="red" />
                    Group added
                    <Button icon circular size="tiny" className="transparent">
                        <CloseIcon24 className="w4 h4" />
                    </Button>
                </Label>
                <Label tag basic size="large">
                    <Label circular empty size="mini" color="red" />
                    Group added
                    <CommunicationIcon className="ml2 w6 h6" />
                </Label>
            </div>
        </div>
    );
