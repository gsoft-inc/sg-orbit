import { useId } from "../../shared";

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
