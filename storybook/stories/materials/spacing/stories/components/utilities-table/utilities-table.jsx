import { Table } from "@blocks";
import { arrayOf, element, shape, string } from "prop-types";

import styles from "./utilities-table.module.css";

const propTypes = {
    utilities: arrayOf(shape({
        scale: string.isRequired,
        value: string.isRequired,
        variable: string.isRequired,
        example: element.isRequired
    }))
};

function toRowValues({ scale, value, variable, example }) {
    return [
        scale,
        { value, className: "code f7 o-90" },
        { value: variable, className: "code f7 o-90" },
        example
    ];
}

export function UtilitiesTable({ utilities }) {
    return (
        <Table
            columns={[
                { title: "Scale", className: styles.scale },
                { title: "Value", className: styles.value },
                { title: "Variable", className: styles.variable },
                { title: "", className: styles.example }
            ]}
            rows={utilities.map(x => toRowValues(x))}
        />
    );
}

UtilitiesTable.propTypes = propTypes;
