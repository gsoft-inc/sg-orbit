import { PreviewSection } from "./PreviewSection";
import { UsageSection } from "./UsageSection";
import { ReactElement } from "react";
import { CreatedIconProps } from "@components/icons";

interface IconDetailProps {
    name: string;
    iconComponent: ReactElement<CreatedIconProps>;
    iconFileName: string;
}

export function IconDetail({ name, iconComponent, iconFileName }: IconDetailProps) {
    return (
        <>
            <PreviewSection icon={iconComponent} />
            <UsageSection
                iconDisplayName={name}
                iconFileName={iconFileName}
                iconComponent={iconComponent}
            />
        </>
    );
}
