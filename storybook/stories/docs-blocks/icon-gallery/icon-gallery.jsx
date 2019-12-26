import styles from "./icon-gallery.module.css";

import { Children, cloneElement } from "react";
import { IconItem } from "./icon-item";
import { VARIANT_SHAPE } from "./variants";
import { any, arrayOf, shape } from "prop-types";

function renderItem(item, variants) {
    return cloneElement(item, {
        variants: variants
    });
}

export function IconGallery({ variants, children }) {
    return (
        <div className={`${styles.container} sbdocs sbdocs-ig`}>
            {Children.map(children, x => renderItem(x, variants))}
        </div>
    );
}

IconGallery.propTypes = {
    variants: arrayOf(shape(VARIANT_SHAPE)).isRequired,
    children: any.isRequired
};

IconGallery.Item = IconItem;
