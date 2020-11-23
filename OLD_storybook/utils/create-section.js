import { CHROMATIC_ROOT, COMPONENTS_ROOT, GETTING_STARTED_ROOT, MATERIALS_ROOT } from "@shared/roots";

export function createGettingStartedSection(section) {
    return `${GETTING_STARTED_ROOT}|${section}`;
}

export function createComponentSection(section) {
    return `${COMPONENTS_ROOT}|${section}`;
}

export function createMaterialSection(section) {
    return `${MATERIALS_ROOT}|${section}`;
}

export function createChromaticSection(section) {
    return `${CHROMATIC_ROOT}|${section}`;
}
