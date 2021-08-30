export type Orientation = "horizontal" | "vertical";
export type Direction = "row" | "column";
export type Alignment = "start" | "end" | "center";

export function useFlexAlignment(orientation: Orientation, align: Alignment, verticalAlign: Alignment) {
    return orientation === "horizontal"
        ? {
            alignItems: verticalAlign,
            direction: "row" as Direction,
            justifyContent: align
        }
        : {
            alignItems: align,
            direction: "column" as Direction,
            justifyContent: verticalAlign
        };
}
