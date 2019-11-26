function createBrand(id, displayName) {
    return {
        id,
        displayName
    };
}

export const BRANDS = {
    apricot: createBrand("apricot", "Apricot"),
    overcast: createBrand("overcast", "Overcast"),
    desktop: createBrand("desktop", "Desktop")
};

export const COLORS_WEIGHT = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

export function getPrimaryColorVariableName(colorWeight) {
    return `--primary-${colorWeight}`;
}

export function getBrandColorVariableName(brand, colorWeight) {
    return `--${brand}-${colorWeight}`;
}
