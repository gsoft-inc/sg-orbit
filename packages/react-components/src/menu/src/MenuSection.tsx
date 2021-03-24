import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { forwardRef, mergeProps } from "../../shared";

export interface InnerMenuSectionProps {
    /**
     * @ignore
     */
    id?: string;
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
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerMenuSectionProps) {
    return (
        <>
            <Box
                {...mergeProps(
                    rest,
                    {
                        id,
                        className: "o-ui-menu-section",
                        "aria-hidden": true,
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

export const MenuSection = forwardRef<InnerMenuSectionProps>((props, ref) => (
    <InnerMenuSection {...props} forwardedRef={ref} />
));

export type MenuSectionProps = ComponentProps<typeof MenuSection>

MenuSection.displayName = "MenuSection";
