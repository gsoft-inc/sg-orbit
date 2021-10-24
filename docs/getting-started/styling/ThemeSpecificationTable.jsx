import { Table, Link } from "@stories/components";
import { array, arrayOf } from "prop-types";

const propTypes = {
    rows: arrayOf(array).isRequired
};

const ScaleLinks = {
    "box-shadow-scale": <Link href="?path=/story/shadows--page">1..4 / alias</Link>,
    "color-scale": <Link href="?path=/story/colors--page">[color]-[1..10] / alias</Link>,
    "sizing-scale": <Link href="?path=/story/sizing--page">1..18</Link>,
    "spacing-scale": <Link href="?path=/story/sizing--page">1..13</Link>,
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
                { title: "CSS properties", headerStyle: { width: "650px" }, rowClassName: "code"},
                { title: "Scale", headerStyle: { width: "200px" }, rowClassName: "code"}
            ]}
            rows={rows.map(x => toRowValues(x))}
        />
    );
}

ThemeSpecificationTable.propTypes = propTypes;
