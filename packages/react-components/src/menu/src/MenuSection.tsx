import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, mergeProps } from "../../shared";

const DefaultElement = "li";

export interface InnerMenuSectionProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * The section name.
     */
    title?: string;
    /**
     * React children.
     */
    children: ReactNode;
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

export const MenuSection = forwardRef<any, OmitInternalProps<InnerMenuSectionProps>>((props, ref) => (
    <InnerMenuSection {...props} forwardedRef={ref} />
));

export type MenuSectionProps = ComponentProps<typeof MenuSection>;
