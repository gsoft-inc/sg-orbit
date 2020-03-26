import styles from "./warning-message.module.css";

import { InfoIcon } from "@react-components/icons/src";
import { Message } from "semantic-ui-react";
import { mergeClasses } from "@react-components/shared/src";

export function WarningMessage({ className, children, ...rest }) {
    const classes = mergeClasses(
        "flex items-center",
        className
    );

    return (
        <Message warning size="small" className={classes} {...rest}>
            <span className={`flex items-center self-start ${styles.icon}`}>
                <InfoIcon />
            </span>
            <div className={styles.content}>{children}</div>
        </Message>
    );
}
