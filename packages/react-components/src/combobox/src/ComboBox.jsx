import "./ComboBox.css";

import { FocusTarget } from "../../../dist";
import { HiddenComboBox } from "./HiddenComboBox";
import { KeyProp } from "../../listbox";
import { Keys, augmentElement, cssModule, mergeProps, useAutoFocus, useChainedEventCallback, useControllableState, useEventCallback, useId, useMergedRefs, useRefState, useResizeObserver } from "../../shared";
import { Listbox } from "../../listbox";
import { NodeType, useCollection } from "../../collection";
import { Overlay, usePopup } from "../../overlay";
import { TextInput } from "../../input";
import { any, bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { isNil, isNumber } from "lodash";
import { useFieldInputProps } from "../../field";

/*
TODO:
- inputValue
- items
*/

/*
Do I have to maintain a dummy selected key for listbox????
Or always provide null
*/

const propTypes = {
    /**
     * Whether or not to open the combobox element.
     */
    open: bool,
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen: bool,
    /**
     * A controlled combobox value.
     */
    value: string,
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue: string,
    /**
     * Temporary text that occupies the combobox trigger when no value is selected.
     */
    placeholder: string,
    /**
     * Whether or not a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether or not the combobox should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the combobox value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string} selectedKey - The new value.
     * @returns {void}
     */
    onChange: func,
    /**
     * Called when the combobox open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isOpen - Indicate if the menu is open.
     * @returns {void}
     */
    onOpenChange: func,
    /**
     * Called before the combobox results are rendered.
     * @param {Result[]} results - The results to render.
     * @param {string} query - The search query.
     * @returns {Result[]} - New results to render.
     */
    onResults: func,
    /**
     * A trigger icon.
     */
    icon: element,
    /**
     * The direction the combobox menu will open relative to the input.
     */
    direction: oneOf(["bottom", "top"]),
    /**
     * The horizontal alignment of the combobox menu relative to the input.
     */
    align: oneOf(["start", "end"]),
    /**
     * Whether or not the combobox should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not the combobox take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether or not the combobox is disabled.
     */
    disabled: bool,
    /**
     * Whether or not the combobox menu can flip when it will overflow it's boundary area.
     */
    allowFlip: bool,
    /**
     * Whether or not the selection menu position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow: bool,
    /**
     * z-index of the overlay element.
     */
    zIndex: number,
    /**
     * Additional props to render on the menu of options.
     */
    menuProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

function useCollectionItems(nodes) {
    return useMemo(() => {
        return nodes.reduce((acc, x) => {
            if (x.type === NodeType.section) {
                x.items
                    .filter(y => y.type === NodeType.item)
                    .forEach(z => {
                        console.log(z);

                        acc.push(z);
                    });
            } else if (x.type === NodeType.item) {
                acc.push(x);
            }

            return acc;
        }, []);
    }, [nodes]);
}

export function InnerComboBox(props) {
    const [fieldProps] = useFieldInputProps();

    const {
        id,
        open: openProp,
        defaultOpen,
        value: valueProp,
        defaultValue,
        placeholder,
        required,
        validationState,
        onChange,
        onOpenChange,
        onResults,
        icon,
        direction = "bottom",
        align = "start",
        autoFocus,
        name,
        fluid,
        disabled,
        allowFlip = true,
        allowPreventOverflow = true,
        zIndex,
        active,
        focus,
        hover,
        "aria-label": ariaLabel,
        // Usually provided by the field inputs.
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        menuProps: { id: menuId, style: { width: menuWidth, ...menuStyle } = {}, ...menuProps } = {},
        as: TriggerType = TextInput,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        fieldProps
    );

    const [value, setValue] = useControllableState(valueProp, defaultValue, "");
    const [triggerWidth, setTriggerWidth] = useState(null);
    const [focusTargetRef, setFocusTarget] = useRefState(FocusTarget.first);

    const triggerRef = useMergedRefs(forwardedRef);

    const handleOpenChange = useChainedEventCallback(onOpenChange, (event, newValue) => {
        // When the select is closed because of a blur or outside click event, reset the focus target.
        if (!newValue) {
            setFocusTarget(FocusTarget.first);
        }
    });

    const { isOpen, setIsOpen, triggerElement, focusScope, focusManager, triggerProps, overlayProps } = usePopup("listbox", {
        id: menuId,
        open: openProp,
        defaultOpen,
        onOpenChange: handleOpenChange,
        hideOnEscape: true,
        hideOnLeave: true,
        restoreFocus: true,
        autoFocus: false,
        // Contrary to other popups, our combobox open when a value is typed.
        trigger: "none",
        position: `${direction}-${align}`,
        offset: [0, 4],
        allowFlip,
        allowPreventOverflow,
        keyProp: KeyProp
    });

    const updateValue = (event, newValue) => {
        if (!isNil(onChange)) {
            onChange(event, newValue);
        }

        setValue(newValue);
    };

    const open = (event, focusTarget) => {
        setFocusTarget(focusTarget);
        setIsOpen(event, true);
    };

    const close = event => {
        setIsOpen(event, false);
    };

    // Open the menu on up & down arrow keydown.
    // const handleTriggerKeyDown = useEventCallback(event => {
    //     switch (event.keyCode) {
    //         case Keys.down:
    //             event.preventDefault();
    //             open(event, FocusTarget.first);
    //             break;
    //         case Keys.up:
    //             event.preventDefault();
    //             open(event, FocusTarget.last);
    //             break;
    //     }
    // });

    const handleTriggerChange = useEventCallback(event => {
        // TODO: filter and display results

        updateValue(event, event.target.value);
    });

    const handleListboxChange = useEventCallback((event, newValue) => {
        // updateSelectedKey(event, newValue);

        // TODO: set value

        close(event);
    });

    // Move focus to item on mouse hover.
    const handleListboxOptionMouseEnter = useEventCallback(event => {
        focusManager.focusKey(event.target.getAttribute(KeyProp));
    });

    useAutoFocus(triggerRef, {
        isDisabled: !autoFocus || isOpen,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    // Ensure the trigger and menu width stay in sync.
    useResizeObserver(triggerElement, useEventCallback(entry => { setTriggerWidth(`${entry.borderBoxSize[0].inlineSize}px`); }), {
        box: "border-box"
    });

    const triggerId = useId(id, id ? undefined : "o-ui-combobox-trigger");

    const nodes = useCollection(children);
    const items = useCollectionItems(nodes);

    items.forEach(x => {
        x.props.onMouseEnter = handleListboxOptionMouseEnter;
    });

    const iconMarkup = icon && augmentElement(icon, {
        className: "o-ui-combobox-icon",
        size: "sm"
    });

    return (
        <>
            <HiddenComboBox
                name={name}
                value={value}
                required={required}
                validationState={validationState}
                disabled={disabled}
            />
            <TriggerType
                {...mergeProps(
                    rest,
                    triggerProps,
                    {
                        id: triggerId,
                        value,
                        placeholder,
                        icon: iconMarkup,
                        onChange: handleTriggerChange,
                        // onKeyDown: !isOpen ? handleTriggerKeyDown : undefined,
                        className: cssModule(
                            "o-ui-combobox-trigger",
                            validationState,
                            fluid && "fluid",
                            active && "active",
                            focus && "focus",
                            hover && "hover"
                        ),
                        disabled,
                        "aria-label": ariaLabel,
                        "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy : undefined,
                        "aria-describedby": ariaDescribedBy,
                        ref: triggerRef
                    }
                )}
            />
            <Overlay
                {...mergeProps(
                    menuProps,
                    overlayProps,
                    {
                        zIndex,
                        className: "o-ui-combobox-menu",
                        style: {
                            ...menuStyle,
                            width: menuWidth ?? triggerWidth ?? undefined
                        }
                    }
                )}
            >
                <Listbox
                    nodes={nodes}
                    onChange={handleListboxChange}
                    // Must be conditional to isOpen otherwise it will steal the focus from the trigger when selecting
                    // a value because the listbox re-render before the exit animation is done.
                    autoFocus={isOpen}
                    defaultFocusTarget={focusTargetRef.current}
                    fluid
                    className="o-ui-combobox-listbox"
                    aria-label={ariaLabel}
                    aria-labelledby={isNil(ariaLabel) ? ariaLabelledBy ?? triggerId : undefined}
                    aria-describedby={ariaDescribedBy}
                />
            </Overlay>
        </>
    );
}

InnerComboBox.propTypes = propTypes;

export const ComboBox = forwardRef((props, ref) => (
    <InnerComboBox {...props} forwardedRef={ref} />
));

ComboBox.displayName = "ComboBox";
