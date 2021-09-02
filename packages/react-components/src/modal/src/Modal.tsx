import "./Modal.css";

import { Children, ComponentProps, ReactElement, ReactNode, forwardRef, useMemo } from "react";
import { Content } from "../../placeholders";
import { Dialog } from "../../dialog";
import {
    InternalProps,
    OmitInternalProps,
    StyledComponentProps,
    StyleProvider,
    augmentElement,
    getSlotKey,
    isNil,
    mergeProps,
    useSlots
} from "../../shared";

const DefaultElement = "section";

export interface InnerModalProps extends InternalProps, Omit<StyledComponentProps<typeof DefaultElement>, "role"> {
    /**
      * React children.
      */
    children: ReactNode;
    /**
     * Whether or not the modal should close on outside interactions.
     */
    dismissable?: boolean;
    /**
     * Whether or not the modal should take almost all the available space.
     */
    fullscreen?: boolean;
    /**
     * The element's unique identifier.
     * @ignore
     */
    id?: string;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Record<string, any>;
    /**
     * The z-index of the modal.
     */
    zIndex?: number;
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
    fullscreen,
    dismissable = true,
    zIndex = 1,
    children,
    forwardedRef,
    as = DefaultElement,
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
                    dismissable,
                    ref: forwardedRef,
                    size,
                    zIndex
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
