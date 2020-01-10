import styles from "./semantic-link.module.css";

import { SemanticIcon } from "./assets";
import { string } from "prop-types";

const propTypes = {
    path: string.isRequired
};

export function SemanticLink({ path }) {
    const relativePath = path.startsWith("/") ? path : `/${path}`;

    return (
        <div className={styles.iconWrapper}>
            <a href={`https://react.semantic-ui.com${relativePath}`} target="_blank" rel="noopener noreferrer">
                <SemanticIcon />
            </a>
        </div>

    );
}

SemanticLink.propTypes = propTypes;
