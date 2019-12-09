import { isNil } from "lodash";
import { useLocalStorage } from "./utils/use-storage";

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
    const [value, setValue] = useLocalStorage(BRAND_STORAGE_KEY, JSON.stringify(DEFAULT_BRAND));

    return [
        JSON.parse(value),
        x => setValue(JSON.stringify(x))
    ];
}




