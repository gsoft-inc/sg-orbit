import { ComponentProps, ElementType, ReactNode } from "react";
import { forwardRef } from "../../shared";

export interface InnerSectionProps {
    /**
     * The section name.
     */
    title?: string;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerSection() {
    // When returning null, react-docgen doesn't ignore the component.
    return <></>;
}

export const Section = forwardRef<InnerSectionProps>((props, ref) => (
    // @ts-ignore Not sure what is going on with the InnerSection.
    <InnerSection {...props} forwardedRef={ref} />
));

export type SectionProps = ComponentProps<typeof Section>;

Section.displayName = "Section";
