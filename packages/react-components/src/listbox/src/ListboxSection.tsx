import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerListboxSectionProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The section name.
     */
    title: string;
}

export function InnerListboxSection({
    id,
    title,
    as = DefaultElement,
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
                        "aria-hidden": true,
                        as,
                        className: "o-ui-listbox-section",
                        id,
                        ref: forwardedRef,
                        role: "presentation"
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

export const ListboxSection = forwardRef<any, OmitInternalProps<InnerListboxSectionProps>>((props, ref) => (
    <InnerListboxSection {...props} forwardedRef={ref} />
));

export type ListboxSectionProps = ComponentProps<typeof ListboxSection>;
