import "./CheckeredBackground.css";

import { mergeClasses } from "@react-components/shared/src";

export function CheckeredBackground({ className, children, ...rest }) {
    return (
        <div
            {...rest}
            className={mergeClasses(
                "o-ui-sb-checkered-background-preview",
                "pl2",
                "marine-900",
                className
            )}
        >
            {children}
        </div>
    );
}
