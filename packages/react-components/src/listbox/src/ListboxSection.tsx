import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitForwardedRefProp, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerListboxSectionProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * The section name.
     */
    title: string;
    /**
     * React children.
     */
    children: ReactNode;
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

export const ListboxSection = forwardRef<any, OmitForwardedRefProp<InnerListboxSectionProps>>((props, ref) => (
    <InnerListboxSection {...props} forwardedRef={ref} />
));

export type ListboxSectionProps = ComponentProps<typeof ListboxSection>;

ListboxSection.displayName = "ListboxSection";
