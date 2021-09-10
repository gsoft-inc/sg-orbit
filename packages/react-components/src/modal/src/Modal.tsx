import "./Modal.css";

import { Children, ComponentProps, ReactElement, ReactNode, forwardRef, useMemo } from "react";
import { Content } from "../../placeholders";
import { Dialog, SharedDialogProps } from "../../dialog";
import { OmitInternalProps, StyleProvider, augmentElement, getSlotKey, isNil, mergeProps, useSlots } from "../../shared";

export interface InnerModalProps extends SharedDialogProps {
    /**
     * Whether or not the dialog should take almost all the available space.
     */
    fullscreen?: boolean;
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
                    className: "o-ui-modal-choice",
                    fluid: true,
                    key: index
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
            ),
            hasCards
        };
    }, [content]);
}

export function InnerModal({
    children,
    dismissable = true,
    forwardedRef,
    fullscreen,
    zIndex = 1,
    ...rest
}: InnerModalProps) {
    const { button, "button-group": buttonGroup, content, footer, header, heading, illustration, image } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        button: null,
        "button-group": null,
        content: {
            className: "o-ui-modal-content"
        },
        footer: null,
        header: null,
        heading: null,
        illustration: null,
        image: null
    }), []));

    const { contentMarkup, hasCards } = useModalContentMarkup(content);

    const size = useMemo(() => {
        if (!isNil(image) || !isNil(illustration)) {
            return "md" as const;
        }

        if (hasCards) {
            return "lg" as const;
        }

        return fullscreen ? "fullscreen" as const : "sm" as const;
    }, [fullscreen, image, illustration, hasCards]);

    return (
        <Dialog
            {...mergeProps(
                rest,
                {
                    dismissable,
                    ref: forwardedRef,
                    size,
                    zIndex
                }
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
