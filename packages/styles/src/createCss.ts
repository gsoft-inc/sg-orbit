import { isArray, isNil, isString, isNumber } from "./assertions";
import { OrbitTheme, ColorSchemes } from "./themes";
import { JsonObject, JsonValue, Entry } from "type-fest";

type Bucket = string[];

type StringArray = readonly string[];

type NumberArray = readonly number[];

type Array = StringArray | NumberArray;

function normalizeName(name: string, prefix?: string) {
    return isNil(prefix) ? `--o-ui-${name}` : `--o-ui-${prefix}-${name}`;
}

function augmentPrefix(current: string, newPart: string) {
    return isNil(current) ? newPart : `${current}-${newPart}`;
}

function interpolateValue(value: string) {
    return value[0] === "$" ? `var(--o-ui-${value.substr(1)})` : value;
}

function appendString(name: string, value: string, prefix: string, bucket: Bucket) {
    bucket.push(`${normalizeName(`${name}`, prefix)}: ${interpolateValue(value.replace(/\s+/gm, " ").trim())};`);
}

function appendNumber(name: string, value: number, prefix: string, bucket: Bucket) {
    bucket.push(`${normalizeName(`${name}`, prefix)}: ${value};`);
}

function appendStringArray(values: StringArray, prefix: string, bucket: Bucket) {
    values.forEach((x, index) => {
        appendString(`${index + 1}`, x, prefix, bucket);
    });
}

function appendNumberArray(values: NumberArray, prefix: string, bucket: Bucket) {
    values.forEach((x, index) => {
        appendNumber(`${index + 1}`, x, prefix, bucket)
    });
}

function appendArray(values: Array, prefix: string, bucket: Bucket) {
    if (isString(values[0])) {
        appendStringArray(values as StringArray, prefix, bucket);
    } else {
        appendNumberArray(values as NumberArray, prefix, bucket);
    }
}

function appendJsonValue(name: string, value: JsonValue, prefix: string, bucket: Bucket) {
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

function appendJsonObject(values: JsonObject, prefix: string, bucket: Bucket) {
    Object.entries(values).forEach((x: Entry<JsonObject>) => {
        appendJsonValue(x[0], x[1], prefix, bucket);
    });
}

function appendColorScheme(values: Array | JsonObject, prefix: string, bucket: Bucket) {
    if (isArray(values)) {
        appendArray(values as Array, prefix, bucket);
    } else {
        appendJsonObject(values as JsonObject, prefix, bucket);
    }
}

function appendColorSchemes<C, L, D>(
    values: C | L | D | ColorSchemes<C, L, D>,
    prefix: string,
    { common, light, dark }: { common?: Bucket, light: Bucket, dark: Bucket }
) {
    const colorSchemes = values as ColorSchemes<C, L, D>;

    if (!isNil(colorSchemes.common) || !isNil(colorSchemes.light) || !isNil(colorSchemes.dark)) {
        if (!isNil(colorSchemes.common)) {
            appendColorScheme(colorSchemes.common, prefix, common);
        }

        appendColorScheme(colorSchemes.light, prefix, light);
        appendColorScheme(colorSchemes.dark, prefix, dark);
    } else {
        appendColorScheme(values, prefix, common);
    }
}

function renderBucket(id: string, content: string) {
    const element = document.createElement("style");

    element.setAttribute("id", id);
    element.innerText = content;

    document.head.appendChild(element);
}

export function createCss(theme: OrbitTheme) {
    const common: Bucket = [];
    const light: Bucket = [];
    const dark: Bucket = [];

    appendArray(theme.space, "space", common);
    appendJsonObject(theme.fontSizes, "font-sizes", common);
    appendArray(theme.fontWeights, "font-weights", common);
    appendArray(theme.lineHeights, "line-heights", common);
    appendArray(theme.borderWidths, "border-widths", common);
    appendArray(theme.borderRadii, "border-radii", common);
    appendColorSchemes(theme.boxShadows, "box-shadows", { common, light, dark });
    appendArray(theme.zIndices, "z-indices", common);
    appendColorSchemes(theme.colors, null, { common, light, dark });

    renderBucket(theme.name, `.o-ui { ${common.join(" ")} }`);
    renderBucket(`${theme.name}-light`, `.o-ui-light { ${light.join(" ")} }`);
    renderBucket(`${theme.name}-dark`, `.o-ui-dark { ${dark.join(" ")} }`);
}
