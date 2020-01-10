import styles from "./warning-message.module.css";

import { InfoIcon } from "@orbit-ui/icons";
import { Message } from "semantic-ui-react";

export function WarningMessage({ children }) {
    return (
        <Message warning size="small" className="flex">
            <span className={styles.icon}><InfoIcon className="w6 h6" /></span>
            <div className="content">{children}</div>
        </Message>
    );
}
