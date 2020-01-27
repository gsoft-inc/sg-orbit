import styles from "./corner-github-link.module.css";

import { GithubIcon } from "./assets";
import { getGithubUrl } from "../get-github-url";
import { string } from "prop-types";

const propTypes = {
    path: string.isRequired
};

export function CornerGithubLink({ path }) {
    return (
        <div className={styles.iconWrapper}>
            <a href={getGithubUrl(path)} target="_blank" rel="noopener noreferrer" className="ml2"><GithubIcon className={styles.icon} /></a>
        </div>

    );
}

CornerGithubLink.propTypes = propTypes;
