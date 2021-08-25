import "./Dialog.css";

import {
    AriaLabelingProps,
    DomProps,
    InteractionStatesProps,
    MergedRef,
    cssModule,
    forwardRef,
    isNil,
    isString,
    mergeProps,
    normalizeSize,
    useAutoFocusChild,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useId,
    useMergedRefs,
    useRefState,
    useResizeObserver,
    useSlots
} from "../../shared";
import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, MouseEvent, ReactNode, cloneElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CrossButton } from "../../button";
import { Text } from "../../typography";
import { Underlay, useOverlayFocusRing, useRestoreFocus, useTrapFocus } from "../../overlay";
import { useDialogTriggerContext } from "./DialogTriggerContext";

export interface InnerDialogProps extends DomProps, AriaLabelingProps, InteractionStatesProps {
    /**
     * The dialog role.
     */
    role?: "dialog" | "alertdialog";
    /**
     * A dialog can vary in size.
     */
    size?: "sm" | "md" | "lg" | "fullscreen";
    /**
     * Whether or not the dialog should close on outside interactions.
     */
    dismissable?: boolean;
    /**
     * The z-index of the dialog.
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

function useHideBodyScrollbar() {
    const [stateRef, setState] = useRefState({
        isVisible: true,
        originalPosition: ""
    });

    useEffect(() => {
        if (stateRef.current.isVisible) {
            setState({
                isVisible: false,
                originalPosition: document.body.style.overflowY
            });

            document.body.style.overflowY = "hidden";
        }

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const state = stateRef.current;

            if (!state.isVisible) {
                setState({
                    isVisible: true,
                    originalPosition: ""
                });

                document.body.style.overflowY = state.originalPosition;
            }
        };
    }, [stateRef, setState]);
}

function useElementHasVerticalScrollbar(): [MergedRef<HTMLElement>, boolean] {
    const [hasScrollbar, setHasScrollbar] = useState(false);
    const [elementRef, setElement] = useRefState<HTMLElement>();

    const handleElementResize = useEventCallback(() => {
        setHasScrollbar(elementRef.current.scrollHeight > elementRef.current.clientHeight);
    });

    const resizeRef = useResizeObserver(handleElementResize);

    return [
        useMergedRefs(setElement, resizeRef),
        hasScrollbar
    ];
}

function isElementInViewport(element: HTMLElement) {
    const clientRect = element.getBoundingClientRect();

    return (
        clientRect.top >= 0 &&
        clientRect.left >= 0 &&
        clientRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        clientRect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

export function InnerDialog({
    id,
    role = "dialog",
    size,
    dismissable = true,
    focus,
    zIndex = 1,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    wrapperProps,
    as = "section",
    children,
    forwardedRef,
    ...rest
}: InnerDialogProps) {
    const [focusScope, setFocusRef] = useFocusScope();

    const wrapperRef = useRef<HTMLElement>();
    const dialogRef = useMergedRefs(forwardedRef, setFocusRef);
    const dismissButtonRef = useRef<HTMLButtonElement>();

    const { close } = useDialogTriggerContext();

    useHideBodyScrollbar();

    const [hasVerticalScrollbarRef, wrapperHasVerticalScrollbar] = useElementHasVerticalScrollbar();

    const focusManager = useFocusManager(focusScope);

    useTrapFocus(focusManager);

    const restoreFocusProps = useRestoreFocus(focusScope);

    useAutoFocusChild(focusManager, {
        canFocus: useCallback((element: HTMLElement) => {
            // Do not autofocus the dialog itself.
            if (element === dialogRef.current) {
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

            if (!isElementInViewport(element)) {
                return false;
            }

            return true;
        }, [dialogRef, dismissButtonRef]),
        onNotFound: useEventCallback(() => {
            dialogRef.current?.focus();
        })
    });

    const focusRingProps = useOverlayFocusRing({ focus });

    const handleDismissButtonClick = useEventCallback((event: MouseEvent) => {
        if (!isNil(close)) {
            close(event);
        }
    });

    const dialogId = useId(id, "o-ui-dialog");

    const { image, illustration, header, heading, content, footer, button, "button-group": buttonGroup } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        image: null,
        illustration: {
            orientation: "vertical",
            className: "o-ui-dialog-illustration"
        },
        heading: {
            id: `${dialogId}-heading`,
            className: "o-ui-dialog-heading",
            size: "sm",
            as: "h3"
        },
        header: {
            className: "o-ui-dialog-header",
            as: "header"
        },
        content: {
            className: "o-ui-dialog-content",
            as: Text
        },
        footer: {
            className: "o-ui-dialog-footer",
            as: "footer"
        },
        button: {
            className: "o-ui-dialog-button"
        },
        "button-group": {
            className: "o-ui-dialog-button-group"
        }
    }), [dialogId]));

    const headingId = heading?.props?.id;

    const imageMarkup = image && (
        <Box className="o-ui-dialog-image">
            {image}
        </Box>
    );

    const headerMarkup = isString(header?.props?.children)
        ? cloneElement(header, { children: <Text>{header?.props?.children}</Text> })
        : header;

    const footerMarkup = isString(footer?.props?.children)
        ? cloneElement(footer, { children: <Text>{footer?.props?.children}</Text> })
        : footer;

    const dismissButtonMarkup = dismissable && (
        <CrossButton
            onClick={handleDismissButtonClick}
            condensed
            size="xs"
            className="o-ui-dialog-dismiss-button"
            aria-label="Dismiss"
            ref={dismissButtonRef}
        />
    );

    const headerSectionMarkup = (!isNil(heading) || !isNil(headerMarkup)) && (
        <Box className="o-ui-dialog-header-section">
            {heading}
            {headerMarkup}
        </Box>
    );

    const footerSectionMarkup = (!isNil(footerMarkup) || !isNil(button) || !isNil(buttonGroup)) && (
        <Box className="o-ui-dialog-footer-section">
            {footerMarkup}
            {button}
            {buttonGroup}
        </Box>
    );

    return (
        <>
            <Underlay zIndex={zIndex} />
            <Box
                {...mergeProps<any>(
                    wrapperProps ?? {},
                    {
                        className: cssModule(
                            "o-ui-dialog-wrapper",
                            wrapperHasVerticalScrollbar && "scrolling"
                        ),
                        style: {
                            zIndex: zIndex + 1
                        },
                        ref: useMergedRefs(wrapperRef, hasVerticalScrollbarRef)
                    }
                )}
            >
                <Box
                    {...mergeProps(
                        rest,
                        {
                            id: dialogId,
                            className: cssModule(
                                "o-ui-dialog",
                                size === "fullscreen" ? size : normalizeSize(size),
                                focus && "focus"
                            ),
                            tabIndex: -1,
                            role,
                            "aria-modal": true,
                            "aria-label": ariaLabel,
                            "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy ?? headingId : undefined,
                            as,
                            ref: dialogRef
                        },
                        focusRingProps,
                        restoreFocusProps
                    )}
                >
                    {dismissButtonMarkup}
                    {imageMarkup}
                    {illustration}
                    <Box className="o-ui-dialog-aside">
                        {headerSectionMarkup}
                        {content}
                        {footerSectionMarkup}
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export const Dialog = forwardRef<InnerDialogProps>((props, ref) => (
    <InnerDialog {...props} forwardedRef={ref} />
));

export type DialogProps = ComponentProps<typeof Dialog>;
