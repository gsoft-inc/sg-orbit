import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledHtmlAttributes } from "../../shared";

export interface InnerSectionProps extends InternalProps, StyledHtmlAttributes {
    /**
     * React children.
     */
    children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function InnerSection(props: InnerSectionProps): JSX.Element {
    return null;
}

export const Section = forwardRef<any, OmitInternalProps<InnerSectionProps>>((props, ref) => (
    <InnerSection {...props} forwardedRef={ref} />
));

export type SectionProps = ComponentProps<typeof Section>;
