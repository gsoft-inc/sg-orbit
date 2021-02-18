import "./Autocomplete.css";

import { FocusTarget, Keys } from "../../../dist";
import { HiddenAutocomplete } from "./HiddenAutocomplete";
import { Listbox } from "../../listbox";
import { NodeShape, useCollectionItems } from "../../collection";
import { Overlay, isTargetParent, useOverlayLightDismiss, useOverlayPosition, useRestoreFocus, useTriggerWidth } from "../../overlay";
import { TextInput } from "../../input";
import { arrayOf, func, shape } from "prop-types";
import {
    augmentElement,
    cssModule,
    getRawSlots,
    isNilOrEmpty,
    isTyping,
    mergeProps,
    useAutoFocus,
    useChainedEventCallback,
    useCommittedRef,
    useControllableState,
    useEventCallback,
    useFocusScope,
    useId,
    useMergedRefs,
    useRefState
} from "../../shared";
import { forwardRef, useCallback, useRef, useState } from "react";
import { isNil, isNumber } from "lodash";
import { useFieldInputProps } from "../../field";
import { useFocusWithin } from "../../overlay/src/useFocusWithin";

/*
Do I have to maintain a dummy selected key for listbox????
Or always provide null
*/

const propTypes = {
    nodes: arrayOf(shape(NodeShape)).isRequired,
    onSearch: func.isRequired
};

// TODO: Actually find a way to use "usePopup" or extract a custom one?

export const AutocompleteBase = forwardRef((props, ref) => {
    const [fieldProps] = useFieldInputProps();

    const {
        nodes,
        id,
        open: openProp,
        defaultOpen,
        value: valueProp,
        defaultValue,
        placeholder,
        clearOnSelect,
        noResultsMessage,
        minCharacters = 1,
        required,
        validationState,
        onChange,
        onOpenChange,
        onSearch,
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
        menuProps: { style: { width: menuWidth, ...menuStyle } = {}, ...menuProps } = {},
        as: TriggerType = TextInput,
        ...rest
    } = mergeProps(
        props,
        fieldProps
    );

    const [isOpen, setIsOpen] = useControllableState(openProp, defaultOpen, false);
    const [triggerElement, setTriggerElement] = useState();
    const [overlayElement, setOverlayElement] = useState();

    const [queryRef, setQuery] = useRefState("");

    // Mostly to keep query in sync with the initial or controlled value.
    const [value, setValue] = useControllableState(valueProp, defaultValue, null, {
        onChange: useCallback(newValue => {
            setQuery(newValue ?? "");
        }, [setQuery])
    });

    const [overlayFocusScope, setOverlayFocusRef] = useFocusScope();

    const triggerRef = useMergedRefs(setTriggerElement, ref);
    const overlayRef = useMergedRefs(setOverlayElement, setOverlayFocusRef);

    const listboxRef = useRef();

    const updateIsOpen = useCallback((event, newValue) => {
        if (isOpen !== newValue) {
            if (!isNil(onOpenChange)) {
                onOpenChange(event, newValue);
            }

            setIsOpen(newValue);
        }
    }, [onOpenChange, isOpen, setIsOpen]);

    const open = event => {
        updateIsOpen(event, true);
    };

    const close = event => {
        updateIsOpen(event, false);
    };

    const updateValue = (event, newValue) => {
        if (value !== newValue) {
            if (!isNil(onChange)) {
                onChange(event, newValue);
            }

            setValue(newValue);
        }
    };

    const updateQuery = newQuery => {
        setQuery(newQuery, true);
    };

    const clear = event => {
        updateValue(event, null);
        // When the value is already null it won't trigger an onChange
        // which would have updated the query.
        updateQuery("");
    };

    const reset = () => {
        // Reset the value to the last selected one.
        if (value !== queryRef.current) {
            updateQuery(value ?? "");
        }
    };

    const search = (event, query) => {
        if (query.length > minCharacters) {
            updateQuery(query);
            onSearch(query);
            open(event);
        } else if (isNilOrEmpty(query)) {
            clear(event);
            close(event);
        } else {
            updateQuery(query);
            close(event);
        }
    };

    const overlayDismissProps = useOverlayLightDismiss(useCommittedRef(overlayElement), {
        trigger: "click",
        onHide: useEventCallback(event => {
            // Don't close the menu when the focus goes back to the trigger.
            if (!isTargetParent(event.target, triggerElement) && event.relatedTarget !== triggerElement) {
                close(event);
                reset();
            }
        }),
        hideOnEscape: true,
        hideOnLeave: true
    });

    const { overlayStyles, overlayProps: overlayPositionProps } = useOverlayPosition(triggerElement, overlayElement, {
        position: `${direction}-${align}`,
        offset: [0, 4],
        allowFlip,
        allowPreventOverflow
    });

    const restoreFocusProps = useRestoreFocus(overlayFocusScope, { isDisabled: !isOpen });

    const triggerWidth = useTriggerWidth(triggerElement);

    const triggerFocusWithinProps = useFocusWithin({
        onBlur: useEventCallback(event => {
            // Close the menu when the focus switch from the trigger to somewhere else than the menu.
            if (!isTargetParent(event.relatedTarget, overlayElement)) {
                close(event);
                reset();
            }
        })
    });

    const handleTriggerKeyDown = useEventCallback(event => {
        switch (event.keyCode) {
            case Keys.down:
                if (isOpen) {
                    event.preventDefault();
                    listboxRef.current?.focusFirst();
                }
                break;
            case Keys.up:
                if (isOpen) {
                    event.preventDefault();
                    listboxRef.current?.focusLast();
                }
                break;
            case Keys.esc:
                event.preventDefault();

                if (isOpen) {
                    close(event);
                } else {
                    clear(event);
                }
                break;
        }
    });

    const handleTriggerChange = useEventCallback(event => {
        search(event, event.target.value);
    });

    const handleListboxKeyDown = useEventCallback(event => {
        if (isTyping(event.keyCode)) {
            search(event, `${queryRef.current}${event.key}`);
            triggerElement?.focus();
        }
    });

    const items = useCollectionItems(nodes);

    const handleListboxChange = useEventCallback((event, newKey) => {
        const selectedItem = items.find(x => x.key === newKey);

        if (!isNil(selectedItem)) {
            const { text, stringValue } = getRawSlots(selectedItem?.content, ["text"]);

            if (!clearOnSelect) {
                updateValue(event, text ?? stringValue);
            } else {
                clear();
            }
        }

        close(event);
    });

    // const triggerId = useId(id, id ? undefined : "o-ui-autocomplete-trigger");
    // const overlayId = useId(id, id ? undefined : "o-ui-autocomplete-overlay");

    const iconMarkup = icon && augmentElement(icon, {
        className: "o-ui-autocomplete-icon",
        size: "sm"
    });

    const listboxMarkup = (
        <Listbox
            nodes={nodes}
            // An autocomplete doesn't support a selected key.
            selectedKey={null}
            onChange={handleListboxChange}
            onKeyDown={handleListboxKeyDown}
            fluid
            className="o-ui-autocomplete-listbox"
            aria-label={ariaLabel}
            // aria-labelledby={isNil(ariaLabel) ? ariaLabelledBy ?? triggerId : undefined}
            aria-describedby={ariaDescribedBy}
            ref={listboxRef}
        />
    );

    const noItemsMarkup = (
        <div>{noResultsMessage ?? "No results founds."}</div>
    );

    return (
        <div>
            <HiddenAutocomplete
                name={name}
                value={value}
                required={required}
                validationState={validationState}
                disabled={disabled}
            />
            <TriggerType
                {...mergeProps(
                    rest,
                    triggerFocusWithinProps,
                    {
                        // id: triggerId,
                        value: queryRef.current,
                        placeholder,
                        icon: iconMarkup,
                        onChange: handleTriggerChange,
                        onKeyDown: handleTriggerKeyDown,
                        autoFocus,
                        disabled,
                        className: cssModule(
                            "o-ui-autocomplete-trigger",
                            validationState,
                            fluid && "fluid",
                            active && "active",
                            focus && "focus",
                            hover && "hover"
                        ),
                        autoComplete: "off",
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
                    overlayDismissProps,
                    overlayPositionProps,
                    restoreFocusProps,
                    {
                        show: isOpen,
                        // TODO: hide when loading
                        zIndex,
                        className: "o-ui-autocomplete-menu",
                        style: {
                            ...overlayStyles,
                            ...menuStyle,
                            width: menuWidth ?? triggerWidth ?? undefined
                        },
                        tabIndex: "-1",
                        ref: overlayRef
                    }
                )}
            >
                {nodes.length > 0 ? listboxMarkup : noItemsMarkup}
            </Overlay>
        </div>
    );
});

AutocompleteBase.propTypes = propTypes;
AutocompleteBase.displayName = "AutocompleteBase";

