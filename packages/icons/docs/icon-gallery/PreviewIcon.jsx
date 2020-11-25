import "./PreviewIcon.css";

import { cloneElement } from "react";
import { element, func } from "prop-types";

const propTypes = {
    icon: element.isRequired,
    onShowDetail: func.isRequired
};

function renderIcon(icon) {
    return cloneElement(icon, {
        size: "lg"
    });
}

export function PreviewIcon({ icon, onShowDetail }) {
    const onIconClick = () => {
        onShowDetail();
    };

    const onIconEnterKeyDown = () => {
        onShowDetail();
    };

    return (
        <div className="o-ui-sb-gallery-preview-icon" onKeyDown={onIconEnterKeyDown} tabIndex={0}>
            {renderIcon(icon)}
            <div className="o-ui-sb-gallery-preview-container" tabIndex={-1}>
                <button
                    onClick={onIconClick}
                    className="o-ui-sb-gallery-view-button"
                    type="button"
                    tabIndex={-1}
                >
                    View
                </button>
            </div>
        </div>
    );
}

PreviewIcon.propTypes = propTypes;
