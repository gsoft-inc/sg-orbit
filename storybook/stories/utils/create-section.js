const COMPONENTS_ROOT = "Components";
const MATERIALS_ROOT = "Materials";
const SEMANTIC_UI_THEME = "Semantic UI Theme";

export function createComponentSection(section) {
    return `${COMPONENTS_ROOT}|${section}`;
}

export function createMaterialSection(section) {
    return `${MATERIALS_ROOT}|${section}`;
}

export function createSemanticThemeSection(section) {
    return `${SEMANTIC_UI_THEME}|${section}`;
}
