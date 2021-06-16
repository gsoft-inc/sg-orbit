import "./Tagline.css";

import { components } from "@storybook/components";

const P = components.p;

export function Tagline({ children, ...rest }) {
    return (
        <P
            className="o-ui-sb-tagline"
            {...rest}
        >
            {children}
        </P>
    );
}
