import styles from "./icon-item.module.css";

import { IconModal } from "./details";
import { PreviewIcon } from "./preview-icon";
import { element, shape, string } from "prop-types";
import { useState } from "react";

const MULTI_VARIANT_SHAPE = {
    previewIcon: element.isRequired
};

function getDisplayName(name) {
    return name.split(/(?=[A-Z])/)
        .join(" ")
        .toLowerCase();
}

export function IconItem({ name, multiVariant }) {
    const [isModalOpen, showModal] = useState(false);

    const handleShowDetail = () => {
        showModal(true);
    };

    const handleCloseModal = () => {
        showModal(false);
    };

    return (
        <>
            <div className={styles.item}>
                <div className={styles.name}>{getDisplayName(name)}</div>
                <div className={styles.iconWrapper}>
                    <div className={styles.iconContainer}>
                        <PreviewIcon icon={multiVariant.previewIcon} onShowDetail={handleShowDetail} />
                    </div>
                </div>
            </div>

            <IconModal
                open={isModalOpen}
                iconName={name}
                multiVariant={multiVariant}
                onClose={handleCloseModal}
            />
        </>
    );
}

IconItem.propTypes = {
    name: string.isRequired,
    multiVariant: shape(MULTI_VARIANT_SHAPE).isRequired
};
