import { useId } from "../../shared";

/*
Might want to add behavior here like: showOnKeys && showOnClick ? do we want this because then isVisible is not controlled anymore.
    - Maybe a separated useOverlayTriggerBehavior? Kind of suck
    - Maybe accept an onShow handler? - Sounds better
*/

export function useOverlayTrigger({ isVisible, type }) {
    const overlayId = useId();

    return {
        triggerProps: {
            "aria-haspopup": type,
            "aria-expanded": isVisible,
            "aria-controls": isVisible ? overlayId : null
        },
        overlayProps: {
            id: overlayId
        }
    };
}
