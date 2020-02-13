import styles from "./preview-icon.module.css";

export function PreviewIcon({ icon }) {
    const onIconClick = () => {
        console.log("onIconClick!");
    };

    const onIconEnterKeyDown = () => {
        console.log("onIconEnterKeyDown!");
    };

    return (
        <div className={`${styles.previewIcon} sbdocs sbdocs-ig-icon`} onKeyDown={onIconEnterKeyDown} tabIndex={0}>
            {icon}
            <div className={`${styles.view} sbdocs sbdocs-ig-copy`} tabIndex={-1}>
                <button
                    className="sbdocs sbdocs-ig-view-button"
                    onClick={onIconClick}
                    type="button"
                    tabIndex={-1}
                >
                    View
                </button>
            </div>
        </div>
    );
}
