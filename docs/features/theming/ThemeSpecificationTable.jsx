import { Link, Table } from "@stories/components";
import { array, arrayOf } from "prop-types";

const propTypes = {
    rows: arrayOf(array).isRequired
};

const ScaleLinks = {
    "box-shadow-scale": <Link href="?path=/docs/tokens--page#box-shadows">1..4 / alias</Link>,
    "color-scale": <Link href="?path=/docs/tokens--page#background-colors">[color]-[1..10] / alias</Link>,
    "sizing-scale": <Link href="?path=/docs/tokens--page#sizings">1..18</Link>,
    "spacing-scale": <Link href="?path=/docs/tokens--page#spacings">1..13</Link>
}

function toScaleLink(scale) {
    return ScaleLinks[scale] ?? scale;
}

function toRowValues([themeKey, cssProperties, scale]) {
    return [
        themeKey,
        cssProperties,
        toScaleLink(scale),
    ];
}

export function ThemeSpecificationTable({ rows, ...rest }) {
    return (
        <Table
            {...rest}
            columns={[
                { title: "Theme key", headerStyle: { width: "150px" }, rowClassName: "code"},
                { title: "CSS properties", headerStyle: { width: "850px" }, rowClassName: "code"},
                { title: "Scale", headerStyle: { width: "200px" }, rowClassName: "code"}
            ]}
            rows={rows.map(x => toRowValues(x))}
        />
    );
}

ThemeSpecificationTable.propTypes = propTypes;
