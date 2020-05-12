import styles from "./preview-icon.module.css";

import { cloneElement } from "react";
import { element, func } from "prop-types";

function renderIcon(icon) {
    return cloneElement(icon, {
        size: "large"
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
        <div className={styles.previewIcon} onKeyDown={onIconEnterKeyDown} tabIndex={0}>
            {renderIcon(icon)}
            <div className={styles.viewContainer} tabIndex={-1}>
                <button
                    onClick={onIconClick}
                    className={styles.viewButton}
                    type="button"
                    tabIndex={-1}
                >
                    View
                </button>
            </div>
        </div>
    );
}

PreviewIcon.propTypes = {
    icon: element.isRequired,
    onShowDetail: func.isRequired
};
