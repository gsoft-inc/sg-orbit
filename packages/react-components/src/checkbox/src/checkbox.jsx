import { ArgumentError, SemanticRef, mergeClasses, throwWhenUnsupportedPropIsProvided, useAutofocus, useCombinedRefs } from "../../shared";
import { Checkbox as SemanticCheckbox } from "semantic-ui-react";
import { arrayOf, bool, element, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef, useCallback } from "react";
import { createCountFromShorthand } from "../../count";
import { createIconForControl } from "../../icons";
import { createLabelFromShorthand } from "../../label";
import { isArray, isNil } from "lodash";
import { isElement } from "react-is";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const UNSUPPORTED_PROPS = ["slider", "type", "radio", "toggle"];

export const CHECKBOX_PROP_TYPES = {
    /**
     * Whether or not the checkbox should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * The text associated to the checkbox.
     */
    text: string,
    /**
     * A checkbox can display icons.
     */
    icons: oneOfType([element, arrayOf(element)]),
    /**
     * A label displayed after the checkbox text.
     */
    label: oneOfType([element, object]),
    /**
     * A count displayed after the checkbox text.
     */
    count: oneOfType([element, object]),
    /**
     * An input can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * @ignore
     */
    disabled: bool,
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func]),
    /**
     * @ignore
     */
    __componentName: string,
    /**
     * @ignore
     */
    __unsupportedProps: arrayOf(string)
};

export const CHECKBOX_DEFAULT_PROPS = {
    autofocus: false,
    size: DEFAULT_SIZE,
    disabled: false,
    __componentName: "@orbit-ui/react-components/checkbox",
    __unsupportedProps: UNSUPPORTED_PROPS
};

function throwWhenMutuallyExclusivePropsAreProvided({ label, count }, componentName) {
    if (!isNil(label) && !isNil(count)) {
        throw new ArgumentError(`${componentName} doesn't support having a label and a count at the same time.`);
    }
}

function useSetFocus(checkboxRef) {
    return useCallback(() => {
        if (!isNil(checkboxRef.current)) {
            checkboxRef.current.querySelector("input").focus();
        }
    }, [checkboxRef]);
}

function useIconsRenderer(icons, size) {
    return () => {
        const normalizedIcons = isArray(icons) ? icons : [icons];

        return <>{normalizedIcons.map((x, index) => createIconForControl(x, size, { key: index }))}</>;
    };
}

function useLabelRenderer(label) {
    return () => {
        const defaults = {
            as: "span",
            size: "mini",
            highlight: true
        };

        if (isElement(label)) {
            return cloneElement(label, defaults);
        }

        return createLabelFromShorthand({
            ...defaults,
            ...label
        });
    };
}

function useCountRenderer(count) {
    return () => {
        if (isElement(count)) {
            return count;
        }

        return createCountFromShorthand(count);
    };
}

function useContentRenderer(text, icons, label, count, size) {
    const iconsRenderer = useIconsRenderer(icons, size);
    const labelRenderer = useLabelRenderer(label);
    const countRenderer = useCountRenderer(count);

    return () => {
        let right;

        if (!isNil(icons)) {
            right = iconsRenderer();
        }

        if (!isNil(label)) {
            if (!isNil(right)) {
                right = <>{right}{labelRenderer()}</>;
            } else {
                right = labelRenderer();
            }
        }

        if (!isNil(count)) {
            if (!isNil(right)) {
                right = <>{right}{countRenderer()}</>;
            } else {
                right = countRenderer();
            }
        }

        if (!isNil(text) || !isNil(right)) {
            return <label title={text}>{!isNil(text) && <span className="text">{text}</span>}{!isNil(right) && right}</label>;
        }
    };
}

export function PureCheckbox(props) {
    const { autofocus, autofocusDelay, text, icons, label, count, size, disabled, className, forwardedRef, __unsupportedProps, __componentName, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, __unsupportedProps, __componentName);
    throwWhenMutuallyExclusivePropsAreProvided(props, __componentName);

    const innerRef = useCombinedRefs(forwardedRef);

    const setFocus = useSetFocus(innerRef);
    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

    const contentRenderer = useContentRenderer(text, icons, label, count, size);

    const classes = mergeClasses(
        size && size,
        !isNil(icons) && "with-icon",
        !isNil(label) && "with-label",
        isNil(text) && "without-text",
        className
    );

    return (
        <SemanticRef innerRef={innerRef}>
            <SemanticCheckbox
                data-testid="checkbox"
                {...rest}
                label={contentRenderer()}
                disabled={disabled}
                className={classes}
                {...autofocusProps}
            />
        </SemanticRef>
    );
}

PureCheckbox.propTypes = CHECKBOX_PROP_TYPES;
PureCheckbox.defaultProps = CHECKBOX_DEFAULT_PROPS;

export const Checkbox = forwardRef((props, ref) => (
    <PureCheckbox { ...props } forwardedRef={ref} />
));
