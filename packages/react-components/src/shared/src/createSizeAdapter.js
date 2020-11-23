import { normalizeSize } from "./normalizeSize";

export function createSizeAdapter(adapter) {
    return size => adapter[normalizeSize(size)];
}

export function adaptSize(size, adapter) {
    return adapter[normalizeSize(size)];
}
