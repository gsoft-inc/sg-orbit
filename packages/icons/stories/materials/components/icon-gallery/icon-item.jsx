import styles from "./icon-item.module.css";

import { PreviewIcon } from "./preview-icon";
import { element, shape, string } from "prop-types";

const MULTI_VARIANT_SHAPE = {
    previewIcon: element.isRequired
};

export function IconItem({ name, multiVariant }) {
    return (
        <div className={styles.item}>
            <div className={styles.name}>{name.toLowerCase()}</div>
            <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                    <PreviewIcon icon={multiVariant.previewIcon} />
                </div>
            </div>
        </div>
    );
}

IconItem.propTypes = {
    name: string.isRequired,
    multiVariant: shape(MULTI_VARIANT_SHAPE).isRequired
};
