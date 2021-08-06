import { isArray, isNil, isString, isNumber } from "./assertions";
import { OrbitShadowsColorSchemes, OrbitTheme, OrbitColorSchemes } from "./themes";

type Bucket = string[];

type StringArray = readonly string[];

type NumberArray = readonly number[];

// @ts-ignore: circularly references itself
type ObjectValue = string | number | StringArray | NumberArray | ObjectLiteral;

// @ts-ignore: circularly references itself
type ObjectLiteral = Record<string, ObjectValue>;

function normalizeName(name: string, prefix?: string) {
    return isNil(prefix) ? `--o-ui-${name}` : `--o-ui-${prefix}-${name}`;
}

function interpolateValue(value: string) {
    return value[0] === "$" ? `var(--o-ui-${value.substr(1)})` : value;
}

function augmentPrefix(current: string, newPart: string) {
    return isNil(current) ? newPart : `${current}-${newPart}`;
}

function appendStringValue(name: string, value: string, prefix: string, bucket: Bucket) {
    bucket.push(`${normalizeName(`${name}`, prefix)}: ${interpolateValue(value.replace(/\s+/gm, " ").trim())};`);
}

function appendNumberValue(name: string, value: number, prefix: string, bucket: Bucket) {
    bucket.push(`${normalizeName(`${name}`, prefix)}: ${value};`);
}

function appendStringArray(values: StringArray, prefix: string, bucket: Bucket) {
    values.forEach((x, index) => {
        appendStringValue(`${index + 1}`, x, prefix, bucket);
    });
}

function appendNumberArray(values: NumberArray, prefix: string, bucket: Bucket) {
    values.forEach((x, index) => {
        appendNumberValue(`${index + 1}`, x, prefix, bucket)
    });
}

function appendArray(values: StringArray | NumberArray, prefix: string, bucket: Bucket) {
    if (isString(values[0])) {
        appendStringArray(values as StringArray, prefix, bucket);
    } else {
        appendNumberArray(values as NumberArray, prefix, bucket);
    }
}

function appendObjectValue(name: string, value: ObjectValue, prefix: string, bucket: Bucket) {
    if (isString(value)) {
        appendStringValue(name, value, prefix, bucket);
    } else if (isNumber(value)) {
        appendNumberValue(name, value, prefix, bucket);
    } else if (isArray(value)) {
        appendArray(value as (StringArray | NumberArray), augmentPrefix(prefix, name), bucket);
    } else {
        appendObjectLiteral(value as ObjectLiteral, prefix, bucket);
    }
}

function appendObjectLiteral(values: ObjectLiteral, prefix: string, bucket: Bucket) {
    Object.entries(values).forEach((x) => {
        appendObjectValue(x[0], x[1], prefix, bucket);
    });
}

function appendColorScheme(values: StringArray | NumberArray | ObjectLiteral, prefix: string, bucket: Bucket) {
    if (isArray(values)) {
        appendArray(values as (StringArray | NumberArray), prefix, bucket);
    } else {
        appendObjectLiteral(values, prefix, bucket);
    }
}

function appendColorSchemes(
    values: StringArray | NumberArray | ObjectLiteral | OrbitColorSchemes<any, any, any>,
    prefix: string,
    { common, light, dark }: { common?: Bucket, light: Bucket, dark: Bucket }
) {
    const colorSchemes = values as OrbitShadowsColorSchemes;

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

    appendStringArray(theme.space, "space", common);
    appendObjectLiteral(theme.fontSizes, "font-sizes", common);
    appendNumberArray(theme.fontWeights, "font-weights", common);
    appendNumberArray(theme.lineHeights, "line-heights", common);
    appendStringArray(theme.borderWidths, "border-widths", common);
    appendColorSchemes(theme.shadows, "shadows", { common, light, dark });
    appendObjectLiteral(theme.elevations, "elevations", common);
    appendStringArray(theme.radii, "radii", common);
    appendNumberArray(theme.zIndices, "z-indices", common);
    appendColorSchemes(theme.colors, null, { common, light, dark });

    renderBucket(theme.name, `.o-ui { ${common.join(" ")} }`);
    renderBucket(`${theme.name}-light`, `.o-ui-light { ${light.join(" ")} }`);
    renderBucket(`${theme.name}-dark`, `.o-ui-dark { ${dark.join(" ")} }`);
}
