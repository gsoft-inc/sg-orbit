import { Badge } from "@react-components/badge";
import { Button } from "@react-components/button";
import { CloseIcon, LightbulbIcon } from "@react-components/icons";
import { Tag } from "@react-components/tagv2";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createTestSuite } from "./createTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Tagv2"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("standard", createTestSuite(<Tag />))
    .add("basic", createTestSuite(<Tag basic />))
    .add("compact", () =>
        <div className="flex flex-column">
            <div className="flex mb5">
                <Tag compact className="mr5">Notification Sent</Tag>
                <Tag compact className="bg-red mr5">Notification Sent</Tag>
                <Tag compact style={{ backgroundColor: "red" }}>Notification Sent</Tag>
            </div>
            <div className="flex items-end mb5">
                <Tag compact size="small" className="mr5">Notification Sent</Tag>
                <Tag compact className="mr5">Notification Sent</Tag>
                <Tag compact size="large">Notification Sent</Tag>
            </div>
            <div className="flex items-end mb5">
                <Tag compact size="small" icon={<LightbulbIcon />} className="mr5">Notification Sent</Tag>
                <Tag compact icon={<LightbulbIcon />} className="mr5">Notification Sent</Tag>
                <Tag compact size="large" icon={<LightbulbIcon />}>Notification Sent</Tag>
            </div>
            <div className="flex items-end mb5">
                <Tag compact size="small" icon={<LightbulbIcon />} iconPosition="right" className="mr5">Notification Sent</Tag>
                <Tag compact icon={<LightbulbIcon />} iconPosition="right" className="mr5">Notification Sent</Tag>
                <Tag compact size="large" icon={<LightbulbIcon />} iconPosition="right">Notification Sent</Tag>
            </div>
            <div className="flex mb5">
                <Tag compact icon={<LightbulbIcon className="fill-red" />}>Notification Sent</Tag>
            </div>
            <div className="flex items-end mb5">
                <Tag compact size="small" dot={<Badge />} className="mr5">Notification Sent</Tag>
                <Tag compact dot={<Badge />} className="mr5">Notification Sent</Tag>
                <Tag compact size="large" dot={<Badge />}>Notification Sent</Tag>
            </div>
            <div className="flex items-end mb5">
                <Tag compact size="small" dot={<Badge />} icon={<LightbulbIcon />} iconPosition="right" className="mr5">Notification Sent</Tag>
                <Tag compact dot={<Badge />} icon={<LightbulbIcon />} iconPosition="right" className="mr5">Notification Sent</Tag>
                <Tag compact size="large" dot={<Badge />} icon={<LightbulbIcon />} iconPosition="right">Notification Sent</Tag>
            </div>
            <div className="flex items-end mb5">
                <Tag compact size="small" button={<Button icon={<CloseIcon />} />} className="mr5">Notification Sent</Tag>
                <Tag compact button={<Button icon={<CloseIcon />} />} className="mr5">Notification Sent</Tag>
                <Tag compact size="large" button={<Button icon={<CloseIcon />} />}>Notification Sent</Tag>
            </div>
            <div className="flex items-end mb5">
                <Tag compact size="small" button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} className="mr5">Notification Sent</Tag>
                <Tag compact button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />} className="mr5">Notification Sent</Tag>
                <Tag compact size="large" button={<Button icon={<CloseIcon />} />} icon={<LightbulbIcon />}>Notification Sent</Tag>
            </div>
        </div>
    );

