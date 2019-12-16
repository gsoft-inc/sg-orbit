const COMPONENTS_ROOT = "Components";
const MATERIALS_ROOT = "Materials";
const CHROMATIC_ROOT = "Chromatic";

export function createComponentSection(section) {
    return `${COMPONENTS_ROOT}|${section}`;
}

export function createMaterialSection(section) {
    return `${MATERIALS_ROOT}|${section}`;
}

export function createChromaticSection(section) {
    return `${CHROMATIC_ROOT}|${section}`;
}
