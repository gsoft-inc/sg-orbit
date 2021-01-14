import { useId } from "../../shared";

export function useOverlayTrigger(type, { isVisible }) {
    const overlayId = useId(null, "o-ui-overlay");

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
