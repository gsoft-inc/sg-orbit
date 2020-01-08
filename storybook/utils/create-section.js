import { CHROMATIC_ROOT, COMPONENTS_ROOT, INTRODUCTION_ROOT, MATERIALS_ROOT } from "@shared/roots";

export function createIntroductionSection(section) {
    return `${INTRODUCTION_ROOT}|${section}`;
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
