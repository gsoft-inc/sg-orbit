import styles from "./semantic-link.module.css";

import { ExternalLink } from "@blocks";
import { SemanticIcon } from "./assets";
import { string } from "prop-types";

const SEMANTIC_URL = "https://react.semantic-ui.com";

const propTypes = {
    path: string.isRequired
};

export function getSemanticUrl(path) {
    const relativePath = path.startsWith("/") ? path : `/${path}`;

    return `${SEMANTIC_URL}${relativePath}`;
}

export function SemanticLink({ path }) {
    return (
        <div className={styles.iconWrapper}>
            <ExternalLink href={getSemanticUrl(path)}>
                <SemanticIcon />
            </ExternalLink>
        </div>

    );
}

SemanticLink.propTypes = propTypes;
