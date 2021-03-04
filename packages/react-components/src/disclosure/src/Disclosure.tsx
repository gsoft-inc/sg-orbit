import "./Disclosure.css";

import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, SyntheticEvent, useCallback } from "react";
import { DisclosureContext } from "./DisclosureContext";
import { Keys, augmentElement, cssModule, forwardRef, mergeProps, resolveChildren, useControllableState, useEventCallback, useId, useMergedRefs } from "../../shared";
import { Text } from "../../text";
import { isNil } from "lodash";
import { useSlidingTransition } from "./useSlidingTransition";

export interface InnerDisclosureProps {
    /**
    * @ignore
     */
    id?: string;
    /**
     * A controlled open value.
     */
    open?: boolean;
    /**
     * The initial value of `open` when uncontrolled.
     */
    defaultOpen?: boolean;
    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {bool} isOpen - Whether or not the content is visible.
     * @returns {void}
     */
    onChange?(event: SyntheticEvent, isOpen: boolean): void;
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
    forwardedRef: ForwardedRef<any>
}


export function InnerDisclosure({
    id,
    open,
    defaultOpen,
    onChange,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerDisclosureProps) {
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, false);

    const contentRef = useMergedRefs(forwardedRef);

    const [trigger, content] = Children.toArray(resolveChildren(children, {
        isOpen
    })) as ReactElement[];

    if (isNil(trigger) || isNil(content)) {
        throw new Error("A disclosure component must have a trigger and a content element.");
    }

    const toggle = useCallback(event => {
        setIsOpen(!isOpen);

        if (!isNil(onChange)) {
            onChange(event, !isOpen);
        }
    }, [isOpen, setIsOpen, onChange]);

    const handleClick = useEventCallback(event => {
        event.preventDefault();

        toggle(event);
    });

    const handleKeyDown = useEventCallback(event => {
        switch (event.key) {
            case Keys.enter:
            case Keys.space:
                event.preventDefault();
                toggle(event);
                break;
        }
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback(event => {
        if (event.key === Keys.space) {
            event.preventDefault();
        }
    });

    const rootId = useId(id, id ? undefined : "o-ui-disclosure");
    const contentId = `${rootId}-content`;

    const triggerMarkup = augmentElement(trigger, {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        onKeyUp: handleKeyUp,
        "aria-expanded": isOpen,
        "aria-controls": contentId
    });

    const contentMarkup = augmentElement(content, {
        id: contentId,
        className: "o-ui-disclosure-content-inner",
        "aria-hidden": !isOpen
    });

    const { transitionClasses, transitionProps } = useSlidingTransition(isOpen, contentRef);

    return (
        <DisclosureContext.Provider
            value={{
                isOpen
            }}
        >
            {triggerMarkup}
            <Text
                {...mergeProps(
                    rest,
                    {
                        className: cssModule("o-ui-disclosure-content", transitionClasses),
                        role: "presentation",
                        as,
                        ref: contentRef
                    },
                    transitionProps
                )}
            >
                {contentMarkup}
            </Text>
        </DisclosureContext.Provider>
    );
}

export const Disclosure = forwardRef<InnerDisclosureProps>((props, ref) => (
    <InnerDisclosure {...props} forwardedRef={ref} />
));

export type DisclosureProps = ComponentProps<typeof Disclosure>

Disclosure.displayName = "Disclosure";
