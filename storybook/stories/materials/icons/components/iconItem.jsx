import styles from "./icon-item.module.css";

export function IconItem({ name, children }) {
    return (
        <div className={styles.iconItem}>
            <div className="mr3 pa3 br2 shadow-4 flex items-center ba b--cloud-100">{children}</div>
            <div>{name}</div>
        </div>
    );
}
