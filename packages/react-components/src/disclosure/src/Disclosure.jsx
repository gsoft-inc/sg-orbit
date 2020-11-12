import "./Disclosure.css";

import { Children, forwardRef, useCallback, useReducer, useRef } from "react";
import { DisclosureProvider } from "./DisclosureContext";
import { KEYS, augmentElement, match, resolveChildren, useControllableState, useDisposables, useEventCallback, useId, useIsInitialRender } from "../../shared";
import { any, bool, func } from "prop-types";
import { cssModule } from "../../../dist";
import { isNil } from "lodash";
import { useEffect } from "react";

// TODO: sortir un Collapse component pour l'anim
// TODO: update dependencies (React, babel / eslint) - don't update storybook

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

const TransitionActionType = {
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
    if (action === TransitionActionType.completeTransition) {
        return { transitionState: TransitionState.completed, direction: state.direction };
    }

    return match(action, {
        [TransitionActionType.slideDown]() {
            return { transitionState: TransitionState.transitioning, direction: SlidingDirection.down };
        },
        [TransitionActionType.slideUp]() {
            return { transitionState: TransitionState.transitioning, direction: SlidingDirection.up };
        }
    });
}

// For a better understanding of the techniques behind this animation, read https://css-tricks.com/using-css-transitions-auto-dimensions/#technique-3-javascript
// and have a look at https://github.com/react-bootstrap/react-bootstrap/blob/master/src/Collapse.tsx
function useSlidingTransition(isOpen, ref) {
    const [{ transitionState, direction }, dispatch] = useReducer(slidingReducer, {
        transitionState: TransitionState.completed,
        direction: isOpen ? SlidingDirection.down : SlidingDirection.up
    });

    const isInitialRender = useRef();
    const disposables = useDisposables();

    const slideDown = useCallback(() => { dispatch(TransitionActionType.slideDown); }, [dispatch]);
    const slideUp = useCallback(() => { dispatch(TransitionActionType.slideUp); }, [dispatch]);
    const completeTransition = useCallback(() => { dispatch(TransitionActionType.completeTransition); }, [dispatch]);

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
        match(transitionState, {
            [TransitionState.transitioning]() {
                match(direction, {
                    [SlidingDirection.down]() {
                        disposables.nextFrame(() => {
                            if (!isNil(ref.current)) {
                                ref.current.style.height = "0px";
                            }

                            disposables.nextFrame(() => {
                                if (!isNil(ref.current)) {
                                    ref.current.style.height = `${ref.current.scrollHeight}px`;
                                }
                            });
                        });
                    },
                    [SlidingDirection.up]() {
                        disposables.nextFrame(() => {
                            if (!isNil(ref.current)) {
                                ref.current.style.height = `${ref.current.scrollHeight}px`;
                            }

                            disposables.nextFrame(() => {
                                if (!isNil(ref.current)) {
                                    ref.current.style.height = "0px";
                                }
                            });
                        });
                    }
                });
            },
            [TransitionState.completed]() {
                disposables.nextFrame(() => {
                    if (!isNil(ref.current)) {
                        ref.current.style.height = null;
                    }
                });
            }
        });
    }, [transitionState, direction, disposables, ref]);

    return match(transitionState, {
        [TransitionState.transitioning]() {
            return {
                transitionStyles: direction === SlidingDirection.down ? "expanding o-ui-slide-down" : "collapsing o-ui-slide-up",
                transitionProps: { onTransitionEnd: completeTransition }
            };
        },
        [TransitionState.completed]() {
            return {
                transitionStyles: direction === SlidingDirection.down ? "expanded" : "collapsed",
                transitionProps: {}
            };
        }
    });
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

    const contentMarkup = augmentElement(content, {
        id: contentId,
        className: "o-ui-disclosure-content",
        "aria-hidden": !isOpen
    });

    const { transitionStyles, transitionProps } = useSlidingTransition(isOpen, contentRef);

    return (
        <DisclosureProvider
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
        </DisclosureProvider>
    );
}

InnerDisclosure.propTypes = propTypes;

export const Disclosure = forwardRef((props, ref) => (
    <InnerDisclosure {...props} forwardedRef={ref} />
));
