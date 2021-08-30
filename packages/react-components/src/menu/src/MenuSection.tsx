import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, mergeProps } from "../../shared";

const DefaultElement = "li";

export interface InnerMenuSectionProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The section name.
     */
    title?: string;
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
                    as,
                    className: "o-ui-menu-section",
                    ref: forwardedRef,
                    role: "presentation"
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
