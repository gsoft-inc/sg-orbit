export type FlexOrientation = "horizontal" | "vertical";
export type FlexDirection = "row" | "column";
export type FlexAlignment = "start" | "end" | "center";

export interface UseFlexAlignmentProps {
    alignX?: FlexAlignment;
    alignY?: FlexAlignment;
    orientation: FlexOrientation;
}

export function useFlexAlignment({ alignX, alignY, orientation }: UseFlexAlignmentProps) {
    return orientation === "horizontal"
        ? {
            alignItems: alignY,
            direction: "row" as FlexDirection,
            justifyContent: alignX
        }
        : {
            alignItems: alignX,
            direction: "column" as FlexDirection,
            justifyContent: alignY
        };
}
