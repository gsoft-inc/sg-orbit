import { components } from "@storybook/components";
import { ComponentProps } from "react";

const A = components.a;

export type ExternalLinkProps = Omit<ComponentProps<typeof A>, "target" | "rel">;

export function ExternalLink({ children, ...rest }: ExternalLinkProps) {
    return (
        <A
            {...rest}
            target="_blank"
            rel="nofollow,noopener,noreferrer"
        >
            {children}
        </A>
    );
}
