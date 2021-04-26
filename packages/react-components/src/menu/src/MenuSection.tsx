import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { DomProps, forwardRef, mergeProps } from "../../shared";

export interface InnerMenuSectionProps extends DomProps {
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
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerMenuSection({
    id,
    title,
    as = "li",
    children,
    forwardedRef,
    ...rest
}: InnerMenuSectionProps) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-menu-section",
                    as,
                    role: "presentation",
                    ref: forwardedRef
                }
            )}
        >
            <Box
                id={id}
                as="span"
                aria-hidden="true"
                className="o-ui-menu-section-title"
            >
                {title}
            </Box>
            <Box
                role="group"
                aria-labelledby={id}
                as="ul"
                className="o-ui-menu-section-items"
            >
                {children}
            </Box>
        </Box>
    );
}

export const MenuSection = forwardRef<InnerMenuSectionProps>((props, ref) => (
    <InnerMenuSection {...props} forwardedRef={ref} />
));

export type MenuSectionProps = ComponentProps<typeof MenuSection>

MenuSection.displayName = "MenuSection";
