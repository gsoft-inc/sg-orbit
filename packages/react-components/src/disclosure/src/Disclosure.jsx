import "./Disclosure.css";

import { Children, forwardRef, useCallback, useRef } from "react";
import { DisclosureContext } from "./DisclosureContext";
import { KEYS, augmentElement, cssModule, resolveChildren, useControllableState, useEventCallback, useId } from "../../shared";
import { any, bool, func } from "prop-types";
import { isNil } from "lodash";
import { useSlidingTransition } from "./useSlidingTransition";

const propTypes = {
    /**
     * A controlled open value.
     */
    open: bool,
    /**
     * The initial value of `open` when uncontrolled.
     */
    defaultOpen: bool,
    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {bool} isOpen - Whether or not the content is visible.
     * @returns {void}
     */
    onChange: func,
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerDisclosure({
    id,
    open,
    defaultOpen,
    onChange,
    children
}) {
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, false);

    const contentRef = useRef();

    const [trigger, content] = Children.toArray(resolveChildren(children, {
        isOpen
    }));

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
        toggle(event);
    });

    const handleKeyDown = useEventCallback(event => {
        switch(event.keyCode) {
            case KEYS.enter:
            case KEYS.space:
                event.preventDefault();
                toggle(event);
                break;
        }
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback(event => {
        if (event.keyCode === KEYS.space) {
            event.preventDefault();
        }
    });

    const rootId = useId(id, id ? undefined: "o-ui-disclosure");
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
        className: "o-ui-disclosure-content",
        "aria-hidden": !isOpen
    });

    const { transitionStyles, transitionProps } = useSlidingTransition(isOpen, contentRef);

    return (
        <DisclosureContext.Provider
            value={{
                isOpen
            }}
        >
            {triggerMarkup}
            <div
                {...transitionProps}
                className={cssModule("o-ui-disclosure-content-section", transitionStyles)}
                aria-hidden= {!isOpen}
                ref={contentRef}
            >
                {contentMarkup}
            </div>
        </DisclosureContext.Provider>
    );
}

InnerDisclosure.propTypes = propTypes;

export const Disclosure = forwardRef((props, ref) => (
    <InnerDisclosure {...props} forwardedRef={ref} />
));

Disclosure.displayName = "Disclosure";
