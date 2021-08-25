import { AnchorMdx } from "@storybook/addon-docs";

export function Link({ children, ...rest }) {
    return <AnchorMdx {...rest}>{children}</AnchorMdx>;
}
