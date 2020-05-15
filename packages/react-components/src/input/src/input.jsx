/* eslint-disable react/forbid-foreign-prop-types */

import { ArgumentError, mergeClasses, useAutofocus } from "../../shared";
import { Input as SemanticInput } from "semantic-ui-react";
import { bool, element, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef, useImperativeHandle, useRef } from "react";
import { createButton, getContentButtonSize } from "../../button";
import { createContentIcon } from "../../icons";
import { isElement } from "react-is";
import { isNil } from "lodash";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

export const INPUT_UNSUPPORTED_PROPS = ["action", "actionPosition", "inverted"];

const propTypes = {
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
    iconPosition: oneOf(["left"]),
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) to display a [button](/?path=/docs/components-button--default-story) after the value.
     */
    button: oneOfType([element, object]),
    /**
     * An input can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * Additional CSS classes to render on the wrapper element.
     */
    wrapperClassName: string,
    /**
     * Additional style to render on the wrapper element.
     */
    wrapperStyle: object,
    /**
     * @ignore
     */
    disabled: bool,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func]),
    /**
     * @ignore
     */
    __componentName: string
};

const defaultProps = {
    autofocus: false,
    size: DEFAULT_SIZE,
    disabled: false,
    __componentName: "@orbit-ui/react-components/input"
};

function throwWhenMutuallyExclusivePropsAreProvided({ button, icon, iconPosition }, componentName) {
    if (!isNil(button) && !isNil(icon) && iconPosition === "right") {
        throw new ArgumentError(`${componentName} doesn't support having a button and a right positioned icon at the same time.`);
    }
}

function useSetFocus(containerRef) {
    return () => {
        if (!isNil(containerRef.current)) {
            containerRef.current.querySelector("input").focus();
        }
    };
}

function useForwardInputApi(forwardedRef, containerRef, inputComponentRef) {
    useImperativeHandle(forwardedRef, () => {
        const apiMethods = ["blur", "focus", "select", "setRangeText", "setSelectionRange", "checkValidity", "reportValidity", "setCustomValidity"];
        const domElement = containerRef.current;

        // These functions are part of the component external API.
        apiMethods.forEach(x => {
            domElement[x] = inputComponentRef.current[x];
        });

        return domElement;
    });
}

function useIconRenderer({ icon, size, loading }) {
    return () => {
        if (!isNil(icon) && !loading) {
            return createContentIcon(icon, size);
        }
    };
}

function useButtonRenderer({ iconPosition, button, size, loading, disabled }) {
    return () => {
        if (!isNil(button)) {
            const canRenderButton = !disabled && (!loading || (loading && iconPosition === "left"));

            if (canRenderButton) {
                const props = {
                    size: getContentButtonSize(size),
                    circular: true,
                    ghost: true,
                    secondary: true
                };

                const getClasses = (...args) => {
                    return mergeClasses(
                        "input-clear-button",
                        ...args
                    );
                };

                if (isElement(button)) {
                    return cloneElement(button, {
                        className: getClasses(button.props && button.props.className),
                        ...props
                    });
                }

                return createButton({
                    ...button,
                    ...props,
                    className: getClasses(button.className)
                });
            }
        }
    };
}

function useInputRenderer({ fluid, iconPosition, size, loading, disabled, children, rest }, autofocusProps, inputComponentRef, icon) {
    return () => {
        return (
            <SemanticInput
                {...rest}
                {...autofocusProps}
                icon={icon}
                iconPosition={iconPosition}
                fluid={fluid}
                size={size}
                loading={loading}
                disabled={disabled}
                ref={inputComponentRef}
            >
                {children}
            </SemanticInput>
        );
    };
}

function useRenderer({ button, fluid, wrapperClassName, wrapperStyle }, containerRef, buttonComponent, input) {
    return () => {
        const classes = mergeClasses(
            "relative outline-0",
            fluid ? "w-100" : "dib",
            button && "with-button",
            wrapperClassName
        );

        return (
            <div
                ref={containerRef}
                className={classes}
                style={wrapperStyle}
                tabIndex={-1}
                data-testid="input"
            >
                {input}
                {buttonComponent}
            </div>
        );
    };
}

export function InnerInput(props) {
    const { autofocus, autofocusDelay, fluid, icon, iconPosition, button, size, loading, disabled, wrapperClassName, wrapperStyle, __componentName, forwardedRef, children, ...rest } = props;

    throwWhenMutuallyExclusivePropsAreProvided(props, __componentName);

    const containerRef = useRef();
    const inputComponentRef = useRef();

    useForwardInputApi(forwardedRef, containerRef, inputComponentRef);

    const setFocus = useSetFocus(containerRef);
    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

    const renderIcon = useIconRenderer({ icon, size, loading });
    const renderButton = useButtonRenderer({ iconPosition, button, size, loading, disabled });
    const renderInput = useInputRenderer({ fluid, iconPosition, size, loading, disabled, children, rest }, autofocusProps, inputComponentRef, renderIcon());
    const render = useRenderer({ button, fluid, wrapperClassName, wrapperStyle }, containerRef, renderButton(), renderInput() );

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerInput.propTypes = propTypes;
InnerInput.defaultProps = defaultProps;

export const Input = forwardRef((props, ref) => (
    <InnerInput { ...props } forwardedRef={ref} />
));

if (!isNil(SemanticInput.propTypes)) {
    SemanticInput.propTypes.size = oneOf(SIZES);
}
