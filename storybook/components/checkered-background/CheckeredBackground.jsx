import "./CheckeredBackground.css";

import { mergeClasses } from "@react-components/shared";

export function CheckeredBackground({ className, children, ...rest }) {
    return (
        <div
            {...rest}
            className={mergeClasses(
                "o-ui-sb-checkered-background-preview",
                "pl2",
                "text-1",
                className
            )}
        >
            {children}
        </div>
    );
}
