type Orientation = "horizontal" | "vertical";
type Direction = "row" | "column"
type Alignment = "start" | "end" | "center";

const Direction: Record<Orientation, Direction> = {
    "horizontal": "row",
    "vertical": "column"
};

export function useFlexDirection(orientation: Orientation): { direction: Direction } {
    return {
        direction: Direction[orientation]
    };
}

export function useFlexAlignment(orientation: Orientation, align: Alignment, verticalAlign: Alignment): { alignItems: Alignment, justifyContent: Alignment } {
    return orientation === "horizontal"
        ? {
            alignItems: verticalAlign,
            justifyContent: align
        }
        : {
            alignItems: align,
            justifyContent: verticalAlign
        };
}
