import { isNil } from "lodash";
import { match, useDisposables, useIsInitialRender } from "../../shared";
import { useCallback, useReducer, useRef } from "react";
import { useEffect } from "react";

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
export function useSlidingTransition(isOpen, ref) {
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

                                disposables.nextFrame(() => {
                                    if (!isNil(ref.current)) {
                                        ref.current.style.height = `${ref.current.scrollHeight}px`;
                                    }
                                });
                            }
                        });
                    },
                    [SlidingDirection.up]() {
                        disposables.nextFrame(() => {
                            if (!isNil(ref.current)) {
                                ref.current.style.height = `${ref.current.scrollHeight}px`;

                                disposables.nextFrame(() => {
                                    if (!isNil(ref.current)) {
                                        ref.current.style.height = "0px";
                                    }
                                });
                            }
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
