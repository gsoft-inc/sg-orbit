import { arrayOf, shape, string } from "prop-types";

import { Div } from "@components/html";
import { Table } from "@stories/components";

const propTypes = {
    colors: arrayOf(shape({
        value: string.isRequired,
        variable: string.isRequired,
        color: string.isRequired
    })).isRequired
};

function toRowValues({ value, variable, color }) {
    return [
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
                { title: "Prop Value", headerStyle: { width: "150px" }, rowClassName: "code" },
                { title: "CSS Variable", headerStyle: { width: "200px" }, rowClassName: "code" },
                { title: "Color Code", headerStyle: { width: "275px" }, rowClassName: "code" },
                { title: "", headerStyle: { width: "300px" } }
            ]}
            rows={colors.map(x => toRowValues(x))}
        />
    );
}

ColorPaletteTable.propTypes = propTypes;
