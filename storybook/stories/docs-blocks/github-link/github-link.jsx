import styles from "./github-link.module.css";

import { GithubIcon } from "./assets";
import { string } from "prop-types";

const GITHUB_REPOSITORY_URL = "https://github.com/gsoft-inc/sg-orbit/tree/master";

const propTypes = {
    filePath: string.isRequired
};

export function getGithubUrl(filePath) {
    const processedFilePath = filePath.startsWith("/") ? filePath : `/${filePath}`;

    return `${GITHUB_REPOSITORY_URL}${processedFilePath}`;
}

export function GithubLink({ filePath }) {
    return (
        <div className={styles.iconWrapper}>
            <a href={getGithubUrl(filePath)} target="_blank" rel="noopener noreferrer" className="ml2"><GithubIcon className={styles.icon} /></a>
        </div>

    );
}

GithubLink.propTypes = propTypes;
