import "./Modal.css";

import {
    AriaLabelingProps,
    InternalProps,
    OmitInternalProps,
    StyleProvider,
    augmentElement,
    getSlotKey,
    isNil,
    mergeProps,
    useSlots
} from "../../shared";
import { Children, ComponentProps, ReactElement, ReactNode, forwardRef, useMemo } from "react";
import { Content } from "../../placeholders";
import { Dialog } from "../../dialog";

const DefaultElement = "section";

export interface InnerModalProps extends InternalProps, AriaLabelingProps, Omit<ComponentProps<typeof DefaultElement>, "role"> {
    /**
     * The element's unique identifier.
     * @ignore
     */
    id?: string;
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
      * React children.
      */
    children: ReactNode;
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
                    fluid: true,
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
                        <StyleProvider
                            value={{
                                button: {
                                    variant: "outline"
                                }
                            }}
                        >
                            <div className="o-ui-modal-choice-container">{cards}</div>
                        </StyleProvider>
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
    as = DefaultElement,
    ...rest
}: InnerModalProps) {
    const { image, illustration, header, heading, content, footer, button, "button-group": buttonGroup } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        image: null,
        illustration: null,
        heading: null,
        header: null,
        content: {
            className: "o-ui-modal-content"
        },
        footer: null,
        button: null,
        "button-group": null
    }), []));

    const { hasCards, contentMarkup } = useModalContentMarkup(content);

    const size = useMemo(() => {
        if (!isNil(image) || !isNil(illustration)) {
            return "md";
        }

        if (hasCards) {
            return "lg";
        }

        return fullscreen ? "fullscreen" : "sm" as const;
    }, [fullscreen, image, illustration, hasCards]);

    return (
        <Dialog
            {...mergeProps(
                rest,
                {
                    as,
                    size,
                    dismissable,
                    zIndex,
                    ref: forwardedRef
                } as const
            )}
        >
            {image}
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

export const Modal = forwardRef<any, OmitInternalProps<InnerModalProps>>((props, ref) => (
    <InnerModal {...props} forwardedRef={ref} />
));

export type ModalProps = ComponentProps<typeof Modal>;

Modal.displayName = "Modal";
