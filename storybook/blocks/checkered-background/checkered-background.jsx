import styles from "./checkered-background.module.css";

export function CheckeredBackground({ children }) {
    return (
        <div className={styles.preview}>
            {children}
        </div>
    );
}
