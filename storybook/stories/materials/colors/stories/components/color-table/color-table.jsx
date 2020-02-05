import { Table } from "@blocks";
import { arrayOf, shape, string } from "prop-types";

import styles from "./color-table.module.css";

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
        { value: variable, className: "code f7 o-90" },
        { value: hexa, className: "code f7 o-90" },
        { className: "h8", style: { backgroundColor: hexa } }
    ];
}

export function ColorTable({ colors }) {
    return (
        <Table
            columns={[
                { title: "Shade", className: styles.shade },
                { title: "Variable", className: styles.variable },
                { title: "Hexa", className: styles.hexa },
                { title: "" }
            ]}
            rows={colors.map(x => toRowValues(x))}
            rowClassName="h8"
        />
    );
}

ColorTable.propTypes = propTypes;
