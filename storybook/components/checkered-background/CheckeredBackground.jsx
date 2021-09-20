import "./CheckeredBackground.css";

import { Div } from "@react-components/html";
import { mergeProps } from "@react-components/shared";

export function CheckeredBackground({ children, ...rest }) {
    return (
        <Div
            {...mergeProps(
                rest,
                {
                    color: "alias-1",
                    paddingLeft: 2,
                    className: "o-ui-sb-checkered-background-preview"
                }
            )}
        >
            {children}
        </Div>
    );
}
