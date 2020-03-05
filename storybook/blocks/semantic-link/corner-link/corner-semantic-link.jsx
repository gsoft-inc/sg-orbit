import styles from "./corner-semantic-link.module.css";

import { ExternalLink } from "@blocks";
import { SemanticIcon } from "./assets";
import { getSemanticUrl } from "../get-semantic-link";
import { string } from "prop-types";

const propTypes = {
    path: string.isRequired
};

export function CornerSemanticLink({ path }) {
    return (
        <div className={styles.iconWrapper}>
            <ExternalLink href={getSemanticUrl(path)}>
                <SemanticIcon />
            </ExternalLink>
        </div>

    );
}

CornerSemanticLink.propTypes = propTypes;
