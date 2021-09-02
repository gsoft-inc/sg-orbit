import "./Alert.css";

import { Button, ButtonGroup } from "../../button";
import { ComponentProps, MouseEvent, ReactNode, forwardRef, useMemo } from "react";
import { Dialog, DialogDefaultElement, useDialogTriggerContext } from "../../dialog";
import { Header } from "../../placeholders";
import { InfoIcon, WarningIcon } from "../../icons";
import { InternalProps, OmitInternalProps, StyledComponentProps, isNil, isNilOrEmpty, mergeProps, useChainedEventCallback, useSlots } from "../../shared";

export interface InnerAlertProps extends InternalProps, Omit<StyledComponentProps<typeof DialogDefaultElement>, "zIndex"> {
    /**
     * The button to focus by default when the alert open.
     */
    autoFocusButton?: "primary" | "secondary" | "cancel";
    /**
     * The cancel button label.
     */
    cancelButtonLabel?: string;
    /**
      * React children.
      */
    children: ReactNode;
    /**
     * Called when the cancel button is clicked.
     * @param {MouseEvent} event - React's original event.
     * @returns {void}
     */
    onCancelButtonClick?: (event: MouseEvent) => void;
    /**
     * Called when the primary button is clicked.
     * @param {MouseEvent} event - React's original event.
     * @returns {void}
     */
    onPrimaryButtonClick?: (event: MouseEvent) => void;
    /**
     * Called when the secondary button is clicked.
     * @param {MouseEvent} event - React's original event.
     * @returns {void}
     */
    onSecondaryButtonClick?: (event: MouseEvent) => void;
    /**
     * Whether or not the primary button is disabled.
     */
    primaryButtonDisabled?: boolean;
    /**
     * The primary button label.
     */
    primaryButtonLabel: string;
    /**
     * Whether or not the secondary button is disabled.
     */
    secondaryButtonDisabled?: boolean;
    /**
     * The secondary button label.
     */
    secondaryButtonLabel?: string;
    /**
     * The style to use.
     */
    variant?: "confirmation" | "destructive" | "warning" | "negative";
    /**
      * Additional props to render on the wrapper element.
      */
    wrapperProps?: Record<string, any>;
    /**
      * The z-index of the alert.
      */
    zIndex?: number;
}

export function InnerAlert({
    autoFocusButton,
    cancelButtonLabel,
    children,
    forwardedRef,
    onCancelButtonClick,
    onPrimaryButtonClick,
    onSecondaryButtonClick,
    primaryButtonDisabled,
    primaryButtonLabel,
    secondaryButtonDisabled,
    secondaryButtonLabel,
    variant = "confirmation",
    zIndex = 1,
    ...rest
}: InnerAlertProps) {
    const { close } = useDialogTriggerContext();

    const { content, heading } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        content: null,
        heading: null
    }), []));

    const handlePrimaryButtonClick = useChainedEventCallback(onPrimaryButtonClick, event => {
        if (!isNil(close)) {
            close(event);
        }
    });

    const handleSecondaryButtonClick = useChainedEventCallback(onSecondaryButtonClick, event => {
        if (!isNil(close)) {
            close(event);
        }
    });

    const handleCancelButtonClick = useChainedEventCallback(onCancelButtonClick, event => {
        if (!isNil(close)) {
            close(event);
        }
    });

    const warningIconMarkup = variant === "warning" && (
        <Header>
            <WarningIcon className="o-ui-alert-warning-icon" size="lg" />
        </Header>
    );

    const negativeIconMarkup = variant === "negative" && (
        <Header>
            <InfoIcon className="o-ui-alert-negative-icon" size="lg" />
        </Header>
    );

    const primaryButtonMarkup = (
        <Button
            autoFocus={isNil(autoFocusButton) || autoFocusButton === "primary"}
            color={variant === "destructive" ? "danger" : undefined}
            disabled={primaryButtonDisabled}
            onClick={handlePrimaryButtonClick}
        >
            {primaryButtonLabel}
        </Button>
    );

    const secondaryButtonMarkup = !isNilOrEmpty(secondaryButtonLabel) && (
        <Button
            autoFocus={autoFocusButton === "secondary"}
            disabled={secondaryButtonDisabled}
            onClick={handleSecondaryButtonClick}
            variant="outline"
        >
            {secondaryButtonLabel}
        </Button>
    );

    const cancelButtonMarkup = !isNilOrEmpty(cancelButtonLabel) && (
        <Button
            autoFocus={autoFocusButton === "cancel"}
            onClick={handleCancelButtonClick}
            variant="outline"
        >
            {cancelButtonLabel}
        </Button>
    );

    const buttonsMarkup = isNil(secondaryButtonMarkup) && isNil(cancelButtonMarkup)
        ? primaryButtonMarkup
        : (
            <ButtonGroup>
                {cancelButtonMarkup}
                {secondaryButtonMarkup}
                {primaryButtonMarkup}
            </ButtonGroup>
        );

    return (
        <Dialog
            {...mergeProps(
                rest,
                {
                    dismissable: false,
                    ref: forwardedRef,
                    role: "alertdialog",
                    size: "sm",
                    zIndex
                } as const
            )}
        >
            {heading}
            {warningIconMarkup}
            {negativeIconMarkup}
            {content}
            {buttonsMarkup}
        </Dialog>
    );
}

export const Alert = forwardRef<any, OmitInternalProps<InnerAlertProps>>((props, ref) => (
    <InnerAlert {...props} forwardedRef={ref} />
));

export type AlertProps = ComponentProps<typeof Alert>;
