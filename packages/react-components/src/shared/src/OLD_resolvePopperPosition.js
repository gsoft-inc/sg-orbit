export function resolvePopperPosition(upward, direction) {
    return `${upward ? "top" : "bottom"}-${direction === "left" ? "end" : "start"}`;
}
