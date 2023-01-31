import { AnchorMdx } from "@storybook/addon-docs";
import { ReactNode } from "react";

export interface LinkProps {
    href: string;
    target?: string;
    children: ReactNode;
}

export function Link({ children, target = "", ...rest }: LinkProps) {
    // @ts-ignore children is not detected, but i'm only converting the code
    return <AnchorMdx target={target} {...rest}>{children}</AnchorMdx>;
}
