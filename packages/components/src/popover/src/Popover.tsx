import { ComponentProps, MouseEvent, ReactNode, SyntheticEvent, cloneElement, forwardRef, useCallback, useMemo, useRef } from "react";
import {
    FocusScopeContext,
    InteractionProps,
    InternalProps,
    OmitInternalProps,
    StyledComponentProps,
    isNil,
    isString,
    mergeProps,
    useAutoFocusChild,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useId,
    useMergedRefs,
    useSlots
} from "../../shared";
import { useOverlayFocusRing, useTrapFocus } from "../../overlay";

import { Box } from "../../box";
import { CrossButton } from "../../button";
import { Text } from "../../typography";
import { usePopoverTriggerContext } from "./PopoverTriggerContext";

const DefaultElement = "section";

export interface InnerPopoverProps extends InternalProps, InteractionProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the popover should close on outside interactions.
     */
    dismissable?: boolean;
    /**
     * Called when a closing event happenened.
     * @param {SyntheticEvent} event - React's original synthetic event.
     * @returns {void}
     */
    onClose?: (event: SyntheticEvent) => void;
    /**
     * The z-index of the dialog.
     */
    zIndex?: number;
}

export function InnerPopover({
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    as = DefaultElement,
    children,
    dismissable = true,
    focus,
    forwardedRef,
    id,
    onClose,
    zIndex = 10000,
    ...rest
}: InnerPopoverProps) {
    const [focusScope, setFocusRef] = useFocusScope();

    const popoverRef = useMergedRefs(forwardedRef, setFocusRef);
    const dismissButtonRef = useRef<HTMLButtonElement>();

    const { close: triggerClose } = usePopoverTriggerContext();

    const close = useCallback(event => {
        if (!isNil(triggerClose)) {
            triggerClose(event);
        }

        if (!isNil(onClose)) {
            onClose(event);
        }
    }, [onClose, triggerClose]);

    const focusManager = useFocusManager(focusScope);

    useTrapFocus(focusManager);

    useAutoFocusChild(focusManager, {
        canFocus: useCallback((element: HTMLElement) => {
            // Do not autofocus the popover itself.
            if (element === popoverRef.current) {
                return false;
            }

            // Do not autofocus the dismiss button.
            if (element === dismissButtonRef.current) {
                return false;
            }

            // Do not autofocus a link.
            if (element?.tagName === "A") {
                return false;
            }

            return true;
        }, [popoverRef]),
        onNotFound: useEventCallback(() => {
            popoverRef.current?.focus();
        }),
        tabbableOnly: true
    });

    const focusRingProps = useOverlayFocusRing({ focus });

    const handleDismissButtonClick = useEventCallback((event: MouseEvent) => {
        close(event);
    });

    const popoverId = useId(id, "o-ui-popover");

    const { button, "button-group": buttonGroup, content, footer, heading } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        button: {
            className: "o-ui-popover-button",
            size: "sm"
        },
        "button-group": {
            className: "o-ui-popover-button-group",
            size: "sm"
        },
        content: {
            as: Text,
            className: "o-ui-popover-content"
        },
        footer: {
            as: "footer",
            className: "o-ui-popover-footer"
        },
        heading: {
            as: "h3",
            id: `${popoverId}-heading`,
            size: "sm"
        }
    }), [popoverId]));

    const headingId = heading?.props?.id;

    const footerMarkup = isString(footer?.props?.children)
        ? cloneElement(footer, { children: <Text>{footer?.props?.children}</Text> })
        : footer;

    const dismissButtonMarkup = dismissable && (
        <CrossButton
            aria-label="Dismiss"
            className="o-ui-popover-dismiss-button"
            condensed
            onClick={handleDismissButtonClick}
            ref={dismissButtonRef}
            size="xs"
        />
    );

    const headerSectionMarkup = heading && (
        <header className="o-ui-popover-header-section">
            {heading}
        </header>
    );

    const footerSectionMarkup = (footer || button || buttonGroup) && (
        <footer className="o-ui-popover-footer-section">
            {footerMarkup}
            {button}
            {buttonGroup}
        </footer>
    );

    return (
        <FocusScopeContext.Provider value={{ scope: focusScope }}>
            <Box
                {...mergeProps(
                    rest,
                    {
                        "aria-label": ariaLabel,
                        "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy ?? headingId : undefined,
                        as,
                        className: "o-ui-popover",
                        id,
                        ref: popoverRef,
                        role: "dialog",
                        tabIndex: -1,
                        zIndex
                    },
                    focusRingProps
                )}
            >
                {dismissButtonMarkup}
                {headerSectionMarkup}
                {content}
                {footerSectionMarkup}
            </Box>
        </FocusScopeContext.Provider>
    );
}

InnerPopover.defaultElement = DefaultElement;

export const Popover = forwardRef<any, OmitInternalProps<InnerPopoverProps>>((props, ref) => (
    <InnerPopover {...props} forwardedRef={ref} />
));

export type PopoverProps = ComponentProps<typeof Popover>;

