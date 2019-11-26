const STORAGE_KEY = "SB_BRAND_PICKER_SELECTED_BRAND";

export function saveSelectedBrand(brandId) {
    localStorage.setItem(STORAGE_KEY, brandId);
}

export function loadSelectedBrand() {
    return localStorage.getItem(STORAGE_KEY);
}
