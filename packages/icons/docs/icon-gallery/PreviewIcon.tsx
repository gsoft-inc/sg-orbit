import "./PreviewIcon.css";
import { Div, HtmlButton, DivProps } from "@components/html";
import { ReactElement } from "react";
import { CreatedIconProps } from "@components/icons";

interface PreviewIconProps extends DivProps {
    icon: ReactElement<CreatedIconProps>;
    onShowDetail: () => void;
}

export function PreviewIcon({ icon, onShowDetail, ...rest }: PreviewIconProps) {
    const onIconClick = () => {
        onShowDetail();
    };

    return (
        <Div className="o-ui-sb-gallery-preview-icon" tabIndex={0} {...rest}>
            {icon}
            <Div className="o-ui-sb-gallery-preview-container" tabIndex={-1}>
                <HtmlButton
                    onClick={onIconClick}
                    className="o-ui-sb-gallery-view-button"
                    type="button"
                    borderRadius={2}
                    tabIndex={-1}
                >
                    View
                </HtmlButton>
            </Div>
        </Div>
    );
}
