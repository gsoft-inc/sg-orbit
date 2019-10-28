import { IconHeader } from "./";
import styles from "./icon-item.module.css";

export function IconItem({ name, children }) {
    return (
        <div className={styles.iconItem}>
            <div className="pb3">{name}</div>
            <div className={styles.iconGrid}>
                <IconHeader />
                {children}
            </div>
        </div>
    );
}
