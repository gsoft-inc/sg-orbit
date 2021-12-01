import { Table } from "@stories/components";
import { Div } from "@components/html";
import { arrayOf, shape, string } from "prop-types";

const propTypes = {
    colors: arrayOf(shape({
        shade: string.isRequired,
        value: string.isRequired,
        variable: string.isRequired,
        color: string.isRequired
    })).isRequired
};

function toRowValues({ shade, value, variable, color }) {
    return [
        shade,
        value,
        variable,
        color,
        <Div backgroundColor={value} height={6}></Div>
    ];
}

export function ColorPaletteTable({ colors }) {
    return (
        <Table
            columns={[
                { title: "Shade", headerStyle: { width: "150px" } },
                { title: "Value", headerStyle: { width: "150px" }, rowClassName: "code f7 o-90" },
                { title: "Variable", headerStyle: { width: "200px" }, rowClassName: "code f7 o-90" },
                { title: "Color Code", headerStyle: { width: "275px" }, rowClassName: "code f7 o-90" },
                { title: "", headerStyle: { width: "300px" } }
            ]}
            rows={colors.map(x => toRowValues(x))}
        />
    );
}

ColorPaletteTable.propTypes = propTypes;