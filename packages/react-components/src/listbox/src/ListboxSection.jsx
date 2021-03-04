import { Box } from "../../box";
import { any, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";

const propTypes = {
    /**
     * The section name.
     */
    title: string.isRequired,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerListboxSection({
    id,
    title,
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <>
            <Box
                {...mergeProps(
                    rest,
                    {
                        id,
                        className: "o-ui-listbox-section",
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

InnerListboxSection.propTypes = propTypes;

export const ListboxSection = forwardRef((props, ref) => (
    <InnerListboxSection {...props} forwardedRef={ref} />
));

ListboxSection.displayName = "ListboxSection";
