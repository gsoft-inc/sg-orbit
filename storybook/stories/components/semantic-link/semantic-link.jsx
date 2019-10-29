import styles from "./semantic-link.module.css";

import { string } from "prop-types";
import SemanticIcon from "./assets/icon-semantic.png";

const SEMANTIC_DOCUMENTATION_URL = "https://react.semantic-ui.com/";

const propTypes = {
    docPath: string.isRequired
};

export function SemanticLink({ docPath }) {
    const processedDocPath = docPath.startsWith("/") ? docPath : `/${docPath}`;

    return (
        <div className={styles.iconWrapper}>
            <a href={`${SEMANTIC_DOCUMENTATION_URL}${processedDocPath}`} target="_blank" rel="noopener noreferrer"><img alt="React Semantic Icon" className={styles.icon} src={SemanticIcon} /></a>
        </div>

    );
}

SemanticLink.propTypes = propTypes;
