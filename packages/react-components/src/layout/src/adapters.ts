export type Orientation = "horizontal" | "vertical";
export type Direction = "row" | "column";
export type Alignment = "start" | "end" | "center";

export function useFlexAlignment(orientation: Orientation, align: Alignment, verticalAlign: Alignment) {
    return orientation === "horizontal"
        ? {
            direction: "row" as Direction,
            alignItems: verticalAlign,
            justifyContent: align
        }
        : {
            direction: "column" as Direction,
            alignItems: align,
            justifyContent: verticalAlign
        };
}
