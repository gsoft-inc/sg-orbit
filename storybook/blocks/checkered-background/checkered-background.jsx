import { mergeClasses } from "@orbit-ui/react-components-shared";

import styles from "./checkered-background.module.css";

export function CheckeredBackground({ className, children, ...rest }) {
    const classes = mergeClasses(
        styles.preview,
        className
    );

    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
}
