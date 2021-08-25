import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { DomProps, forwardRef, mergeProps } from "../../shared";

export interface InnerListboxSectionProps extends DomProps {
    /**
     * The section name.
     */
    title: string;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerListboxSection({
    id,
    title,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerListboxSectionProps) {
    return (
        <>
            <Box
                {...mergeProps(
                    rest,
                    {
                        id,
                        className: "o-ui-listbox-section",
                        "aria-hidden": true,
                        role: "presentation",
                        as,
                        ref: forwardedRef
                    }
                )}
            >
                {title}
            </Box>
            <Box
                role="group"
                aria-labelledby={id}
            >
                {children}
            </Box>
        </>
    );
}

export const ListboxSection = forwardRef<InnerListboxSectionProps>((props, ref) => (
    <InnerListboxSection {...props} forwardedRef={ref} />
));

export type ListboxSectionProps = ComponentProps<typeof ListboxSection>;
