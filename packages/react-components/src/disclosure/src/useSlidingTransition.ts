import { RefObject, useCallback, useReducer } from "react";
import { isNil, match, useCommittedRef, useDisposables, useIsInitialRender } from "../../shared";
import { useEffect } from "react";

enum ActionType {
    slideDown = "SlideDown",
    slideUp = "SlideUp",
    completeTransition = "CompleteTransition"
}

enum TransitionState {
    transitioning = "Transitioning",
    completed = "Completed"
}

enum SlidingDirection {
    down = "Down",
    up = "Up"
}

interface SlidingTransitionState {
    transitionState: TransitionState;
    direction: SlidingDirection;
}

function reducer(state: SlidingTransitionState, action: ActionType) {
    return match<ActionType, SlidingTransitionState>(action, {
        [ActionType.slideDown]: () => ({
            transitionState: TransitionState.transitioning,
            direction: SlidingDirection.down
        }),
        [ActionType.slideUp]: () => ({
            transitionState: TransitionState.transitioning,
            direction: SlidingDirection.up
        }),
        [ActionType.completeTransition]: () => ({
            transitionState: TransitionState.completed,
            direction: state.direction
        })
    });
}

interface SlidingTransition {
    transitionClasses: string;
    transitionProps: {
        onTransitionEnd?: () => void;
    };
}

// For a better understanding of the techniques behind this animation, read https://css-tricks.com/using-css-transitions-auto-dimensions/#technique-3-javascript
// and have a look at https://github.com/react-bootstrap/react-bootstrap/blob/master/src/Collapse.tsx
export function useSlidingTransition(isOpen: boolean, ref: RefObject<any>): SlidingTransition {
    const [{ transitionState, direction }, dispatch] = useReducer(reducer, {
        transitionState: TransitionState.completed,
        direction: isOpen ? SlidingDirection.down : SlidingDirection.up
    });

    const disposables = useDisposables();

    const slideDown = useCallback(() => { dispatch(ActionType.slideDown); }, [dispatch]);
    const slideUp = useCallback(() => { dispatch(ActionType.slideUp); }, [dispatch]);
    const completeTransition = useCallback(() => { dispatch(ActionType.completeTransition); }, [dispatch]);

    const isInitialRender = useCommittedRef(useIsInitialRender());

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
            [TransitionState.transitioning]: () => {
                match(direction, {
                    [SlidingDirection.down]: () => {
                        disposables.nextFrame(() => {
                            if (!isNil(ref.current)) {
                                ref.current.style.height = "0px";
                                ref.current.style.opacity = "0";

                                disposables.nextFrame(() => {
                                    if (!isNil(ref.current)) {
                                        ref.current.style.height = `${ref.current.scrollHeight}px`;
                                        ref.current.style.opacity = "1";
                                    }
                                });
                            }
                        });
                    },
                    [SlidingDirection.up]: () => {
                        disposables.nextFrame(() => {
                            if (!isNil(ref.current)) {
                                ref.current.style.height = `${ref.current.scrollHeight}px`;

                                disposables.nextFrame(() => {
                                    if (!isNil(ref.current)) {
                                        ref.current.style.height = "0px";
                                        ref.current.style.opacity = "0";
                                    }
                                });
                            }
                        });
                    }
                });
            },
            [TransitionState.completed]: () => {
                disposables.nextFrame(() => {
                    if (!isNil(ref.current)) {
                        ref.current.style.height = null;
                    }
                });
            }
        });
    }, [transitionState, direction, disposables, ref]);

    return match(transitionState, {
        [TransitionState.transitioning]: () => ({
            transitionClasses: direction === SlidingDirection.down ? "expanding o-ui-slide-down" : "collapsing o-ui-slide-up",
            transitionProps: { onTransitionEnd: completeTransition }
        }),
        [TransitionState.completed]: () => ({
            transitionClasses: direction === SlidingDirection.down ? "expanded" : "collapsed",
            transitionProps: {}
        })
    });
}
