import { ColorSchemes, OrbitTheme } from "./themes";
import { Entry, JsonObject, JsonValue } from "type-fest";
import { isArray, isNil, isNumber, isString } from "./assertions";

type VarsBucket = string[];

type StringArray = readonly string[];

type NumberArray = readonly number[];

type Array = StringArray | NumberArray;

export function normalizeVariable(name: string | number, prefix?: string) {
    return isNil(prefix) ? `--o-ui-${name}` : `--o-ui-${prefix}-${name}`;
}

export function getThemeClassName(themeName: string) {
    return `o-ui-${themeName}`;
}

export function getColorSchemeClassName(themeName: string, colorScheme: string) {
    return `o-ui-${themeName}-${colorScheme}`;
}

function augmentPrefix(current: string, newPart: string) {
    return isNil(current) ? newPart : `${current}-${newPart}`;
}

function interpolateValue(value: string) {
    return value[0] === "$" ? `var(--o-ui-${value.substr(1)})` : value;
}

function appendString(name: string, value: string, prefix: string, bucket: VarsBucket) {
    bucket.push(`${normalizeVariable(`${name}`, prefix)}: ${interpolateValue(value.replace(/\s+/gm, " ").trim())};`);
}

function appendNumber(name: string, value: number, prefix: string, bucket: VarsBucket) {
    bucket.push(`${normalizeVariable(`${name}`, prefix)}: ${value};`);
}

function appendStringArray(values: StringArray, prefix: string, bucket: VarsBucket) {
    values.forEach((x, index) => {
        appendString(`${index + 1}`, x, prefix, bucket);
    });
}

function appendNumberArray(values: NumberArray, prefix: string, bucket: VarsBucket) {
    values.forEach((x, index) => {
        appendNumber(`${index + 1}`, x, prefix, bucket);
    });
}

function appendArray(values: Array, prefix: string, bucket: VarsBucket) {
    if (isString(values[0])) {
        appendStringArray(values as StringArray, prefix, bucket);
    } else {
        appendNumberArray(values as NumberArray, prefix, bucket);
    }
}

function appendJsonValue(name: string, value: JsonValue, prefix: string, bucket: VarsBucket) {
    if (isString(value)) {
        appendString(name, value, prefix, bucket);
    } else if (isNumber(value)) {
        appendNumber(name, value, prefix, bucket);
    } else if (isArray(value)) {
        appendArray(value as Array, augmentPrefix(prefix, name), bucket);
    } else {
        appendJsonObject(value as JsonObject, prefix, bucket);
    }
}

function appendJsonObject(values: JsonObject, prefix: string, bucket: VarsBucket) {
    Object.entries(values).forEach((x: Entry<JsonObject>) => {
        appendJsonValue(x[0], x[1], prefix, bucket);
    });
}

function appendColorScheme(values: Array | JsonObject, prefix: string, bucket: VarsBucket) {
    if (isArray(values)) {
        appendArray(values as Array, prefix, bucket);
    } else {
        appendJsonObject(values as JsonObject, prefix, bucket);
    }
}

function appendColorSchemes<C, L, D>(
    values: C | L | D | ColorSchemes<C, L, D>,
    prefix: string,
    { common, dark, light }: { common?: VarsBucket; dark: VarsBucket; light: VarsBucket }
) {
    const colorSchemes = values as ColorSchemes<C, L, D>;

    if (!isNil(colorSchemes.common) || !isNil(colorSchemes.light) || !isNil(colorSchemes.dark)) {
        if (!isNil(colorSchemes.common)) {
            appendColorScheme(colorSchemes.common, prefix, common);
        }

        appendColorScheme(colorSchemes.light, prefix, light);
        appendColorScheme(colorSchemes.dark, prefix, dark);
    }
}

function renderBucket(scope: string, bucket: VarsBucket) {
    const element = document.createElement("style");

    element.setAttribute("id", scope);
    element.innerText = `.o-ui.${scope} { ${bucket.join(" ")} }`;

    document.head.appendChild(element);
}

export const SpacePrefix = "sp";
export const FontSizePrefix = "fs";
export const FontWeightPrefix = "fw";
export const LineHeightPrefix = "lh";
export const BorderRadiusPrefix = "br";
export const BoxShadowPrefix = "bs";
export const ColorPrefix = null;

export function createThemeVars(themes: OrbitTheme[]) {
    themes.forEach(theme => {
        const common: VarsBucket = [];
        const light: VarsBucket = [];
        const dark: VarsBucket = [];

        appendArray(theme.space, SpacePrefix, common);
        appendJsonObject((theme.fontSizes as unknown) as JsonObject, FontSizePrefix, common);
        appendArray(theme.fontWeights, FontWeightPrefix, common);
        appendArray(theme.lineHeights, LineHeightPrefix, common);
        appendArray(theme.borderRadii, BorderRadiusPrefix, common);
        appendColorSchemes(theme.boxShadows, BoxShadowPrefix, { common, dark, light });
        appendColorSchemes(theme.colors, ColorPrefix, { common, dark, light });

        renderBucket(getThemeClassName(theme.name), common);
        renderBucket(getColorSchemeClassName(theme.name, "light"), light);
        renderBucket(getColorSchemeClassName(theme.name, "dark"), dark);
    });
}
