import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { DomProps, mergeProps } from "../../shared";

const DefaultElement = "li";

export interface InnerMenuSectionProps extends DomProps, ComponentProps<typeof DefaultElement> {
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
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerMenuSection({
    id,
    title,
    as = DefaultElement,
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

export const MenuSection = forwardRef<any, Omit<InnerMenuSectionProps, "forwardedRef">>((props, ref) => (
    <InnerMenuSection {...props} forwardedRef={ref} />
));

export type MenuSectionProps = ComponentProps<typeof MenuSection>;

MenuSection.displayName = "MenuSection";
