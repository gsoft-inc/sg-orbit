import "./Select.css";

import { AriaLabelingProps, InteractionStatesProps, augmentElement, cssModule, forwardRef, mergeProps } from "../../shared";
import { ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, SyntheticEvent } from "react";
import { DisclosureArrow } from "../../disclosure";
import { HiddenSelect } from "./HiddenSelect";
import { Listbox } from "../../listbox";
import { Overlay, OverlayProps as OverlayPropsForDocumentation } from "../../overlay";
import { Text } from "../../text";
import { isNil } from "lodash";
import { useFieldInputProps } from "../../field";
import { useSelect } from "./useSelect";

// used to generate OverlayProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OverlayProps extends Partial<OverlayPropsForDocumentation> {
}

export interface InnerSelectProps extends InteractionStatesProps, AriaLabelingProps {
    /**
     * @ignore
     */
    name?: string;
    /**
     * Whether or not to open the select element.
     */
    open?: boolean;
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen?: boolean;
    /**
     * A controlled selected key.
     */
    selectedKey?: string;
    /**
     * The initial value of `selectedKey` when uncontrolled.
     */
    defaultSelectedKey?: string;
    /**
     * Temporary text that occupies the select trigger when no value is selected.
     */
    placeholder?: string;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the select should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Called when the select value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string} selectedKey - The new selected key.
     * @returns {void}
     */
    onSelectionChange?(event: SyntheticEvent, selectedKey: string): void;
    /**
     * Called when the select open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isOpen - Indicate if the menu is open.
     * @returns {void}
     */
    onOpenChange?(event: SyntheticEvent, isOpen: boolean): void;
    /**
     * The style to use.
     */
    variant?: "outline" | "ghost";
    /**
     * A trigger icon.
     */
    icon?: ReactElement;
    /**
     * The direction the select menu will open relative to the input.
     */
    direction?: "bottom" | "top";
    /**
     * The horizontal alignment of the select menu relative to the input.
     */
    align?: "start" | "end";
    /**
     * Whether or not the select should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Whether or not the select take up the width of its container.
     */
    fluid?: boolean;
    /**
     * Whether or not the select is disabled.
     */
    disabled?: boolean;
    /**
     * Whether or not the select menu can flip when it will overflow it's boundary area.
     */
    allowFlip?: boolean;
    /**
     * Whether or not the selection menu position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow?: boolean;
    /**
     * z-index of the overlay element.
     */
    zIndex?: number;
    /**
     * Additional props to render on the menu of options.
     */
    overlayProps?: Partial<OverlayProps>;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerSelect(props: InnerSelectProps) {
    const [fieldProps] = useFieldInputProps();

    const {
        id,
        open,
        defaultOpen,
        selectedKey: selectedKeyProp,
        defaultSelectedKey,
        placeholder,
        required,
        validationState,
        onSelectionChange,
        onOpenChange,
        variant = "outline",
        icon,
        direction = "bottom",
        align = "start",
        autoFocus,
        name,
        fluid,
        disabled,
        allowFlip = true,
        allowPreventOverflow = true,
        zIndex = 10000,
        active,
        focus,
        hover,
        "aria-label": ariaLabel,
        // Usually provided by the field inputs.
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        overlayProps: overlayPropsProp,
        as: TriggerType = "button",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        fieldProps
    );

    const { selectedKey, selectedItem, isOpen, triggerProps, overlayProps, listboxProps } = useSelect(children, {
        id,
        open,
        defaultOpen,
        selectedKey: selectedKeyProp,
        defaultSelectedKey,
        onSelectionChange,
        onOpenChange,
        direction,
        align,
        autoFocus,
        disabled,
        allowFlip,
        allowPreventOverflow,
        allowResponsiveMenuWidth: variant !== "ghost",
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy,
        overlayProps: overlayPropsProp,
        ref: forwardedRef
    });

    const iconMarkup = icon && augmentElement(icon, {
        className: "o-ui-select-icon",
        size: "sm"
    });

    const selectedIconMarkup = selectedItem?.icon && augmentElement(selectedItem.icon, {
        size: "sm",
        className: "o-ui-select-value-start-icon"
    });

    const selectedTextMarkup = selectedItem?.text && (
        <Text className="o-ui-select-value-text">
            {selectedItem.text}
        </Text>
    );

    const selectedEndIconMarkup = selectedItem?.endIcon && augmentElement(selectedItem.endIcon, {
        size: "sm",
        className: "o-ui-select-value-end-icon"
    });

    const valueMarkup = isNil(selectedItem)
        ? placeholder && (
            <Text className="o-ui-select-placeholder">{placeholder}</Text>
        )
        : (
            <span className="o-ui-select-value">
                {selectedIconMarkup}
                {selectedTextMarkup}
                {selectedEndIconMarkup}
            </span>
        );

    return (
        <>
            <HiddenSelect
                name={name}
                selectedKey={selectedKey}
                required={required}
                validationState={validationState}
                disabled={disabled}
            />
            <TriggerType
                {...mergeProps(
                    rest,
                    {
                        className: cssModule(
                            "o-ui-select-trigger",
                            variant,
                            validationState,
                            fluid && "fluid",
                            active && "active",
                            focus && "focus",
                            hover && "hover"
                        )
                    },
                    triggerProps
                )}
            >
                {iconMarkup}
                {valueMarkup}
                <DisclosureArrow
                    open={isOpen}
                    size="sm"
                />
            </TriggerType>
            <Overlay
                {...overlayProps}
                zIndex={zIndex}
            >
                <Listbox {...listboxProps} />
            </Overlay>
        </>
    );
}

export const Select = forwardRef<InnerSelectProps>((props, ref) => (
    <InnerSelect {...props} forwardedRef={ref} />
));

export type SelectProps = ComponentProps<typeof Select>

Select.displayName = "Select";
