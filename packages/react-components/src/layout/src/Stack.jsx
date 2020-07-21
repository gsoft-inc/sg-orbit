import "./Stack.css";

import { Children, forwardRef, useState } from "react";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { isNil, isString } from "lodash";
import { mergeClasses, useMergedRefs } from "../../shared";

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
     * How the elements are placed in the container.
     */
    direction: oneOf(["horizontal", "vertical"]),
    /**
     * How the elements are aligned in the container along the main axis (view flexbox align-items).
     */
    align: oneOf(["start", "end", "center"]),
    /**
     * How the elements are aligned in the container along the cross axis (view flexbox justify-content).
     */
    justify: oneOf(["start", "end", "center"]),
    /**
     * Spacing scale between each elements.
     */
    spacing: oneOfType([
        oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
        string
    ]),
    /**
     * Whether or not the stack take up the width & height of its container.
     */
    fluid: bool,
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
    direction: "horizontal",
    as: "div"
};

export function InnerInline({ direction, align, justify, spacing, fluid, as: ElementType, className, style, children, forwardedRef, ...rest }) {
    const [element, setElement] = useState();

    const ref = useMergedRefs(setElement, forwardedRef);

    const hasNestedStack = !isNil(element) ? !isNil(ref.current.querySelector(":scope > .o-ui.stack")) : false;

    // When having a nested stack, we wrap the stack items into a DIV to prevent overriding the parent --spacing variable value with the item --spacing value.
    const items = !hasNestedStack ? children : Children.map(children, x => {
        return (
            <div className="item">{x}</div>
        );
    });

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui stack",
                direction,
                align && `align-${align}`,
                justify && `justify-${justify}`,
                fluid && "fluid",
                className
            )}
            style={{
                "--spacing": isString(spacing) ? spacing : `var(${SPACING[(spacing || 5) - 1]})`,
                ...style
            }}
            ref={ref}
        >
            {items}
        </ElementType>
    );
}

InnerInline.propTypes = propTypes;
InnerInline.defaultProps = defaultProps;

export const Inline = forwardRef((props, ref) => (
    <InnerInline { ...props } forwardedRef={ref} />
));

export const Stack = forwardRef((props, ref) => (
    <InnerInline { ...props } direction="vertical" forwardedRef={ref} />
));
