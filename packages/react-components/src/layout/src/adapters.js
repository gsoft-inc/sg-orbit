const DIRECTION = {
    "horizontal": "row",
    "vertical": "column"
};

export function toFlexDirection(orientation) {
    return DIRECTION[orientation];
}
