import { cssModule } from "../../shared";

interface UseOverlayFocusRingProps {
    focus?: boolean;
}

export function useOverlayFocusRing({ focus }: UseOverlayFocusRingProps = {}) {
    return {
        className: cssModule(
            "o-ui-overlay-focus-ring",
            focus && "focus"
        )
    };
}
