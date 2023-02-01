import { Table, Link } from "@stories/components";
import { array, arrayOf } from "prop-types";

const propTypes = {
    rows: arrayOf(array).isRequired
};

const ScaleLinks = {
    "box-shadow-scale": <Link href="?path=/docs/tokens--page#box-shadows">1..4 / alias</Link>,
    "color-scale": <Link href="?path=/docs/tokens--page#background-colors">[color]-[1..10] / alias</Link>,
    "sizing-scale": <Link href="?path=/docs/tokens--page#sizings">1..18</Link>,
    "spacing-scale": <Link href="?path=/docs/tokens--page#spacings">1..13</Link>
};

function toScaleLink(scale) {
    return ScaleLinks[scale] ?? scale;
}

function toRowValues([propName, cssProperty, themeKey, scale, supports]) {
    return [
        propName,
        cssProperty,
        themeKey,
        toScaleLink(scale),
        supports
    ];
}

export function PropsReferenceTable({ rows }) {
    return (
        <Table
            columns={[
                { title: "Prop", headerStyle: { width: "12.5rem" }, rowClassName: "code" },
                { title: "CSS property", headerStyle: { width: "15.625rem" }, rowClassName: "code" },
                { title: "Theme key", headerStyle: { width: "7.8125rem" }, rowClassName: "code" },
                { title: "Scale", headerStyle: { width: "12.5rem" }, rowClassName: "code" },
                { title: "Supports", headerStyle: { width: "18.75rem" }, rowClassName: "code" }
            ]}
            rows={rows.map(x => toRowValues(x))}
        />
    );
}

PropsReferenceTable.propTypes = propTypes;
