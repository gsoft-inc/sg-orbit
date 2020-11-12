import "./Disclosure.css";

import { Children, forwardRef, useCallback, useReducer, useRef } from "react";
import { DisclosureProvider } from "./DisclosureContext";
import { KEYS, augmentElement, mergeClasses, resolveChildren, useControllableState, useEventCallback, useId, useIsInitialRender } from "../../shared";
import { any, bool, func } from "prop-types";
import { cssModule } from "../../../dist";
import { isNil } from "lodash";
import { useEffect } from "react";

/*
I don't think the current animation code would work for controlled mode.
*/

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

const ActionType = {
    slideDown: "SlideDown",
    slideUp: "SlideUp",
    completeTransition: "CompleteTransition"
};

const TransitionState = {
    transitioning: "Transitioning",
    completed: "Completed"
};

const SlidingDirection = {
    down: "Down",
    up: "Up"
};

function slidingReducer(state, action) {
    if (action === ActionType.completeTransition) {
        return { transitionState: TransitionState.completed, direction: state.direction };
    }

    // if (state.transitionState === TransitionState.transitioning) {
    //     return state;
    // }

    switch (action) {
        case ActionType.slideDown: {
            return { transitionState: TransitionState.transitioning, direction: SlidingDirection.down };
        }
        case ActionType.slideUp: {
            return { transitionState: TransitionState.transitioning, direction: SlidingDirection.up };
        }
        default: {
            throw new Error(`Unhandled sliding transition action type: ${action}`);
        }
    }
}

/*
TODO:
- No transition on initial render. -> skip dispatch?

- When it works trying again with the first kindof solution using ".o-ui-slide-down" & ".o-ui-slide-up"
*/
function useSlidingTransition(isOpen, ref) {
    const [{ transitionState, direction }, dispatch] = useReducer(slidingReducer, {
        transitionState: TransitionState.completed,
        direction: isOpen ? SlidingDirection.down : SlidingDirection.up
    });

    const isInitialRender = useRef();

    const slideDown = useCallback(() => { dispatch(ActionType.slideDown); }, [dispatch]);
    const slideUp = useCallback(() => { dispatch(ActionType.slideUp); }, [dispatch]);
    const completeTransition = useCallback(() => { dispatch(ActionType.completeTransition); }, [dispatch]);

    isInitialRender.current = useIsInitialRender();

    useEffect(() => {
        if (!isInitialRender.current) {
            if (isOpen) {
                slideDown();
            } else {
                slideUp();
            }
        }
    }, [isOpen, isInitialRender, slideDown, slideUp]);

    useEffect(() => {
        const requestId = requestAnimationFrame(() => {
            if (!isNil(ref.current)) {
                if (transitionState === TransitionState.transitioning && direction === SlidingDirection.down) {
                    ref.current.style.height = `${ref.current.scrollHeight}px`;
                } else {
                    ref.current.style.height = null;
                }
            }
        });

        return () => {
            if (!isNil(requestId)) {
                cancelAnimationFrame(requestId);
            }
        };
    }, [transitionState, direction, ref]);

    switch (transitionState) {
        case TransitionState.transitioning:
            return {
                transitionStyles: direction === SlidingDirection.down ? "expanding o-ui-slide-down" : "collapsing o-ui-slide-up",
                transitionProps: { onAnimationEnd: completeTransition }
            };
        case TransitionState.completed:
            return {
                transitionStyles: direction === SlidingDirection.down ? "expanded" : "collapsed",
                transitionProps: {}
            };
    }
}

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

    const rootId = useId(id, id ? undefined: "o-ui-disclosure");
    const contentId = `${rootId}-content`;

    const triggerMarkup = augmentElement(trigger, {
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        "aria-expanded": isOpen,
        "aria-controls": contentId
    });

    const { transitionStyles, transitionProps } = useSlidingTransition(isOpen, contentRef);

    const contentMarkup = augmentElement(content, {
        ...transitionProps,
        id: contentId,
        className: cssModule("o-ui-disclosure-content", transitionStyles),
        ref: contentRef,
        "aria-hidden": !isOpen
    });

    return (
        <DisclosureProvider
            value={{
                isOpen
            }}
        >
            {triggerMarkup}
            {contentMarkup}
        </DisclosureProvider>
    );
}

InnerDisclosure.propTypes = propTypes;

export const Disclosure = forwardRef((props, ref) => (
    <InnerDisclosure {...props} forwardedRef={ref} />
));
