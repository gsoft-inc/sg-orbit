import { Box } from "../../box";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil, isString } from "lodash";
import { useMergedRefs } from "../../shared";

const propTypes = {
    /**
     * How the elements are placed in the container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction).
     */
    direction: oneOf(["row", "column"]),
    /**
     * Whether or not to inline the elements.
     */
    inline: bool,
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse: bool,
    /**
     * The distribution of space around child items along the cross axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
     */
    alignContent: oneOf([
        "start",
        "end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
        "stretch",
        "baseline",
        "first baseline",
        "last baseline",
        "safe center",
        "unsafe center"
    ]),
    /**
     * The alignment of children within their container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
     */
    alignItems: oneOf([
        "start",
        "end",
        "center",
        "stretch",
        "self-start",
        "self-end",
        "baseline",
        "first baseline",
        "last baseline",
        "safe center",
        "unsafe center"
    ]),
    /**
     * The distribution of space around items along the main axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
     */
    justifyContent: oneOf([
        "start",
        "end",
        "center",
        "left",
        "right",
        "space-between",
        "space-around",
        "space-evenly",
        "stretch",
        "baseline",
        "first baseline",
        "last baseline",
        "safe center",
        "unsafe center"
    ]),
    /**
     * The space between both rows and columns. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/gap).
     */
    gap: oneOfType([oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), string]),
    /**
     * Whether flex items are forced onto one line or can wrap onto multiple lines. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap).
     */
    wrap: oneOf(["nowrap", "wrap", "wrap-reverse"]),
    /**
     * Whether the elements take up all the space of their container.
     */
    fluid: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

const SPACING = [
    "--scale-alpha",
    "--scale-bravo",
    "--scale-charlie",
    "--scale-delta",
    "--scale-echo",
    "--scale-foxtrot",
    "--scale-golf",
    "--scale-hotel",
    "--scale-india",
    "--scale-juliett",
    "--scale-kilo",
    "--scale-lima",
    "--scale-mike"
];

export function InnerFlex({
    direction = "row",
    inline,
    reverse,
    alignContent,
    alignItems,
    justifyContent,
    gap,
    wrap,
    fluid,
    style = {},
    children,
    forwardedRef,
    ...rest
}) {
    const ref = useMergedRefs(forwardedRef);

    // Normalize values until Chrome support `start` & `end`, https://developer.mozilla.org/en-US/docs/Web/CSS/align-items.
    alignContent = alignContent && alignContent.replace("start", "flex-start").replace("end", "flex-end");
    alignItems = alignItems && alignItems.replace("start", "flex-start").replace("end", "flex-end");
    justifyContent = justifyContent && justifyContent.replace("start", "flex-start").replace("end", "flex-end");

    console.log(style.width ?? (direction === "row" && fluid ? "100%" : undefined));

    return (
        <Box
            {...rest}
            style={{
                ...style,
                display: inline ? "inline-flex" : "flex",
                flexDirection: direction && `${direction}${reverse ? "-reverse" : ""}`,
                alignContent: alignContent,
                alignItems: alignItems,
                justifyContent: justifyContent,
                flexWrap: !isNil(wrap) ? "wrap" : undefined,
                gap: gap && (isString(gap) ? gap : `var(${SPACING[(gap) - 1]})`),
                width: style.width ?? (direction === "row" && fluid ? "100%" : undefined),
                height: style.height ?? (direction === "column" && fluid ? "100%" : undefined)
            }}
            ref={ref}
        >
            {children}
        </Box>
    );
}

InnerFlex.propTypes = propTypes;

export const Flex = forwardRef((props, ref) => (
    <InnerFlex {...props} forwardedRef={ref} />
));

Flex.displayName = "Flex";
