export function mergeClasses(...candidates) {
    return candidates.filter(Boolean).join(" ");
}
