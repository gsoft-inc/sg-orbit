import { Ref, Checkbox as SemanticCheckbox } from "semantic-ui-react";
import { bool, element, func, number, object, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef, useEffect } from "react";
import { createIconForControl } from "@orbit-ui/react-icons";
import { createLabelFromShorthand } from "@orbit-ui/react-label";
import { isElement } from "react-is";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided, useForwardRef } from "@orbit-ui/react-components-shared";

// TODO: Shouldn't accept "radio" or "toggle".
const UNSUPPORTED_PROPS = ["as", "slider", "type"];

// TODO: What about size
// TODO: If size is support what about Icons in label

const propTypes = {
    /**
     * The text associated to the checkbox.
     */
    text: string,
    /**
     * A React SVG component displayed after the checkbox text.
     */
    icon: element,
    /**
     * A label displayed after the checkbox text.
     */
    label: oneOfType([element, object]),
    /**
     * Whether or not the checkbox should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * @ignore
     */
    disabled: bool,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    autofocus: false,
    disabled: false
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
    const { text, icon, label, autofocus, autofocusDelay, disabled, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-input/checkbox");

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
            right = createIconForControl(icon, "medium");
        }

        if (!isNil(label)) {
            right = renderLabel();
        }

        return <label>{!isNil(text) && text}{!isNil(right) && right}</label>;
    };

    const shouldAutofocus = autofocus && !disabled && isNil(autofocusDelay);

    return (
        <Ref innerRef={setInnerRef}>
            <SemanticCheckbox
                label={renderContent()}
                autoFocus={shouldAutofocus}
                disabled={disabled}
                data-testid="checkbox"
                {...rest}
            />
        </Ref>
    );
}

PureCheckbox.propTypes = propTypes;
PureCheckbox.defaultProps = defaultProps;

export const Checkbox = forwardRef((props, ref) => (
    <PureCheckbox { ...props } forwardedRef={ref} />
));
