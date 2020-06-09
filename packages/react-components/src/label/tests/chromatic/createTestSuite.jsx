import { Button } from "@react-components/button";
import { CloseIcon, LightbulbIcon } from "@react-components/icons";
import { Tag } from "@react-components/tag";
import { cloneElement } from "react";

function Label({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(label, stories) {
    return stories
        .add("default", () =>
            <div className="flex flex-column">
                <div className="flex mb5">
                    <Label element={label} className="mr5">Notification Sent</Label>
                    <Label highlight element={label} className="mr5">Notification Sent</Label>
                    <Label className="bg-red mr5" element={label}>Notification Sent</Label>
                    <Label style={{ backgroundColor: "red" }} element={label}>Notification Sent</Label>
                </div>
                <div className="flex items-end mb5">
                    <Label size="micro" element={label} className="mr5">Notification Sent</Label>
                    <Label size="mini" element={label} className="mr5">Notification Sent</Label>
                    <Label size="tiny" element={label} className="mr5">Notification Sent</Label>
                    <Label size="small" element={label} className="mr5">Notification Sent</Label>
                    <Label element={label} className="mr5">Notification Sent</Label>
                    <Label size="large" element={label}>Notification Sent</Label>
                </div>
                <div className="flex items-end mb5">
                    <Label size="micro" icon={<LightbulbIcon />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="mini" icon={<LightbulbIcon />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="tiny" icon={<LightbulbIcon />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="small" icon={<LightbulbIcon />} element={label} className="mr5">Notification Sent</Label>
                    <Label icon={<LightbulbIcon />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="large" icon={<LightbulbIcon />} element={label}>Notification Sent</Label>
                </div>
                <div className="flex items-end mb5">
                    <Label size="micro" icon={<LightbulbIcon />} iconPosition="right" element={label} className="mr5">Notification Sent</Label>
                    <Label size="mini" icon={<LightbulbIcon />} iconPosition="right" element={label} className="mr5">Notification Sent</Label>
                    <Label size="tiny" icon={<LightbulbIcon />} iconPosition="right" element={label} className="mr5">Notification Sent</Label>
                    <Label size="small" icon={<LightbulbIcon />} iconPosition="right" element={label} className="mr5">Notification Sent</Label>
                    <Label icon={<LightbulbIcon />} iconPosition="right" element={label} className="mr5">Notification Sent</Label>
                    <Label size="large" icon={<LightbulbIcon />} iconPosition="right" element={label}>Notification Sent</Label>
                </div>
                <div className="flex items-end mb5">
                    <Label size="micro" icon={<LightbulbIcon />} element={label} className="mr5" />
                    <Label size="mini" icon={<LightbulbIcon />} element={label} className="mr5" />
                    <Label size="tiny" icon={<LightbulbIcon />} element={label} className="mr5" />
                    <Label size="small" icon={<LightbulbIcon />} element={label} className="mr5" />
                    <Label icon={<LightbulbIcon />} element={label} className="mr5" />
                    <Label size="large" icon={<LightbulbIcon />} element={label} />
                </div>
                <div className="flex mb5">
                    <Label icon={<LightbulbIcon className="fill-red" />} element={label}>Notification Sent</Label>
                </div>
                <div className="flex items-end mb5">
                    <Label size="micro" tag={<Tag className="bg-red" />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="mini" tag={<Tag className="bg-red" />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="tiny" tag={<Tag className="bg-red" />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="small" tag={<Tag className="bg-red" />} element={label} className="mr5">Notification Sent</Label>
                    <Label tag={<Tag className="bg-red" />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="large" tag={<Tag className="bg-red" />} element={label}>Notification Sent</Label>
                </div>
                <div className="flex items-end mb5">
                    <Label size="micro" tag={<Tag className="bg-red" />} icon={<LightbulbIcon />} iconPosition="right" element={label} className="mr5">Notification Sent</Label>
                    <Label size="mini" tag={<Tag className="bg-red" />} icon={<LightbulbIcon />} iconPosition="right" element={label} className="mr5">Notification Sent</Label>
                    <Label size="tiny" tag={<Tag className="bg-red" />} icon={<LightbulbIcon />} iconPosition="right" element={label} className="mr5">Notification Sent</Label>
                    <Label size="small" tag={<Tag className="bg-red" />} icon={<LightbulbIcon />} iconPosition="right" element={label} className="mr5">Notification Sent</Label>
                    <Label tag={<Tag className="bg-red" />} icon={<LightbulbIcon />} iconPosition="right" element={label} className="mr5">Notification Sent</Label>
                    <Label size="large" tag={<Tag className="bg-red" />} icon={<LightbulbIcon />} iconPosition="right" element={label}>Notification Sent</Label>
                </div>
                <div className="flex items-end mb5">
                    <Label size="micro" button={<Button icon={<CloseIcon />} />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="mini" button={<Button icon={<CloseIcon />} />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="tiny" button={<Button icon={<CloseIcon />} />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="small" button={<Button icon={<CloseIcon />} />} element={label} className="mr5">Notification Sent</Label>
                    <Label button={<Button icon={<CloseIcon />} />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="large" button={<Button icon={<CloseIcon />} />} element={label}>Notification Sent</Label>
                </div>
                <div className="flex items-end mb5">
                    <Label size="micro" button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="mini" button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="tiny" button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="small" button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} element={label} className="mr5">Notification Sent</Label>
                    <Label button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} element={label} className="mr5">Notification Sent</Label>
                    <Label size="large" button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} element={label}>Notification Sent</Label>
                </div>
            </div>
        )
        .add("circular", () =>
            <div className="flex flex-column">
                <div className="flex mb5">
                    <Label circular element={label} className="mr5">R</Label>
                    <Label highlight circular element={label} className="mr5">R</Label>
                    <Label className="bg-red" circular element={label}>R</Label>
                </div>
                <div className="flex items-end mb5">
                    <Label size="tiny" circular element={label} className="mr5">R</Label>
                    <Label size="small" circular element={label} className="mr5">R</Label>
                    <Label circular element={label} className="mr5">R</Label>
                    <Label size="large" circular element={label} className="mr5">R</Label>
                    <Label size="big" circular element={label} className="mr5">R</Label>
                    <Label size="huge" circular element={label} className="mr5">R</Label>
                    <Label size="massive" circular element={label}>R</Label>
                </div>
                <div className="flex items-end mb5">
                    <Label size="tiny" icon={<LightbulbIcon />} circular element={label} className="mr5" />
                    <Label size="small" icon={<LightbulbIcon />} circular element={label} className="mr5" />
                    <Label icon={<LightbulbIcon />} circular element={label} className="mr5" />
                    <Label size="large" icon={<LightbulbIcon />} circular element={label} className="mr5" />
                    <Label size="big" icon={<LightbulbIcon />} circular element={label} className="mr5" />
                    <Label size="huge" icon={<LightbulbIcon />} circular element={label} className="mr5" />
                    <Label size="massive" icon={<LightbulbIcon />} circular element={label} />
                </div>
                <div className="flex mb5">
                    <Label icon={<LightbulbIcon className="fill-red" />} circular element={label} />
                </div>
            </div>
        );
}
