import styles from "./warning.module.css";

import { InfoIcon24 } from "@orbit-ui/icons";
import { Message } from "semantic-ui-react";

export function Warning({ children }) {
    return (
        <Message warning size="small">
            <span className={styles.icon}><InfoIcon24 /></span> {children}
        </Message>
    );
}
