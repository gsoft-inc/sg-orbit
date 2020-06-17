export function mergeClasses(...values) {
    return values.filter(Boolean).join(" ");
}
