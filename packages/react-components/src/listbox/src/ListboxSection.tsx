import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { HtmlElements } from "../../html";
import { InternalProps, OmitInternalProps, StyledComponentProps, mergeProps } from "../../shared";

const DefaultElement = "div";

export interface InnerListboxSectionProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
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
    as = HtmlElements[DefaultElement],
    children,
    forwardedRef,
    id,
    title,
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
                aria-labelledby={id}
                role="group"
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
