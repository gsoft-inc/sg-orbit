import { Badge } from "@react-components/badge";
import { Button } from "@react-components/button";
import { CrossIcon, LightbulbIcon } from "@react-components/icons";
import { cloneElement } from "react";

function Tag({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(tag) {
    return () =>
        <div className="flex">
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
                    <Tag size="small" iconLeft={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag iconLeft={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag size="large" iconLeft={<LightbulbIcon />} element={tag}>Notification Sent</Tag>
                </div>
                <div className="flex items-end mb5">
                    <Tag size="small" iconRight={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag iconRight={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag size="large" iconRight={<LightbulbIcon />} element={tag}>Notification Sent</Tag>
                </div>
                <div className="flex mb5">
                    <Tag iconLeft={<LightbulbIcon className="fill-red" />} element={tag}>Notification Sent</Tag>
                </div>
                <div className="flex items-end mb5">
                    <Tag size="small" badgeLeft={<Badge variant="dot" />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag badgeLeft={<Badge variant="dot" />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag size="large" badgeLeft={<Badge variant="dot" />} element={tag}>Notification Sent</Tag>
                </div>
                <div className="flex items-end mb5">
                    <Tag size="small" badgeLeft={<Badge variant="dot" />} iconRight={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag badgeLeft={<Badge variant="dot" />} iconRight={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag size="large" badgeLeft={<Badge variant="dot" />} iconRight={<LightbulbIcon />} element={tag}>Notification Sent</Tag>
                </div>
                <div className="flex items-end mb5">
                    <Tag size="small" badgeRight={<Badge>77</Badge>} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag badgeRight={<Badge>77</Badge>} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag size="large" badgeRight={<Badge>77</Badge>} element={tag}>Notification Sent</Tag>
                </div>
                <div className="flex items-end mb5">
                    <Tag size="small" badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>77</Badge>} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>77</Badge>} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag size="large" badgeLeft={<Badge variant="dot" />} badgeRight={<Badge>77</Badge>} element={tag}>Notification Sent</Tag>
                </div>
            </div>
            <div className="flex flex-column">
                <div className="flex items-end mb5">
                    <Tag size="small" button={<Button icon={<CrossIcon />} />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag button={<Button icon={<CrossIcon />} />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag size="large" button={<Button icon={<CrossIcon />} />} element={tag}>Notification Sent</Tag>
                </div>
                <div className="flex items-end mb5">
                    <Tag size="small" button={<Button icon={<CrossIcon />} />} icon={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag button={<Button icon={<CrossIcon />} />} icon={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag size="large" button={<Button icon={<CrossIcon />} />} icon={<LightbulbIcon />} element={tag}>Notification Sent</Tag>
                </div>
                <div className="flex">
                    <Tag as="a" element={tag} className="mr5">Notification Sent</Tag>
                    <Tag as="button" element={tag}>Notification Sent</Tag>
                </div>
            </div>
        </div>;
}
