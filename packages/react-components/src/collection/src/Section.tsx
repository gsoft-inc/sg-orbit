import { ComponentProps, ElementType, ReactNode, forwardRef } from "react";

export interface InnerSectionProps {
    /**
     * The section name.
     */
    title?: string;
    /**
     * @ignore
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function InnerSection(props: InnerSectionProps): JSX.Element {
    return null;
}

export const Section = forwardRef<any, Omit<InnerSectionProps, "forwardedRef">>((props, ref) => (
    // @ts-ignore Not sure what is going on with the InnerSection.
    <InnerSection {...props} forwardedRef={ref} />
));

export type SectionProps = ComponentProps<typeof Section>;

Section.displayName = "Section";
