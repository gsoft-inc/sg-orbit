import { Table } from "@blocks";
import { arrayOf, shape, string } from "prop-types";

const propTypes = {
    colors: arrayOf(shape({
        shade: string.isRequired,
        variable: string.isRequired,
        hexa: string.isRequired
    })).isRequired
};

function toRowValues({ shade, variable, hexa }) {
    return [
        shade,
        variable,
        hexa,
        { style: { backgroundColor: hexa } }
    ];
}

export function ColorTable({ colors }) {
    return (
        <Table
            columns={[
                { title: "Shade", headerStyle: { width: "150px" } },
                { title: "Variable", headerStyle: { width: "200px" }, rowClassName: "code f7 o-90" },
                { title: "Hexa", headerStyle: { width: "200px" }, rowClassName: "code f7 o-90" },
                { title: "", headerStyle: { width: "400px" } }
            ]}
            rows={colors.map(x => toRowValues(x))}
        />
    );
}

ColorTable.propTypes = propTypes;
