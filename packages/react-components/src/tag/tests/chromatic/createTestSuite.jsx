import { Badge } from "@react-components/badge";
import { Button } from "@react-components/button";
import { CloseIcon, LightbulbIcon } from "@react-components/icons";
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
                    <Tag size="small" leftIcon={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag leftIcon={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag size="large" leftIcon={<LightbulbIcon />} element={tag}>Notification Sent</Tag>
                </div>
                <div className="flex items-end mb5">
                    <Tag size="small" rightIcon={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag rightIcon={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag size="large" rightIcon={<LightbulbIcon />} element={tag}>Notification Sent</Tag>
                </div>
                <div className="flex mb5">
                    <Tag leftIcon={<LightbulbIcon className="fill-red" />} element={tag}>Notification Sent</Tag>
                </div>
                <div className="flex items-end mb5">
                    <Tag size="small" leftBadge={<Badge variant="dot" />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag leftBadge={<Badge variant="dot" />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag size="large" leftBadge={<Badge variant="dot" />} element={tag}>Notification Sent</Tag>
                </div>
                <div className="flex items-end mb5">
                    <Tag size="small" leftBadge={<Badge variant="dot" />} rightIcon={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag leftBadge={<Badge variant="dot" />} rightIcon={<LightbulbIcon />} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag size="large" leftBadge={<Badge variant="dot" />} rightIcon={<LightbulbIcon />} element={tag}>Notification Sent</Tag>
                </div>
                <div className="flex items-end mb5">
                    <Tag size="small" rightBadge={<Badge>77</Badge>} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag rightBadge={<Badge>77</Badge>} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag size="large" rightBadge={<Badge>77</Badge>} element={tag}>Notification Sent</Tag>
                </div>
                <div className="flex items-end mb5">
                    <Tag size="small" leftBadge={<Badge variant="dot" />} rightBadge={<Badge>77</Badge>} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag leftBadge={<Badge variant="dot" />} rightBadge={<Badge>77</Badge>} element={tag} className="mr5">Notification Sent</Tag>
                    <Tag size="large" leftBadge={<Badge variant="dot" />} rightBadge={<Badge>77</Badge>} element={tag}>Notification Sent</Tag>
                </div>
            </div>
            <div className="flex flex-column">
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
                <div className="flex">
                    <Tag as="a" element={tag} className="mr5">Notification Sent</Tag>
                    <Tag as="button" element={tag}>Notification Sent</Tag>
                </div>
            </div>
        </div>;
}
