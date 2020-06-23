import { Badge } from "@react-components/badge";
import { Button } from "@react-components/button";
import { CloseIcon, LightbulbIcon } from "@react-components/icons";
import { cloneElement } from "react";

function Tag({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(tag) {
    return () =>
        <div className="flex flex-column">
            <div className="flex mb5">
                <Tag element={tag} className="mr5">Notification Sent</Tag>
                <Tag className="bg-red mr5" element={tag}>Notification Sent</Tag>
                <Tag style={{ backgroundColor: "red" }} element={tag}>Notification Sent</Tag>
            </div>
            <div className="flex items-end mb5">
                <Tag size="small" element={tag} className="mr5">Notification Sent</Tag>
                <Tag element={tag} className="mr5">Notification Sent</Tag>
                <Tag size="large" element={tag}>Notification Sent</Tag>
            </div>
            <div className="flex items-end mb5">
                <Tag size="small" icon={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                <Tag icon={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                <Tag size="large" icon={<LightbulbIcon />} element={tag}>Notification Sent</Tag>
            </div>
            <div className="flex items-end mb5">
                <Tag size="small" icon={<LightbulbIcon />} iconPosition="right" element={tag} className="mr5">Notification Sent</Tag>
                <Tag icon={<LightbulbIcon />} element={tag} iconPosition="right" className="mr5">Notification Sent</Tag>
                <Tag size="large" icon={<LightbulbIcon />} iconPosition="right" element={tag}>Notification Sent</Tag>
            </div>
            <div className="flex mb5">
                <Tag icon={<LightbulbIcon className="fill-red" />} element={tag}>Notification Sent</Tag>
            </div>
            <div className="flex items-end mb5">
                <Tag size="small" dot={<Badge />} element={tag} className="mr5">Notification Sent</Tag>
                <Tag dot={<Badge />} element={tag} className="mr5">Notification Sent</Tag>
                <Tag size="large" dot={<Badge />} element={tag}>Notification Sent</Tag>
            </div>
            <div className="flex items-end mb5">
                <Tag size="small" dot={<Badge />} icon={<LightbulbIcon />} iconPosition="right" element={tag} className="mr5">Notification Sent</Tag>
                <Tag dot={<Badge />} icon={<LightbulbIcon />} iconPosition="right" element={tag} className="mr5">Notification Sent</Tag>
                <Tag size="large" dot={<Badge />} icon={<LightbulbIcon />} iconPosition="right" element={tag}>Notification Sent</Tag>
            </div>
            <div className="flex items-end mb5">
                <Tag size="small" button={<Button icon={<CloseIcon />} />} element={tag} className="mr5">Notification Sent</Tag>
                <Tag button={<Button icon={<CloseIcon />} />} element={tag} className="mr5">Notification Sent</Tag>
                <Tag size="large" button={<Button icon={<CloseIcon />} />} element={tag}>Notification Sent</Tag>
            </div>
            <div className="flex items-end mb5">
                <Tag size="small" button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                <Tag button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                <Tag size="large" button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} element={tag}>Notification Sent</Tag>
            </div>
        </div>;
}
