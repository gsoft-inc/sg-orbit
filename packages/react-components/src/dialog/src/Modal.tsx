import "./Modal.css";

import {
    AriaLabelingProps,
    DomProps,
    augmentElement,
    forwardRef,
    getSlotKey,
    isNil,
    mergeProps,
    useSlots
} from "../../shared";
import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, useMemo } from "react";
import { Content } from "../../placeholders";
import { Dialog } from "./Dialog";

export interface InnerModalProps extends DomProps, AriaLabelingProps {
    /**
     * Whether or not the modal should take almost all the available space.
     */
    fullscreen?: boolean;
    /**
     * Whether or not the modal should close on outside interactions.
     */
    dismissable?: boolean;
    /**
     * The z-index of the modal.
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

function useModalContentMarkup(content: ReactElement) {
    return useMemo(() => {
        const before: ReactNode[] = [];
        const cards: ReactNode[] = [];
        const after: ReactNode[] = [];

        let hasEncounteredCard = false;

        Children.forEach(content.props.children, (x: ReactElement, index) => {
            if (getSlotKey(x) === "card") {
                cards.push(augmentElement(x, {
                    key: index,
                    className: "o-ui-modal-choice"
                }));

                hasEncounteredCard = true;
            } else {
                if (hasEncounteredCard) {
                    after.push(x);
                } else {
                    before.push(x);
                }
            }
        });

        const hasCards = cards.length > 0;

        if (hasCards && cards.length !== 2) {
            throw new Error("A choice modal must have exactly 2 card components.");
        }

        return {
            hasCards,
            contentMarkup: (
                <Content {...content.props}>
                    {before}
                    {!hasCards ? undefined : (
                        <div className="o-ui-modal-choice-container">{cards}</div>
                    )}
                    {after}
                </Content>
            )
        };
    }, [content]);
}

export function InnerModal({
    fullscreen,
    dismissable = true,
    zIndex = 1,
    children,
    forwardedRef,
    ...rest
}: InnerModalProps) {
    const { illustration, header, heading, content, footer, button, "button-group": buttonGroup } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        illustration: null,
        heading: null,
        header: null,
        content: null,
        footer: null,
        button: null,
        "button-group": null
    }), []));

    const { hasCards, contentMarkup } = useModalContentMarkup(content);

    const size = useMemo(() => {
        if (!isNil(illustration)) {
            return "md";
        }

        if (hasCards) {
            return "lg";
        }

        return fullscreen ? "fullscreen" : "sm";
    }, [fullscreen, illustration, hasCards]);

    return (
        <Dialog
            {...mergeProps<any>(
                rest,
                {
                    size,
                    dismissable,
                    zIndex,
                    ref: forwardedRef
                }
            )}
        >
            {illustration}
            {heading}
            {header}
            {contentMarkup}
            {footer}
            {button}
            {buttonGroup}
        </Dialog>
    );
}

export const Modal = forwardRef<InnerModalProps>((props, ref) => (
    <InnerModal {...props} forwardedRef={ref} />
));

export type ModalProps = ComponentProps<typeof Modal>;

Modal.displayName = "Modal";
