import "./Flex.css";

import { Children, forwardRef, useLayoutEffect, useState } from "react";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { isNil, isString } from "lodash";
import { mergeClasses, useMergedRefs } from "../../shared";

// TODO: support render props, view: https://react-spectrum.adobe.com/react-spectrum/Flex.html#wrapping

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

const propTypes = {
    /**
     * How the elements are placed in the container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction).
     */
    direction: oneOf(["row", "column"]),
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
     * The space to display between both rows and columns. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/gap).
     */
    gap: oneOfType([oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), string]),
    /**
     * Whether flex items are forced onto one line or can wrap onto multiple lines. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap).
     */
    wrap: oneOf(["nowrap", "wrap", "wrap-reverse"]),
    /**
     * Whether or not the elements take up the width & height of their container.
     */
    fluid: bool,
    /**
     * Whether or not to wrap children in a `div` element.
     */
    wrapChildren: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

const defaultProps = {
    direction: "row",
    as: "div"
};

export function InnerFlex({
    direction,
    reverse,
    alignContent,
    alignItems,
    justifyContent,
    gap,
    wrap,
    fluid,
    wrapChildren,
    as: ElementType,
    className,
    style,
    children,
    forwardedRef,
    ...rest
}) {
    // const [hasNestedStack, setHasNestedStack] = useState(false);

    // TODO: Don,t need merge if we dont use the extra div.
    // See https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports
    const ref = useMergedRefs(forwardedRef);

    // TODO:
    // si gap not supported, had extra item logic in JS
    // in CSS, if gap is not supported, use instead the child selectors with margins.

    // TODO: If we only use `gap`, I don't think we need to care about this extra div.
    // useLayoutEffect(() => {
    //     if (!isNil(ref.current)) {
    //         if (!isNil(ref.current.querySelector(":scope > .o-ui.flex"))) {
    //             setHasNestedStack(true);
    //         }
    //     }
    // }, [ref, setHasNestedStack]);

    // // When having a nested flex, we wrap the flex items into a DIV to prevent overriding the parent --spacing variable value with the item --spacing value.
    // const items = !hasNestedStack ? children : Children.map(children, x => {
    //     return (
    //         <div className="flex-item">{x}</div>
    //     );
    // });

    const items = children;

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui flex",
                direction,
                fluid && "fluid",
                className
            )}
            style={{
                ...style,
                "--flex-direction": `${direction}${reverse ? "-reverse" : ""}`,
                "--flex-align-content": alignContent,
                "--flex-align-items": alignItems,
                "--flex-justify-content": justifyContent,
                "--flex-wrap": wrap,
                "--flex-gap": gap && (isString(gap) ? gap : `var(${SPACING[(gap || 5) - 1]})`)
            }}
            ref={ref}
        >
            {items}
        </ElementType>
    );
}

InnerFlex.propTypes = propTypes;
InnerFlex.defaultProps = defaultProps;

export const Flex = forwardRef((props, ref) => (
    <InnerFlex { ...props } forwardedRef={ref} />
));
