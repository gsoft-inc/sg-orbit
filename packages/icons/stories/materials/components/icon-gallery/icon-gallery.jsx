import styles from "./icon-gallery.module.css";

import { IconItem } from "./icon-item";

export function IconGallery({ children }) {
    return (
        <div className={styles.iconGallery}>
            {children}
        </div>
    );
}

IconGallery.Item = IconItem;
