import styles from "./github-link.module.css";

import { GithubIcon } from "./assets";
import { string } from "prop-types";

const GITHUB_REPOSITORY_URL = "https://github.com/gsoft-inc/sg-orbit/tree/master";

const propTypes = {
    path: string.isRequired
};

export function getGithubUrl(path) {
    const relativePath = path.startsWith("/") ? path : `/${path}`;

    return `${GITHUB_REPOSITORY_URL}${relativePath}`;
}

export function GithubLink({ path }) {
    return (
        <div className={styles.iconWrapper}>
            <a href={getGithubUrl(path)} target="_blank" rel="noopener noreferrer" className="ml2"><GithubIcon className={styles.icon} /></a>
        </div>

    );
}

GithubLink.propTypes = propTypes;
