import "./Disclosure.css";

import { Children, ComponentProps, KeyboardEvent, MouseEvent, ReactElement, ReactNode, SyntheticEvent, forwardRef, useCallback } from "react";
import { DisclosureContext } from "./DisclosureContext";
import { InternalProps, Keys, OmitForwardedRefProp, augmentElement, cssModule, isNil, mergeProps, resolveChildren, useControllableState, useEventCallback, useId, useMergedRefs } from "../../shared";
import { Text } from "../../typography";
import { useSlidingTransition } from "./useSlidingTransition";

const DefaultElement = "div";

export interface InnerDisclosureProps extends InternalProps, Omit<ComponentProps<typeof DefaultElement>, "color"> {
    /**
     * A controlled open value.
     */
    open?: boolean | null;
    /**
     * The initial value of `open` when uncontrolled.
     */
    defaultOpen?: boolean;
    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {bool} isOpen - Whether or not the content is visible.
     * @returns {void}
     */
    onOpenChange?: (event: SyntheticEvent, isOpen: boolean) => void;
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerDisclosure({
    id,
    open,
    defaultOpen,
    onOpenChange,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerDisclosureProps) {
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, false);

    const contentRef = useMergedRefs(forwardedRef);

    const toggle = useCallback((event: SyntheticEvent) => {
        setIsOpen(!isOpen);

        if (!isNil(onOpenChange)) {
            onOpenChange(event, !isOpen);
        }
    }, [isOpen, setIsOpen, onOpenChange]);

    const close = useCallback((event: SyntheticEvent) => {
        if (isOpen) {
            toggle(event);
        }
    }, [isOpen, toggle]);

    const [trigger, content] = Children.toArray(resolveChildren(children, { close })) as ReactElement[];

    if (isNil(trigger) || isNil(content)) {
        throw new Error("A disclosure component must have a trigger and a content element.");
    }

    const handleClick = useEventCallback((event: MouseEvent) => {
        event.preventDefault();

        toggle(event);
    });

    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        switch (event.key) {
            case Keys.enter:
            case Keys.space:
                event.preventDefault();
                toggle(event);
                break;
        }
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.space) {
            event.preventDefault();
        }
    });

    const rootId = useId(id, "o-ui-disclosure");
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
                isOpen,
                close
            }}
        >
            {triggerMarkup}
            <Text
                {...mergeProps(
                    rest,
                    {
                        id: rootId,
                        className: cssModule("o-ui-disclosure-content", transitionClasses),
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

export const Disclosure = forwardRef<any, OmitForwardedRefProp<InnerDisclosureProps>>((props, ref) => (
    <InnerDisclosure {...props} forwardedRef={ref} />
));

export type DisclosureProps = ComponentProps<typeof Disclosure>;

Disclosure.displayName = "Disclosure";
