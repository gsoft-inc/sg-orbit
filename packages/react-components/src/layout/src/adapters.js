const DIRECTION = {
    "horizontal": "row",
    "vertical": "column"
};

export function useFlexDirection(orientation) {
    return {
        direction: DIRECTION[orientation]
    };
}

export function useFlexAlignment(orientation, align, verticalAlign) {
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
