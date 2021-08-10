import "./Alert.css";

import { AriaLabelingProps, DomProps, forwardRef, isNil, isNilOrEmpty, mergePropsInto, useChainedEventCallback, useSlots } from "../../shared";
import { Button, ButtonGroup } from "../../button";
import { ComponentProps, ElementType, ForwardedRef, MouseEvent, ReactNode, useMemo } from "react";
import { Dialog, DialogProps, useDialogTriggerContext } from "../../dialog";
import { Header } from "../../placeholders";
import { InfoIcon, WarningIcon } from "../../icons";

export interface InnerAlertProps extends DomProps, AriaLabelingProps {
    /**
     * The style to use.
     */
    variant?: "confirmation" | "destructive" | "warning" | "negative";
    /**
     * The primary button label.
     */
    primaryButtonLabel: string;
    /**
     * Whether or not the primary button is disabled.
     */
    primaryButtonDisabled?: boolean;
    /**
     * The secondary button label.
     */
    secondaryButtonLabel?: string;
    /**
     * Whether or not the secondary button is disabled.
     */
    secondaryButtonDisabled?: boolean;
    /**
     * The cancel button label.
     */
    cancelButtonLabel?: string;
    /**
     * The button to focus by default when the alert open.
     */
    autoFocusButton?: "primary" | "secondary" | "cancel";
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
     * Called when the cancel button is clicked.
     * @param {MouseEvent} event - React's original event.
     * @returns {void}
     */
    onCancelButtonClick?: (event: MouseEvent) => void;
    /**
      * The z-index of the alert.
      */
    zIndex?: number;
    /**
      * Additional props to render on the wrapper element.
      */
    wrapperProps?: Record<string, any>;
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
        heading: null,
        content: null
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
            {...mergePropsInto<DialogProps>(
                rest,
                {
                    role: "alertdialog",
                    size: "sm",
                    dismissable: false,
                    zIndex,
                    ref: forwardedRef
                }
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

export const Alert = forwardRef<InnerAlertProps>((props, ref) => (
    <InnerAlert {...props} forwardedRef={ref} />
));

export type AlertProps = ComponentProps<typeof Alert>;

Alert.displayName = "Alert";
