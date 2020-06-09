/* eslint-disable react/forbid-foreign-prop-types */

import { EmbeddedIcon } from "../../icons";
import { Input as SemanticInput } from "semantic-ui-react";
import { bool, element, number, object, oneOf, oneOfType, string } from "prop-types";
import { createEmbeddedButton } from "../../button";
import { createShorthandFactory, mergeClasses, useAutofocus } from "../../shared";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { isNil } from "lodash";

export const INPUT_SIZES = ["small", "medium", "large"];
export const INPUT_UNSUPPORTED_PROPS = ["action", "actionPosition", "inverted"];

const INPUT_PROP_TYPES = {
    /**
     * Whether or not the input should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) for an [icon](/?path=/docs/components-icon--default-story).
     */
    icon: element,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["left", "right"]),
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) to display a [button](/?path=/docs/components-button--default-story) after the value.
     */
    button: oneOfType([element, object]),
    /**
     * An input can vary in sizes.
     */
    size: oneOf(INPUT_SIZES),
    /**
     * Additional CSS classes to render on the wrapper element.
     */
    wrapperClassName: string,
    /**
     * Additional style to render on the wrapper element.
     */
    wrapperStyle: object
};

export const INPUT_DEFAULT_PROPS = {
    iconPosition: "right"
};

const propTypes = {
    ...INPUT_PROP_TYPES,
    /**
     * @ignore
     */
    __componentName: string
};

const defaultProps = INPUT_DEFAULT_PROPS;

function throwWhenMutuallyExclusivePropsAreProvided({ button, icon, iconPosition }, componentName) {
    if (!isNil(button) && !isNil(icon) && iconPosition === "right") {
        throw new Error(`${componentName} doesn't support having a button and a right positioned icon at the same time.`);
    }
}

export function InnerInput(props) {
    const {
        autofocus,
        autofocusDelay,
        fluid,
        icon,
        iconPosition,
        button,
        size,
        active,
        focus,
        hover,
        loading,
        disabled,
        className,
        wrapperClassName,
        wrapperStyle,
        forwardedRef,
        __componentName = "@orbit-ui/react-components/Input",
        ...rest
    } = props;
    throwWhenMutuallyExclusivePropsAreProvided(props, __componentName);

    const wrapperRef = useRef();
    const inputComponentRef = useRef();

    const setFocus = useCallback(() => {
        if (!isNil(wrapperRef.current)) {
            wrapperRef.current.querySelector("input").focus();
        }
    }, [wrapperRef]);

    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

    // Forward native input API to the external ref element.
    useImperativeHandle(forwardedRef, () => {
        const apiMethods = ["blur", "focus", "select", "setRangeText", "setSelectionRange", "checkValidity", "reportValidity", "setCustomValidity"];
        const domElement = wrapperRef.current;

        apiMethods.forEach(x => {
            domElement[x] = inputComponentRef.current[x];
        });

        return domElement;
    });

    const canRenderIcon = !isNil(icon) && !loading;
    const canRenderButton = !isNil(button) && !disabled && (!loading || iconPosition === "left");

    const renderButton = () => {
        return createEmbeddedButton(button, {
            size,
            circular: true,
            ghost: true,
            secondary: true,
            className: "input-clear-button"
        });
    };

    return (
        <div
            ref={wrapperRef}
            className={mergeClasses(
                "relative outline-0",
                button && "with-button",
                fluid ? "w-100" : "dib",
                wrapperClassName
            )}
            style={wrapperStyle}
            tabIndex="-1"
            data-testid="input"
        >
            <SemanticInput
                {...rest}
                {...autofocusProps}
                icon={canRenderIcon ? <EmbeddedIcon icon={icon} size={size} /> : undefined}
                iconPosition={iconPosition === "left" ? "left" : undefined}
                fluid={fluid}
                focus={focus}
                size={size}
                loading={loading}
                disabled={disabled}
                className={mergeClasses(
                    active && "active",
                    hover && "hover",
                    className
                )}
                ref={inputComponentRef}
            />
            {canRenderButton && renderButton()}
        </div>
    );
}

InnerInput.propTypes = propTypes;
InnerInput.defaultProps = defaultProps;

export const Input = forwardRef((props, ref) => (
    <InnerInput { ...props } forwardedRef={ref} />
));

if (!isNil(SemanticInput.propTypes)) {
    SemanticInput.propTypes.size = oneOf(INPUT_SIZES);
}

export const createInput = createShorthandFactory(Input);
