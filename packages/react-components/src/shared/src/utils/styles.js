export function mergeClasses(...classes) {
    return classes.filter(Boolean).join(" ");
}
