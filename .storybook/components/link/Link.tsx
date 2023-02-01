import { AnchorMdx } from "@storybook/addon-docs";
import { ReactNode } from "react";

export interface LinkProps {
    href: string;
    target?: string;
    children: ReactNode;
}

export function Link({ children, target = "", ...rest }: LinkProps) {
    return (
        // @ts-ignore There is an issue with Storybook's typing. Since React.FC dropped the automatic children props, AnchorMdx don't accept a children
        // in its typings, but it still accepts it as a prop in javascript. So we disable type checking for this line.
        <AnchorMdx target={target} {...rest}>
            {children}
        </AnchorMdx>
    );
}
