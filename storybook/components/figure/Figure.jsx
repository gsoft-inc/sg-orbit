import "./Figure.css";

import { Img } from "@react-components/html";

export function Figure({ url, caption, width, height, ...rest }) {
    return (
        <figure
            {...rest}
            className="o-ui-sb-figure"
        >
            <a href={url} target="_blank" rel="noopener noreferrer" >
                <Img src={url} alt={caption} width={width} height={height} />
            </a>
            <figcaption className="i">{ caption }</figcaption>
        </figure>
    );
}
