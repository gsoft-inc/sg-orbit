import "./PreviewIcon.css";
import { Div, Span, HtmlButton, DivProps } from "@components/html";
import { ReactElement } from "react";
import { CreatedIconProps } from "@components/icons";

interface PreviewIconProps extends DivProps {
    icon: ReactElement<CreatedIconProps>;
    displayName: string;
    onShowDetail: () => void;
}

export function PreviewIcon({ icon, displayName, onShowDetail, ...rest }: PreviewIconProps) {
    const onIconClick = () => {
        onShowDetail();
    };

    return (
        <Div className="o-ui-sb-gallery-preview-icon" tabIndex={0} {...rest}>
            <Div className="o-ui-sb-gallery-preview-container" tabIndex={-1}>
                <HtmlButton
                    onClick={onIconClick}
                    className="o-ui-sb-gallery-view-button"
                    type="button"
                    borderRadius={2}
                    tabIndex={-1}
                >
                    <Span className="o-ui-sb-gallery-view-button-wrapper">
                        {icon}
                        {displayName}
                    </Span>
                </HtmlButton>
            </Div>
        </Div>
    );
}
