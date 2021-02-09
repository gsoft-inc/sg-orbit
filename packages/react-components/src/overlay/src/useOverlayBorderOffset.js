import { isNil } from "lodash";

function template(offset) {
    return `${offset} solid transparent`;
}

// Hacky offset utility to apply a transparent CSS border to the overlay.
// It's usefull to prevent the overlay from closing when the mouse goes from the trigger to the overlay.
export function useOverlayBorderOffset(position, offset) {
    if (!isNil(position)) {
        if (position.includes("top")) {
            return { borderBottom: template(offset) };
        } else if (position.includes("bottom")) {
            return { borderTop: template(offset) };
        } else if (position.includes("left")) {
            return { borderRight: template(offset) };
        } else if (position.includes("right")) {
            return { borderLeft: template(offset) };
        }
    }

    return {};
}
