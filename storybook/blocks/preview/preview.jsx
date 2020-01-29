import styles from "./preview.module.css";

import { Preview as StorybookPreview } from "@storybook/addon-docs/blocks";
import { mergeClasses } from "@orbit-ui/react-components-shared/src";

export function Preview({ noSource, className, children, ...rest }) {
    const classes = mergeClasses(
        noSource && styles.noSource,
        className
    );

    return (
        <StorybookPreview className={classes} { ...rest }>{children}</StorybookPreview>
    );
}
