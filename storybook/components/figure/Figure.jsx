import "./Figure.css";

export function Figure({ url, caption, width, height }) {
    return (
        <figure className="o-ui-sb-figure">
            <a href={url} target="_blank" rel="noopener noreferrer" >
                <img src={url} alt={caption} width={width} height={height} />
            </a>
            <figcaption className="i">{ caption }</figcaption>
        </figure>
    );
}
