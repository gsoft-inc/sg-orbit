import "./Popover.css";

import {
    AriaLabelingProps,
    DomProps,
    InteractionStatesProps,
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
import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, cloneElement, forwardRef, useCallback, useMemo } from "react";
import { Text } from "../../typography";
import { useOverlayFocusRing, useTrapFocus } from "../../overlay";

const defaultElement = "section";

export interface InnerPopoverProps extends DomProps, AriaLabelingProps, InteractionStatesProps, ComponentProps<typeof defaultElement> {
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

export function InnerPopover({
    id,
    focus,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    as = defaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerPopoverProps) {
    const [focusScope, setFocusRef] = useFocusScope();

    const popoverRef = useMergedRefs(forwardedRef, setFocusRef);

    const focusManager = useFocusManager(focusScope);

    useTrapFocus(focusManager);

    useAutoFocusChild(focusManager, {
        canFocus: useCallback((element: HTMLElement) => {
            // Do not autofocus the popover itself.
            if (element === popoverRef.current) {
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
        })
    });

    const focusRingProps = useOverlayFocusRing({ focus });

    const popoverId = useId(id, "o-ui-popover");

    const { heading, content, footer, button, "button-group": buttonGroup } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        heading: {
            id: `${popoverId}-heading`,
            size: "sm",
            as: "h3"
        },
        content: {
            className: "o-ui-popover-content",
            as: Text
        },
        footer: {
            className: "o-ui-popover-footer",
            as: "footer"
        },
        button: {
            className: "o-ui-popover-button",
            size: "sm"
        },
        "button-group": {
            className: "o-ui-popover-button-group",
            size: "sm"
        }
    }), [popoverId]));

    const headingId = heading?.props?.id;

    const footerMarkup = isString(footer?.props?.children)
        ? cloneElement(footer, { children: <Text>{footer?.props?.children}</Text> })
        : footer;

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
        <Box
            {...mergeProps(
                rest,
                {
                    id,
                    className: "o-ui-popover",
                    tabIndex: -1,
                    role: "dialog",
                    "aria-label": ariaLabel,
                    "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy ?? headingId : undefined,
                    as,
                    ref: popoverRef
                },
                focusRingProps
            )}
        >
            {headerSectionMarkup}
            {content}
            {footerSectionMarkup}
        </Box>
    );
}

export const Popover = forwardRef<any, Omit<InnerPopoverProps, "forwardedRef">>((props, ref) => (
    <InnerPopover {...props} forwardedRef={ref} />
));

export type PopoverProps = ComponentProps<typeof Popover>;

Popover.displayName = "Popover";
