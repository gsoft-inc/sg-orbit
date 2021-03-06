export type Orientation = "horizontal" | "vertical";
export type Direction = "row" | "column";
export type Alignment = "start" | "end" | "center";

const Direction: Record<Orientation, Direction> = {
    "horizontal": "row",
    "vertical": "column"
};

export function useFlexDirection(orientation: Orientation) {
    return {
        direction: Direction[orientation]
    };
}

export function useFlexAlignment(orientation: Orientation, align: Alignment, verticalAlign: Alignment) {
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
