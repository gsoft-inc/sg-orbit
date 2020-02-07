import styles from "./corner-github-link.module.css";

import { ExternalLink } from "@blocks";
import { GithubIcon } from "./assets";
import { getGithubUrl } from "../get-github-url";
import { string } from "prop-types";

const propTypes = {
    path: string.isRequired
};

export function CornerGithubLink({ path }) {
    return (
        <div className={styles.iconWrapper}>
            <ExternalLink href={getGithubUrl(path)} className="ml2">
                <GithubIcon className={styles.icon} />
            </ExternalLink>
        </div>
    );
}

CornerGithubLink.propTypes = propTypes;
