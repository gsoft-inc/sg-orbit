import "./Modal.css";

import {
    AriaLabelingProps,
    DomProps,
    cssModule,
    forwardRef,
    isNil,
    mergeProps,
    useAutoFocus,
    useEventCallback,
    useId,
    useMergedRefs,
    useRefState,
    useResizeObserver,
    useSlots
} from "../../shared";
import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, MouseEvent, ReactNode, Ref, useEffect, useMemo, useState } from "react";
import { Content } from "../../placeholders";
import { CrossButton } from "../../button";
import { Underlay } from "../../overlay";
import { useDialogTriggerContext } from "./DialogTriggerContext";

export interface InnerModalProps extends DomProps, AriaLabelingProps {
    /**
     * Whether or not the modal should close on outside interactions.
     */
    dismissable?: boolean;
    /**
     * z-index of the modal.
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

function useElementHasVerticalScrollbar() {
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

export function InnerModal({
    id,
    dismissable,
    zIndex = 1,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    as = "div",
    wrapperProps,
    children,
    forwardedRef,
    ...rest
}: InnerModalProps) {
    const modalRef = useMergedRefs(forwardedRef);

    const { close } = useDialogTriggerContext();

    useHideBodyScrollbar();

    const [wrapperRef, wrapperHasVerticalScrollbar] = useElementHasVerticalScrollbar();

    useAutoFocus(modalRef);

    const handleCloseButtonClick = useEventCallback((event: MouseEvent) => {
        close(event);
    });

    const modalId = useId(id, "o-ui-modal");
    const headingId = `${modalId}-heading`;

    const { heading, content } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Content
        },
        heading: {
            id: headingId,
            className: "o-ui-modal-heading"
        },
        content: {
            className: "o-ui-modal-content"
        }
    }), [headingId]));

    const closeButtonMarkup = dismissable && (
        <CrossButton
            onClick={handleCloseButtonClick}
            condensed
            size="xs"
            className="o-ui-modal-close-button"
            aria-label="Close"
        />
    );

    return (
        <>
            <Underlay zIndex={zIndex} />
            <Box
                {...mergeProps(
                    wrapperProps ?? {},
                    {
                        className: cssModule(
                            "o-ui-modal-wrapper",
                            wrapperHasVerticalScrollbar && "scrolling"
                        ),
                        style: {
                            zIndex: zIndex + 1
                        },
                        as,
                        ref: wrapperRef as Ref<HTMLElement>
                    }
                )}
            >
                <Box
                    {...mergeProps(
                        rest,
                        {
                            className: "o-ui-modal",
                            tabIndex: -1,
                            role: "dialog",
                            "aria-modal": true,
                            "aria-label": ariaLabel,
                            "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy ?? heading?.props?.id : undefined,
                            ref: modalRef
                        }
                    )}
                >
                    {closeButtonMarkup}
                    {heading}
                    {content}
                </Box>
            </Box>
        </>
    );
}

export const Modal = forwardRef<InnerModalProps>((props, ref) => (
    <InnerModal {...props} forwardedRef={ref} />
));

export type ModalProps = ComponentProps<typeof Modal>;

Modal.displayName = "Modal";
