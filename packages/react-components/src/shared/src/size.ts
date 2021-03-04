export type Size = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "inherit";

export function normalizeSize<T extends Size>(size?: T) {
    return size || "md";
}

export type SizeAdapter<T extends Size> = Partial<Record<Size, T>>;

export function createSizeAdapter<T extends Size>(adapter: SizeAdapter<T>) {
    return (size: Size) => adapter[normalizeSize(size)];
}

export function adaptSize<T extends Size>(size: Size, adapter: SizeAdapter<T>) {
    return adapter[normalizeSize(size)];
}
