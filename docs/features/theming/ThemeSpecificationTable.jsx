import { Link, Table } from "@stories/components";
import { array, arrayOf } from "prop-types";

const propTypes = {
    rows: arrayOf(array).isRequired
};

const ScaleLinks = {
    "box-shadow-scale": <Link href="?path=/docs/tokens--page#box-shadows">1..2 / alias</Link>,
    "font-sizes-scale": <Link href="?path=/docs/tokens--page#font-sizes">1..11 / alias</Link>,
    "font-weights-scale": <Link href="?path=/docs/tokens--page#font-weights">1..3</Link>,
    "line-heights-scale": <Link href="?path=/docs/tokens--page#line-heights">1..6</Link>,
    "color-scale": <Link href="?path=/docs/tokens--page#background-colors">[color]-[1..10] / alias</Link>,
    "sizing-scale": <Link href="?path=/docs/tokens--page#sizings">1..18</Link>,
    "border-radius-scale": <Link href="?path=/docs/tokens--page#radii">1..4 / alias</Link>,
    "spacing-scale": <Link href="?path=/docs/tokens--page#spacings">1..13</Link>
};

function toScaleLink(scale) {
    return ScaleLinks[scale] ?? scale;
}

function toRowValues([themeKey, cssProperties, scale]) {
    return [
        themeKey,
        cssProperties,
        toScaleLink(scale)
    ];
}

export function ThemeSpecificationTable({ rows, ...rest }) {
    return (
        <Table
            {...rest}
            columns={[
                { title: "Theme key", headerStyle: { width: "9.375rem" }, rowClassName: "code" },
                { title: "CSS properties", headerStyle: { width: "53.125rem" }, rowClassName: "code" },
                { title: "Scale", headerStyle: { width: "12.5rem" }, rowClassName: "code" }
            ]}
            rows={rows.map(x => toRowValues(x))}
        />
    );
}

ThemeSpecificationTable.propTypes = propTypes;
