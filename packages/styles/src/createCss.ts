import { ColorSchemes, OrbitTheme } from "./themes";
import { Entry, JsonObject, JsonValue } from "type-fest";
import { isArray, isNil, isNumber, isString } from "./assertions";

// TODO: Rename to createThemeVars?

type VarsBucket = string[];

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

function appendString(name: string, value: string, prefix: string, bucket: VarsBucket) {
    bucket.push(`${normalizeName(`${name}`, prefix)}: ${interpolateValue(value.replace(/\s+/gm, " ").trim())};`);
}

function appendNumber(name: string, value: number, prefix: string, bucket: VarsBucket) {
    bucket.push(`${normalizeName(`${name}`, prefix)}: ${value};`);
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
    element.innerText = `#o-ui.${scope} { ${bucket.join(" ")} }`;

    document.head.appendChild(element);
}

export function createCss(themes: OrbitTheme[]) {
    themes.forEach(theme => {
        const common: VarsBucket = [];
        const light: VarsBucket = [];
        const dark: VarsBucket = [];

        appendArray(theme.space, "space", common);
        appendJsonObject((theme.fontSizes as unknown) as JsonObject, "font-sizes", common);
        appendArray(theme.lineHeights, "line-heights", common);
        appendArray(theme.borderRadii, "border-radii", common);
        appendColorSchemes(theme.boxShadows, "box-shadows", { common, dark, light });
        appendColorSchemes(theme.colors, null, { common, dark, light });

        renderBucket(theme.name, common);
        renderBucket(`${theme.name}-light`, light);
        renderBucket(`${theme.name}-dark`, dark);
    });
}
