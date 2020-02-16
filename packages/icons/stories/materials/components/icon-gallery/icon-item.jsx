import styles from "./icon-item.module.css";

import { IconModal } from "./details";
import { MULTI_VARIANT_SHAPE, VARIANT_SHAPE } from "./shapes";
import { PreviewIcon } from "./preview-icon";
import { arrayOf, shape, string } from "prop-types";
import { useState } from "react";

function getDisplayName(name) {
    return name.split(/(?=[A-Z])/).join(" ");
}

export function IconItem({ name, multiVariant, variants }) {
    const [isModalOpen, showModal] = useState(false);

    const handleShowDetail = () => {
        showModal(true);
    };

    const handleCloseModal = () => {
        showModal(false);
    };

    const displayName = getDisplayName(name);

    return (
        <>
            <div className={`${styles.item} flex flex-column`}>
                <div className="pa3 tc">{displayName.toLowerCase()}</div>
                <div className="flex justify-center">
                    <div className="w7 h7">
                        <PreviewIcon icon={multiVariant.icon} onShowDetail={handleShowDetail} />
                    </div>
                </div>
            </div>

            <IconModal
                open={isModalOpen}
                iconName={name}
                iconDisplayName={displayName}
                multiVariant={multiVariant}
                variants={variants}
                onClose={handleCloseModal}
            />
        </>
    );
}

IconItem.propTypes = {
    name: string.isRequired,
    multiVariant: shape(MULTI_VARIANT_SHAPE).isRequired,
    variants: arrayOf(shape(VARIANT_SHAPE))
};
