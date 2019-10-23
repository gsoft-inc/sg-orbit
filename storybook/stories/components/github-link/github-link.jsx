import styles from "./github-link.module.css";

import { GithubIcon } from "./assets";
import { string } from "prop-types";

const GITHUB_REPOSITORY_URL = "https://github.com/gsoft-inc/sg-orbit/tree/master";

const propTypes = {
    filePath: string.isRequired
};

export function GithubLink({ filePath }) {
    return (
        <div className="flex flex-row items-center">
            <GithubIcon className={styles.icon} />
            <a href={`${GITHUB_REPOSITORY_URL}/${filePath}`} target="_blank" className="ml2">Open in Github</a>
        </div>
        
    );
}

GithubLink.propTypes = propTypes;