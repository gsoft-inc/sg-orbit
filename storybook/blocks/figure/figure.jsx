import styles from "./figure.module.css";

export function Figure({ url, caption }) {
    return (
        <figure className={styles.figure}>
            <img src={url} alt={ caption } />
            <figcaption className="i">{ caption }</figcaption>
        </figure>
    );
}
