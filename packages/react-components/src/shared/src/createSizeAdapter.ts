import { normalizeSize } from "./normalizeSize";
import type { Size } from "./size";

export type SizeAdapter = Record<Size, Size>;

export function createSizeAdapter(adapter: SizeAdapter) {
    return (size: Size) => adapter[normalizeSize(size)];
}

export function adaptSize(size: Size, adapter: SizeAdapter) {
    return adapter[normalizeSize(size)];
}
