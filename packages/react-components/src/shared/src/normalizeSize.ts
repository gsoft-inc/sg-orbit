import type { Size } from "./size"

export function normalizeSize(size?: Size): Size {
    return size || "md";
}
