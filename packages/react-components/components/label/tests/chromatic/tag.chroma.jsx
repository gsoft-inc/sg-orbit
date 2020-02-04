/* eslint max-len: 0 */

import { Button } from "@orbit-ui/react-button/src";
import { CloseIcon24, CommunicationIcon } from "@orbit-ui/icons";
import { Label } from "@orbit-ui/react-label/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { isNil } from "lodash";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Tag"))
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
                     <Label tag>
                         <Label circular empty size="tiny" color="red" />
                             Group added
                     </Label>
                     <Label tag button={<Button icon={<CloseIcon24 />} />}>
                         <Label circular empty size="tiny" color="red" />
                         Group added
                     </Label>
                     <Label tag icon={<CommunicationIcon />} iconPosition="right">
                         <Label circular empty size="tiny" color="red" />
                         Group added
                     </Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label tag size="small">
                         <Label circular empty size="tiny" color="red" />
                         Group added
                     </Label>
                     <Label tag size="small" button={<Button icon={<CloseIcon24 />} />}>
                         <Label circular empty size="tiny" color="red" />
                          Group added
                     </Label>
                     <Label tag size="small" icon={<CommunicationIcon />} iconPosition="right" >
                         <Label circular empty size="tiny" color="red" />
                          Group added
                     </Label>
                 </div>
                 <div className="flex flex-column items-start">
                     <Label tag size="large">
                         <Label circular empty size="tiny" color="red" />
                         Group added
                     </Label>
                     <Label tag size="large" button={<Button icon={<CloseIcon24 />} />}>
                         <Label circular empty size="tiny" color="red" />
                             Group added
                     </Label>
                     <Label tag size="large" icon={<CommunicationIcon />}>
                         <Label circular empty size="tiny" color="red" />
                         Group added
                     </Label>
                 </div>
             </div>
    );

stories()
    .add("basic", () =>
        <div className="flex flex-row">
            <div className="flex flex-column items-start">
                <Label basic tag>
                    <Label circular empty size="tiny" color="red" />
                    Group added
                </Label>
                <Label basic tag button={<Button icon={<CloseIcon24 />} />}>
                    <Label circular empty size="tiny" color="red" />
                    Group added
                </Label>
                <Label basic tag icon={<CommunicationIcon />} iconPosition="right">
                    <Label circular empty size="tiny" color="red" />
                    Group added
                </Label>
            </div>
            <div className="flex flex-column items-start">
                <Label basic tag size="small">
                    <Label circular empty size="tiny" color="red" />
                    Group added
                </Label>
                <Label basic tag size="small" button={<Button icon={<CloseIcon24 />} />}>
                    <Label circular empty size="tiny" color="red" />
                    Group added
                </Label>
                <Label basic tag size="small" icon={<CommunicationIcon />} iconPosition="right">
                    <Label circular empty size="tiny" color="red" />
                    Group added
                </Label>
            </div>
            <div className="flex flex-column items-start">
                <Label basic tag size="large">
                    <Label circular empty size="tiny" color="red" />
                    Group added
                </Label>
                <Label basic tag size="large" button={<Button icon={<CloseIcon24 />} />}>
                    <Label circular empty size="tiny" color="red" />
                    Group added
                </Label>
                <Label basic tag size="large" icon={<CommunicationIcon />} iconPosition="right">
                    <Label circular empty size="tiny" color="red" />
                    Group added
                </Label>
            </div>
        </div>
    );

stories()
    .add("naked", () =>
        <div className="flex flex-row">
            <div className="flex flex-column items-start">
                <Label tag naked>
                    <Label circular empty size="tiny" color="red" />
                    Group added
                </Label>
            </div>
        </div>
    );

stories("/icons")
    .add("default", () =>
        <Label tag icon={<CommunicationIcon />}>
            <Label circular empty size="tiny" color="red" />
            Notification Sent
        </Label>
    )
    .add("right", () =>
        <Label tag icon={<CommunicationIcon />} iconPosition="right">
            <Label circular empty size="tiny" color="red" />
            Notification Sent
        </Label>
    )
    .add("css class", () =>
        <Label tag icon={<CommunicationIcon className="fill-red" />}>
            <Label circular empty size="tiny" color="red" />
            Notification Sent
        </Label>
    );

function addBorderToElement(element) {
    if (!isNil(element)) {
        element.classList.add("bg-red");
    }
}

stories("/button/render prop")
    .add("default", () =>
        <Label tag button={<Button icon={<CloseIcon24 />} />}>
            <Label circular empty size="tiny" color="red" />
            Group added
        </Label>
    )
    .add("css class", () =>
        <Label tag button={<Button icon={<CloseIcon24 />} className= "bg-red" />}>
            <Label circular empty size="tiny" color="red" />
            Group added
        </Label>
    )
    .add("ref", () =>
        <Label tag button={<Button icon={<CloseIcon24 />} ref={addBorderToElement} />}>
            <Label circular empty size="tiny" color="red" />
            Group added
        </Label>
    );

stories("/button/shorthand")
    .add("default", () =>
        <Label tag button={{ icon: <CloseIcon24 /> }}>
            <Label circular empty size="tiny" color="red" />
            Group added
        </Label>
    )
    .add("css class", () =>
        <Label tag button={{ icon: <CloseIcon24 />, className: "bg-red" }}>
            <Label circular empty size="tiny" color="red" />
            Group added
        </Label>
    )
    .add("ref", () =>
        <Label tag button={{ icon: <CloseIcon24 />, ref: addBorderToElement }}>
            <Label circular empty size="tiny" color="red" />
            Group added
        </Label>
    );
