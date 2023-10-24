import "./Banner.css";

import { Div, DivProps } from "@components/html";
import { mergeProps } from "@components/shared";

export function Banner({ children, ...rest }: DivProps) {
    return (
        <Div
            {...mergeProps(
                rest,
                {
                    className: "highlight o-ui-sb-banner"
                }
            )}
        >
            {children}
        </Div>
    );
}
