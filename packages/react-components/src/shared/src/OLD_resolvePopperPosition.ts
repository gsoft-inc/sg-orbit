export function resolvePopperPosition(upward: boolean, direction: "left" | "right") {
    return `${upward ? "top" : "bottom"}-${direction === "left" ? "end" : "start"}`;
}
