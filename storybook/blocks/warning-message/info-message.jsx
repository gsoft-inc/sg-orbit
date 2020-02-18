import styles from "./info-message.module.css";

import { InfoIcon } from "@orbit-ui/react-icons";
import { Message } from "semantic-ui-react";
import { mergeClasses } from "@orbit-ui/react-components-shared";

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
