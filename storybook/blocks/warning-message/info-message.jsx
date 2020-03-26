import styles from "./info-message.module.css";

import { InfoIcon } from "@react-components/icons/src";
import { Message } from "semantic-ui-react";
import { mergeClasses } from "@react-components/shared/src";

export function InfoMessage({ inline, children }) {
    const classes = mergeClasses(
        styles.container,
        "flex items-center",
        inline && styles.inline
    );

    return (
        <Message info size="small" className={classes}>
            <span className={`flex items-center self-start ${styles.icon}`}>
                <InfoIcon />
            </span>
            <div className={styles.content}>{children}</div>
        </Message>
    );
}
