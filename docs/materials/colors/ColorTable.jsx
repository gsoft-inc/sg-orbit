import { Table } from "@stories/components";
import { arrayOf, shape, string } from "prop-types";

const propTypes = {
    colors: arrayOf(shape({
        shade: string.isRequired,
        variable: string.isRequired,
        color: string.isRequired
    })).isRequired
};

function toRowValues({ shade, variable, color }) {
    return [
        shade,
        variable,
        color,
        { style: { backgroundColor: color } }
    ];
}

export function ColorTable({ colors }) {
    return (
        <Table
            columns={[
                { title: "Shade", headerStyle: { width: "150px" } },
                { title: "Variable", headerStyle: { width: "300px" }, rowClassName: "code f7 o-90" },
                { title: "Color Code", headerStyle: { width: "275px" }, rowClassName: "code f7 o-90" },
                { title: "", headerStyle: { width: "300px" } }
            ]}
            rows={colors.map(x => toRowValues(x))}
        />
    );
}

ColorTable.propTypes = propTypes;
