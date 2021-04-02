import "./Modal.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, SyntheticEvent, useEffect, useMemo, useState } from "react";
import { Content } from "../../placeholders";
import { CrossButton } from "../../button";
import { Underlay } from "../../overlay";
import { cssModule, forwardRef, mergeProps, useEventCallback, useId, useRefState, useResizeObserver, useSlots } from "../../shared";
import { isNil } from "lodash";
import { useModalTriggerContext } from "./ModalTriggerContext";

interface InnerModalProps {
    /**
     * @ignore
     */
    id?: string;
    /**
     * Whether or not the modal should close on outside interactions.
     */
    dismissable?: boolean;
    /**
     * @ignore
     */
    "aria-label"?: string;
    /**
     * @ignore
     */
    "aria-labelledby"?: string;
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

function useElementHasVerticalScrollbar(element: HTMLElement) {
    const [hasScrollbar, setHasScrollbar] = useState(false);

    const handleElementResize = useEventCallback(() => {
        setHasScrollbar(element.scrollHeight > element.clientHeight);
    });

    useResizeObserver(element, handleElementResize);

    return hasScrollbar;
}

export function InnerModal({
    id,
    dismissable,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    as = "div",
    wrapperProps,
    children,
    forwardedRef,
    ...rest
}: InnerModalProps) {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement>();

    const { close } = useModalTriggerContext();

    useHideBodyScrollbar();

    const wrapperHasVerticalScrollbar = useElementHasVerticalScrollbar(wrapperElement);

    const handleCloseButtonClick = useEventCallback((event: SyntheticEvent) => {
        close(event);
    });

    const modalId = useId(id, id ? null : "o-ui-modal");
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
            <Underlay />
            <Box
                {...mergeProps(
                    wrapperProps ?? {},
                    {
                        className: cssModule(
                            "o-ui-modal-wrapper",
                            wrapperHasVerticalScrollbar && "scrolling"
                        ),
                        as,
                        "aria-modal": true,
                        "aria-label": ariaLabel,
                        "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy ?? heading?.props?.id : undefined,
                        ref: setWrapperElement
                    }
                )}
            >
                <Box
                    {...mergeProps(
                        rest,
                        {
                            className: "o-ui-modal",
                            role: "dialog",
                            ref: forwardedRef
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
