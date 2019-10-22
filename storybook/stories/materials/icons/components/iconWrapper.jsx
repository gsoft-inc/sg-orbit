import styles from "./icons.module.css";

export function IconGallery({ children }) {
    return (
        <div className="flex flex-wrap">
            { children }
        </div>
    );
}

export function IconItem({ name, children }) {
    return (
        <div className={styles.iconItem}>
            <div className="mr2 pa3 br2 shadow-4 flex items-center ba b--cloud-100">{children}</div>
            <div>{name}</div>
        </div>
    );
}
