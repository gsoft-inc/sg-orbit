export function mergeClasses(...candidates) {
    return candidates.filter(Boolean).join(" ");
}

// Temporary conveninent alias.
export const classes = mergeClasses;
