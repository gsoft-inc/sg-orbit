export type Size = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "inherit";

export function normalizeSize(size?: Size) {
    return size || "md";
}

export type SizeAdapter = Partial<Record<Size, Size>>;

export function createSizeAdapter(adapter: SizeAdapter) {
    return (size: Size) => adapter[normalizeSize(size)];
}

export function adaptSize(size: Size, adapter: SizeAdapter) {
    return adapter[normalizeSize(size)];
}
