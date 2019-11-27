export const COLORS_WEIGHT = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

export function getPrimaryColorVariableName(colorWeight) {
    return `--primary-${colorWeight}`;
}

export function getBrandColorVariableName(brandId, colorWeight) {
    return `--${brandId}-${colorWeight}`;
}
