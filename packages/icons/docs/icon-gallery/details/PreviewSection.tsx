import { CheckeredBackground } from "@stories/components";
import { CreatedIconProps } from "@components/icons";
import { Inline } from "@components/layout";
import { cloneElement, ReactElement } from "react";

interface PreviewSectionProps {
    icon: ReactElement<CreatedIconProps>;
}

export function PreviewSection({ icon }: PreviewSectionProps) {
    return (
        <CheckeredBackground>
            <Inline alignY="end" gap={2}>
                {cloneElement(icon, { size: "2xs" })}
                {cloneElement(icon, { size: "xs" })}
                {cloneElement(icon, { size: "sm" })}
                {cloneElement(icon, { size: "md" })}
                {cloneElement(icon, { size: "lg" })}
                {cloneElement(icon, { size: "xl" })}
            </Inline>
        </CheckeredBackground>
    );
}
