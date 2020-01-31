import styles from "./figure.module.css";

export function Figure({ url, caption, width, height }) {
    return (
        <figure className={styles.figure}>
            <img src={url} alt={caption} width={width} height={height} />
            <figcaption className="i">{ caption }</figcaption>
        </figure>
    );
}
