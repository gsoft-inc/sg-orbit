import "./Dialog.css";

import { Box, BoxProps } from "../../box";
import { ComponentProps, MouseEvent, ReactNode, cloneElement, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CrossButton } from "../../button";
import { HtmlElements } from "../../html";
import {
    InteractionProps,
    InternalProps,
    JsxElement,
    MergedRef,
    OmitInternalProps,
    StyledComponentProps,
    ZindexProp,
    cssModule,
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
import { Text } from "../../typography";
import { Underlay, useOverlayFocusRing, useRestoreFocus, useTrapFocus } from "../../overlay";
import { useDialogTriggerContext } from "./DialogTriggerContext";

export type AbstractDialogProps<T extends JsxElement<T>> = InternalProps & InteractionProps & Omit<StyledComponentProps<T>, "role" | "zIndex"> & {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the dialog should close on outside interactions.
     */
    dismissable?: boolean;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>;
    /**
     * The z-index of the dialog.
     */
    zIndex?: ZindexProp;
};

const DefaultElement = "section";

export interface InnerDialogProps extends AbstractDialogProps<typeof DefaultElement> {
    /**
     * The dialog role.
     */
    role?: "dialog" | "alertdialog";
    /**
     * A dialog can vary in size.
     */
    size?: "sm" | "md" | "lg" | "fullscreen";
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
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    as = HtmlElements[DefaultElement],
    children,
    dismissable = true,
    focus,
    forwardedRef,
    id,
    role = "dialog",
    size,
    wrapperProps,
    zIndex = 1,
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

    const { button, "button-group": buttonGroup, content, footer, header, heading, illustration, image } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        button: {
            className: "o-ui-dialog-button"
        },
        "button-group": {
            className: "o-ui-dialog-button-group"
        },
        content: {
            as: Text,
            className: "o-ui-dialog-content",
            id: `${dialogId}-content`
        },
        footer: {
            as: "footer",
            className: "o-ui-dialog-footer"
        },
        header: {
            as: "header",
            className: "o-ui-dialog-header"
        },
        heading: {
            as: "h3",
            className: "o-ui-dialog-heading",
            id: `${dialogId}-heading`,
            size: "sm"
        },
        illustration: {
            className: "o-ui-dialog-illustration",
            orientation: "vertical"
        },
        image: null
    }), [dialogId]));

    const headingId = heading?.props?.id;

    const contentId = content?.props?.id;

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
            aria-label="Dismiss"
            className="o-ui-dialog-dismiss-button"
            condensed
            onClick={handleDismissButtonClick}
            ref={dismissButtonRef}
            size="xs"
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
                {...mergeProps(
                    wrapperProps ?? {},
                    {
                        className: cssModule(
                            "o-ui-dialog-wrapper",
                            wrapperHasVerticalScrollbar && "scrolling"
                        ),
                        ref: useMergedRefs(wrapperRef, hasVerticalScrollbarRef),
                        zIndex: zIndex + 1
                    }
                )}
            >
                <Box
                    {...mergeProps(
                        rest,
                        {
                            "aria-describedby": !isNil(ariaDescribedBy) ? ariaDescribedBy : contentId ?? undefined,
                            "aria-label": ariaLabel,
                            "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy ?? headingId : undefined,
                            "aria-modal": true,
                            as,
                            className: cssModule(
                                "o-ui-dialog",
                                size === "fullscreen" ? size : normalizeSize(size),
                                focus && "focus"
                            ),
                            id: dialogId,
                            ref: dialogRef,
                            role,
                            tabIndex: -1
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

export const Dialog = forwardRef<any, OmitInternalProps<InnerDialogProps>>((props, ref) => (
    <InnerDialog {...props} forwardedRef={ref} />
));

export type DialogProps = ComponentProps<typeof Dialog>;
