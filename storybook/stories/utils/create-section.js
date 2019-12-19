import { CHROMATIC_ROOT, COMPONENTS_ROOT, MATERIALS_ROOT } from "../../utils/roots";

export function createComponentSection(section) {
    return `${COMPONENTS_ROOT}|${section}`;
}

export function createMaterialSection(section) {
    return `${MATERIALS_ROOT}|${section}`;
}

export function createChromaticSection(section) {
    return `${CHROMATIC_ROOT}|${section}`;
}
