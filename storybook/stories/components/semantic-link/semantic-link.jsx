import styles from "./semantic-link.module.css";

import { string } from "prop-types";
import SemanticIcon from "./assets/icon-semantic.png";

const SEMANTIC_DOCUMENTATION_URL = "https://react.semantic-ui.com/";

const propTypes = {
    filePath: string.isRequired
};

export function SemanticLink({ filePath }) {
    const processedFilePath = filePath.startsWith("/") ? filePath : `/${filePath}`;

    return (
        <div className={styles.iconWrapper}>
            <a href={`${SEMANTIC_DOCUMENTATION_URL}${processedFilePath}`} target="_blank" rel="noopener noreferrer" className="ml2"><img alt="React Semantic Icon" className={styles.icon} src={SemanticIcon} /></a>
        </div>

    );
}

SemanticLink.propTypes = propTypes;
