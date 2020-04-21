import { ArgumentError, mergeClasses, throwWhenUnsupportedPropIsProvided, useCombinedRefs } from "../../shared";
import { Ref, Checkbox as SemanticCheckbox } from "semantic-ui-react";
import { arrayOf, bool, element, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef, useEffect, useRef } from "react";
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

function getInputElement(innerRef) {
    return innerRef.current.querySelector("input");
}

function focus(innerRef) {
    if (!isNil(innerRef.current)) {
        getInputElement(innerRef).focus();
    }
}

function useDelayedAutofocus(autofocus, autofocusDelay, disabled, innerRef) {
    useEffect(() => {
        let timeoutId;

        if (autofocus && !disabled && !isNil(autofocusDelay)) {
            timeoutId = setTimeout(() => {
                focus(innerRef);
            }, autofocusDelay);
        }

        return () => {
            if (!isNil(timeoutId)) {
                clearTimeout(timeoutId);
            }
        };
    }, [autofocus, autofocusDelay, disabled, innerRef]);
}

function throwWhenMutuallyExclusivePropsAreProvided({ label, count }, componentName) {
    if (!isNil(label) && !isNil(count)) {
        throw new ArgumentError(`${componentName} doesn't support having a label and a count at the same time.`);
    }
}

export function PureCheckbox(props) {
    const { autofocus, autofocusDelay, text, icons, label, count, size, disabled, className, forwardedRef, __unsupportedProps, __componentName, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, __unsupportedProps, __componentName);
    throwWhenMutuallyExclusivePropsAreProvided(props, __componentName);

    const innerRef = useCombinedRefs(forwardedRef);
    useDelayedAutofocus(autofocus, autofocusDelay, disabled, innerRef);

    const renderIcons = () => {
        const normalizedIcons = isArray(icons) ? icons : [icons];

        return <>{normalizedIcons.map((x, index) => createIconForControl(x, size, { key: index }))}</>;
    };

    const renderLabel = () => {
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

    const renderCount = () => {
        if (isElement(count)) {
            return count;
        }

        return createCountFromShorthand(count);
    };

    const renderContent = () => {
        let right;

        if (!isNil(icons)) {
            right = renderIcons();
        }

        if (!isNil(label)) {
            if (!isNil(right)) {
                right = <>{right}{renderLabel()}</>;
            } else {
                right = renderLabel();
            }
        }

        if (!isNil(count)) {
            if (!isNil(right)) {
                right = <>{right}{renderCount()}</>;
            } else {
                right = renderCount();
            }
        }

        if (!isNil(text) || !isNil(right)) {
            return <label>{!isNil(text) && text}{!isNil(right) && right}</label>;
        }
    };

    const classes = mergeClasses(
        size && size,
        !isNil(icons) && "with-icon",
        !isNil(label) && "with-label",
        isNil(text) && "without-text",
        className
    );

    const shouldAutofocus = autofocus && !disabled && isNil(autofocusDelay);

    return (
        <Ref innerRef={innerRef}>
            <SemanticCheckbox
                {...rest}
                label={renderContent()}
                autoFocus={shouldAutofocus}
                disabled={disabled}
                className={classes}
                data-testid="checkbox"
            />
        </Ref>
    );
}

PureCheckbox.propTypes = CHECKBOX_PROP_TYPES;
PureCheckbox.defaultProps = CHECKBOX_DEFAULT_PROPS;

export const Checkbox = forwardRef((props, ref) => (
    <PureCheckbox { ...props } forwardedRef={ref} />
));
