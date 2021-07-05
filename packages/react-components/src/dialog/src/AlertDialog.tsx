import "./AlertDialog.css";

import { AriaLabelingProps, DomProps, forwardRef, isNil, isNilOrEmpty, mergeProps, useChainedEventCallback, useSlots } from "../../shared";
import { Button, ButtonGroup } from "../../button";
import { ComponentProps, ElementType, ForwardedRef, MouseEvent, ReactNode, useMemo } from "react";
import { Dialog } from "./Dialog";
import { useDialogTriggerContext } from "./DialogTriggerContext";

/*
TODO:
- Support esc
- tone look
*/

export interface InnerAlertDialogProps extends DomProps, AriaLabelingProps {
    /**
     * The style to use.
     */
    tone?: "confirmation" | "danger" | "error";
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

export function InnerAlertDialog({
    tone = "confirmation",
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
}: InnerAlertDialogProps) {
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

    const primaryButtonMarkup = (
        <Button
            color={tone === "danger" ? "danger" : "primary"}
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
            {...mergeProps<any>(
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
            {content}
            {buttonsMarkup}
        </Dialog>
    );
}

export const AlertDialog = forwardRef<InnerAlertDialogProps>((props, ref) => (
    <InnerAlertDialog {...props} forwardedRef={ref} />
));

export type AlertDialogProps = ComponentProps<typeof AlertDialog>;

AlertDialog.displayName = "AlertDialog";
