import { components } from "@storybook/components/html";

const A = components.a;

export function ExternalLink({ children, ...rest }) {
    return <A {...rest} target="_blank" rel="nofollow,noopener,noreferrer">{children}</A>;
}
