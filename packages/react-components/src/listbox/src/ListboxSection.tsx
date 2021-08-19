import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { DomProps, mergeProps } from "../../shared";

const defaultElement = "div";

export interface InnerListboxSectionProps extends DomProps, ComponentProps<typeof defaultElement> {
    /**
     * The section name.
     */
    title: string;
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

export function InnerListboxSection({
    id,
    title,
    as = defaultElement,
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

export const ListboxSection = forwardRef<any, Omit<InnerListboxSectionProps, "forwardedRef">>((props, ref) => (
    <InnerListboxSection {...props} forwardedRef={ref} />
));

export type ListboxSectionProps = ComponentProps<typeof ListboxSection>;

ListboxSection.displayName = "ListboxSection";
