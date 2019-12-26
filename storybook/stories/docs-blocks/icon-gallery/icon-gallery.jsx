import styles from "./icon-gallery.module.css";

import { Children, cloneElement } from "react";
import { IconItem } from "./icon-item";
import { IconVariant } from "./icon-variant";
import { any, bool, func } from "prop-types";

function renderItem(item, context) {
    return cloneElement(item, {
        context: context
    });
}

export function IconGallery({ getCopyValue, getDisplayName, inferIconSize, children }) {
    const context = {
        getCopyValue,
        getDisplayName,
        inferIconSize
    };

    return (
        <div className={`${styles.container} sbdocs sbdocs-ig`}>
            {Children.map(children, x => renderItem(x, context))}
        </div>
    );
}

IconGallery.propTypes = {
    getCopyValue: func,
    getDisplayName: func,
    inferIconSize: bool,
    children: any.isRequired
};

IconGallery.defaultProps = {
    getCopyValue: ({ itemName, variantSize }) => `${itemName}${variantSize}`,
    getDisplayName: ({ itemName }) => itemName,
    inferIconSize: true
};

IconGallery.Item = IconItem;
IconGallery.Variant = IconVariant;
