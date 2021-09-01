export type Orientation = "horizontal" | "vertical";
export type Direction = "row" | "column";
export type Alignment = "start" | "end" | "center";

export interface UseFlexAlignmentProps {
    alignX?: Alignment;
    alignY?: Alignment;
    orientation: Orientation;
}

export function useFlexAlignment({ alignX, alignY, orientation }: UseFlexAlignmentProps) {
    return orientation === "horizontal"
        ? {
            alignItems: alignY,
            direction: "row" as Direction,
            justifyContent: alignX
        }
        : {
            alignItems: alignX,
            direction: "column" as Direction,
            justifyContent: alignY
        };
}
