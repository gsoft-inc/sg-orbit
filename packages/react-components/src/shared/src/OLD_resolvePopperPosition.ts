export function resolvePopperPosition(upward: boolean, direction: "left" | "right"): string {
    return `${upward ? "top" : "bottom"}-${direction === "left" ? "end" : "start"}`;
}
