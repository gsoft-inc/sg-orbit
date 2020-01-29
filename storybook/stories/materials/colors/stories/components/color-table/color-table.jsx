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

function toRowValues(color) {
    return [
        color.shade,
        color.variable,
        color.hexa,
        { className: "h8", style: { backgroundColor: color.hexa } }
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
