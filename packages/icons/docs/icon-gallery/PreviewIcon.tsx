import "./PreviewIcon.css";
import { Span, HtmlButton, DivProps } from "@components/html";
import { ReactElement } from "react";
import { CreatedIconProps } from "@components/icons";

interface PreviewIconProps extends DivProps {
    icon: ReactElement<CreatedIconProps>;
    displayName: string;
    onShowDetail: () => void;
}

export function PreviewIcon({ icon, displayName, onShowDetail }: PreviewIconProps) {
    const onIconClick = () => {
        onShowDetail();
    };

    return (
        <HtmlButton
            onClick={onIconClick}
            className="o-ui-sb-gallery-item"
            type="button"
        >
            <Span className="o-ui-sb-gallery-view-button-wrapper">
                {icon}
                {displayName}
            </Span>
        </HtmlButton>
    );
}
