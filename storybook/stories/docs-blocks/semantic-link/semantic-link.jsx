import styles from "./semantic-link.module.css";

import { SemanticIcon } from "./assets";
import { string } from "prop-types";

// TODO: rename "docPath" for "path"

const propTypes = {
    docPath: string.isRequired
};

export function SemanticLink({ docPath }) {
    const relativePath = docPath.startsWith("/") ? docPath : `/${docPath}`;

    return (
        <div className={styles.iconWrapper}>
            <a href={`https://react.semantic-ui.com${relativePath}`} target="_blank" rel="noopener noreferrer">
                <SemanticIcon />
            </a>
        </div>

    );
}

SemanticLink.propTypes = propTypes;
