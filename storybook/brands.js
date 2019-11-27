import { isNil } from "lodash";
import { useLocalStorage } from "react-use-storage";

export const BRAND_STORAGE_KEY = "@orbit/storybook/selected-brand";

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

export const DEFAULT_BRAND = BRANDS.apricot;

export function getCurrentBrand() {
    const brand = localStorage.getItem(BRAND_STORAGE_KEY);

    return !isNil(brand) ? JSON.parse(brand) : DEFAULT_BRAND;
}

export function useStorage() {
    return useLocalStorage(BRAND_STORAGE_KEY, DEFAULT_BRAND);
}




