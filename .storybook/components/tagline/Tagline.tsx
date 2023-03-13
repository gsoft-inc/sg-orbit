import "./Tagline.css";

import { components } from "@storybook/components";
import { ComponentProps } from "react";

const P = components.p;

type TaglineProps = ComponentProps<typeof P>;

export function Tagline({ children, ...rest }: TaglineProps) {
    return (
        <P
            className="o-ui-sb-tagline"
            {...rest}
        >
            {children}
        </P>
    );
}
