import "./Dialog.css";

import {
    AriaLabelingProps,
    DomProps,
    MergedRef,
    cssModule,
    forwardRef,
    isNil,
    isNumber,
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
import { Text } from "../../text";
import { Underlay, useRestoreFocus, useTrapFocus } from "../../overlay";
import { useDialogTriggerContext } from "./DialogTriggerContext";

export interface InnerDialogProps extends DomProps, AriaLabelingProps {
    /**
     * A dialog can vary in size.
     */
    size?: "sm" | "md" | "lg" | "fullscreen";
    /**
     * Whether or not the dialog should close on outside interactions.
     */
    dismissable?: boolean;
    /**
     * Whether or not the dialog should autoFocus an element on render.
     */
    autoFocus?: boolean | number;
    /**
     * z-index of the dialog.
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

export function InnerDialog({
    id,
    size,
    dismissable = true,
    autoFocus,
    zIndex = 1,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    wrapperProps,
    as = "div",
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

    const restoreFocusProps = useRestoreFocus(focusScope);
    const focusManager = useFocusManager(focusScope);

    useAutoFocusChild(focusManager, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        canFocus: useCallback((element: HTMLElement) => {
            return element !== dialogRef.current && element !== dismissButtonRef.current;
        }, [dialogRef, dismissButtonRef]),
        onNotFound: useEventCallback(() => {
            dialogRef.current?.focus();
        })
    });

    useTrapFocus(focusManager);

    const handleCloseButtonClick = useEventCallback((event: MouseEvent) => {
        close(event);
    });

    const dialogId = useId(id, "o-ui-dialog");
    const headingId = `${dialogId}-heading`;

    const { illustration, header, heading, content, footer, button, "button-group": buttonGroup } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        illustration: {
            orientation: "vertical",
            className: "o-ui-dialog-illustration"
        },
        heading: {
            id: headingId,
            className: "o-ui-dialog-heading",
            as: "h3"
        },
        header: {
            className: "o-ui-dialog-header",
            as: "header"
        },
        content: {
            className: "o-ui-dialog-content"
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
    }), [headingId]));

    const headerMarkup = isString(header?.props?.children)
        ? cloneElement(header, { children: <Text>{header?.props?.children}</Text> })
        : header;

    const footerMarkup = isString(footer?.props?.children)
        ? cloneElement(footer, { children: <Text>{footer?.props?.children}</Text> })
        : footer;

    const closeButtonMarkup = dismissable && (
        <CrossButton
            onClick={handleCloseButtonClick}
            condensed
            size="xs"
            className="o-ui-dialog-close-button"
            aria-label="Close"
            ref={dismissButtonRef}
        />
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
                        as,
                        ref: useMergedRefs(wrapperRef, hasVerticalScrollbarRef)
                    }
                )}
            >
                <Box
                    {...mergeProps(
                        rest,
                        {
                            className: cssModule(
                                "o-ui-dialog",
                                size === "fullscreen" ? size : normalizeSize(size)
                            ),
                            tabIndex: -1,
                            role: "dialog",
                            "aria-modal": true,
                            "aria-label": ariaLabel,
                            "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy ?? heading?.props?.id : undefined,
                            ref: dialogRef
                        },
                        restoreFocusProps
                    )}
                >
                    {closeButtonMarkup}
                    {illustration}
                    <div className="o-ui-dialog-aside">
                        {heading}
                        {headerMarkup}
                        {content}
                        {footerMarkup}
                        {button}
                        {buttonGroup}

                    </div>
                </Box>
            </Box>
        </>
    );
}

export const Dialog = forwardRef<InnerDialogProps>((props, ref) => (
    <InnerDialog {...props} forwardedRef={ref} />
));

export type DialogProps = ComponentProps<typeof Dialog>;

Dialog.displayName = "Dialog";
