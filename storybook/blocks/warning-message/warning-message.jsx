import styles from "./warning-message.module.css";

import { InfoIcon } from "@orbit-ui/react-icons";
import { Message } from "semantic-ui-react";
import { mergeClasses } from "@orbit-ui/react-components-shared";

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
