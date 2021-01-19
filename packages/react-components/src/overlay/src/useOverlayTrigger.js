import { useId } from "../../shared";

export function useOverlayTrigger(isOverlayVisible, type) {
    const overlayId = useId(null, "o-ui-overlay");

    return {
        triggerProps: {
            "aria-haspopup": type,
            "aria-expanded": isOverlayVisible,
            "aria-controls": isOverlayVisible ? overlayId : null
        },
        overlayProps: {
            id: overlayId
        }
    };
}
