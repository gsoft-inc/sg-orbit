import { Ref, Checkbox as SemanticCheckbox } from "semantic-ui-react";
import { arrayOf, bool, element, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef, useEffect } from "react";
import { createIconForControl } from "@orbit-ui/react-icons";
import { createLabelFromShorthand } from "@orbit-ui/react-label";
import { isElement } from "react-is";
import { isNil } from "lodash";
import { mergeClasses, throwWhenUnsupportedPropIsProvided, useForwardRef } from "@orbit-ui/react-components-shared";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const UNSUPPORTED_PROPS = ["as", "slider", "type", "radio", "toggle"];

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
     * A React component displayed after the checkbox text.
     */
    icon: element,
    /**
     * A label displayed after the checkbox text.
     */
    label: oneOfType([element, object]),
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
    unsupportedProps: arrayOf(string),
    /**
     * @ignore
     */
    unsupportedPropsComponentName: string
};

export const CHECKBOX_DEFAULT_PROPS = {
    autofocus: false,
    size: DEFAULT_SIZE,
    disabled: false,
    unsupportedPropsComponentName: "@orbit-ui/react-input/checkbox"
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

export function PureCheckbox(props) {
    const { autofocus, autofocusDelay, text, icon, label, size, disabled, className, forwardedRef, unsupportedProps, unsupportedPropsComponentName, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, !isNil(unsupportedProps) ? unsupportedProps : UNSUPPORTED_PROPS, unsupportedPropsComponentName);

    const [innerRef, setInnerRef] = useForwardRef(forwardedRef);
    useDelayedAutofocus(autofocus, autofocusDelay, disabled, innerRef);

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

    const renderContent = () => {
        let right;

        if (!isNil(icon)) {
            right = createIconForControl(icon, size);
        }

        if (!isNil(label)) {
            right = renderLabel();
        }

        if (!isNil(text) || !isNil(right)) {
            return <label>{!isNil(text) && text}{!isNil(right) && right}</label>;
        }
    };

    const classes = mergeClasses(
        size && size,
        className
    );

    const shouldAutofocus = autofocus && !disabled && isNil(autofocusDelay);

    return (
        <Ref innerRef={setInnerRef}>
            <SemanticCheckbox
                label={renderContent()}
                autoFocus={shouldAutofocus}
                disabled={disabled}
                className={classes}
                data-testid="checkbox"
                {...rest}
            />
        </Ref>
    );
}

PureCheckbox.propTypes = CHECKBOX_PROP_TYPES;
PureCheckbox.defaultProps = CHECKBOX_DEFAULT_PROPS;

export const Checkbox = forwardRef((props, ref) => (
    <PureCheckbox { ...props } forwardedRef={ref} />
));
