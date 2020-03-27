export const TOP_LEFT = "top-left";
export const TOP_RIGHT = "top-right";
export const TOP_CENTER = "top-center";
export const BOTTOM_LEFT = "bottom-left";
export const BOTTOM_RIGHT = "bottom-right";
export const BOTTOM_CENTER = "bottom-center";

export const POSITIONS = [TOP_LEFT, TOP_RIGHT, TOP_CENTER, BOTTOM_LEFT, BOTTOM_RIGHT, BOTTOM_CENTER];

export function isLeft(position) {
    return position.includes("left");
}

export function isRight(position) {
    return position.includes("right");
}

export function isCenter(position) {
    return position.includes("center");
}

export function isTop(position) {
    return position.includes("top");
}

export function isBottom(position) {
    return position.includes("bottom");
}
