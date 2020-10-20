import { normalizeSize } from "./normalizeSize";

export function createSizeAdapter(adapter) {
    return size => adapter[normalizeSize(size)];
}
