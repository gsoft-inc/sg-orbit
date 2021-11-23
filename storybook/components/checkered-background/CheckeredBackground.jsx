import "./CheckeredBackground.css";

import { Div } from "@components/html";
import { mergeProps } from "@components/shared";

export function CheckeredBackground({ children, ...rest }) {
    return (
        <Div
            {...mergeProps(
                rest,
                {
                    color: "alias-primary",
                    paddingLeft: 2,
                    className: "o-ui-sb-checkered-background-preview"
                }
            )}
        >
            {children}
        </Div>
    );
}
