import "./Alert.css";

import { Button, ButtonGroup } from "../../button";
import { ComponentProps, MouseEvent, ReactNode, forwardRef, useMemo } from "react";
import { Dialog, useDialogTriggerContext } from "../../dialog";
import { Header } from "../../placeholders";
import { InfoIcon, WarningIcon } from "../../icons";
import { InternalProps, OmitInternalProps, OrbitComponentProps, isNil, isNilOrEmpty, mergeProps, useChainedEventCallback, useSlots } from "../../shared";

export interface InnerAlertProps extends InternalProps, OrbitComponentProps<"section"> {
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
     * The element's unique identifier.
     * @ignore
     */
    id?: string;
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
    variant = "confirmation",
    primaryButtonLabel,
    primaryButtonDisabled,
    secondaryButtonLabel,
    secondaryButtonDisabled,
    cancelButtonLabel,
    autoFocusButton,
    onPrimaryButtonClick,
    onSecondaryButtonClick,
    onCancelButtonClick,
    zIndex = 1,
    children,
    forwardedRef,
    ...rest
}: InnerAlertProps) {
    const { close } = useDialogTriggerContext();

    const { heading, content } = useSlots(children, useMemo(() => ({
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
            <WarningIcon size="lg" className="o-ui-alert-warning-icon" />
        </Header>
    );

    const negativeIconMarkup = variant === "negative" && (
        <Header>
            <InfoIcon size="lg" className="o-ui-alert-negative-icon" />
        </Header>
    );

    const primaryButtonMarkup = (
        <Button
            color={variant === "destructive" ? "danger" : undefined}
            disabled={primaryButtonDisabled}
            onClick={handlePrimaryButtonClick}
            autoFocus={isNil(autoFocusButton) || autoFocusButton === "primary"}
        >
            {primaryButtonLabel}
        </Button>
    );

    const secondaryButtonMarkup = !isNilOrEmpty(secondaryButtonLabel) && (
        <Button
            variant="outline"
            disabled={secondaryButtonDisabled}
            onClick={handleSecondaryButtonClick}
            autoFocus={autoFocusButton === "secondary"}
        >
            {secondaryButtonLabel}
        </Button>
    );

    const cancelButtonMarkup = !isNilOrEmpty(cancelButtonLabel) && (
        <Button
            variant="outline"
            onClick={handleCancelButtonClick}
            autoFocus={autoFocusButton === "cancel"}
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
