import { Table } from "@stories/components";
import { array, arrayOf, shape, string } from "prop-types";

const propTypes = {
    rows: arrayOf(array).isRequired
};

function toRowValues([propName, cssProperty, theming, supports]) {
    return [
        propName,
        cssProperty,
        theming,
        supports,
    ];
}

export function PropsReferenceTable({ rows }) {
    return (
        <Table
            columns={[
                { title: "Prop", headerStyle: { width: "200px" }, rowClassName: "code" },
                { title: "CSS property", headerStyle: { width: "250px" }, rowClassName: "code" },
                { title: "Theming", headerStyle: { width: "200px" }, rowClassName: "code" },
                { title: "Supports", headerStyle: { width: "250px" }, rowClassName: "code" },
            ]}
            rows={rows.map(x => toRowValues(x))}
        />
    );
}

PropsReferenceTable.propTypes = propTypes;
