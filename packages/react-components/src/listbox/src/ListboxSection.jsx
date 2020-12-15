import { Box } from "../../box";
import { any, string } from "prop-types";
import { forwardRef } from "react";
import { mergeClasses } from "../../shared";

const propTypes = {
    /**
     * The section name.
     */
    title: string.isRequired,
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerListboxSection({
    id,
    title,
    as = "div",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <>
            <Box
                {...rest}
                id={id}
                className={mergeClasses("o-ui-listbox-section", className)}
                aria-hidden
                as={as}
                ref={forwardedRef}
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
