import styles from "./utilities-table.module.css";

import { Table } from "@blocks";
import { arrayOf, element, oneOfType, shape, string } from "prop-types";

const propTypes = {
    utilities: arrayOf(shape({
        name: string.isRequired,
        description: oneOfType([string, element]).isRequired,
        example: element.isRequired
    }))
};

function toRowValues({ name, description, example }) {
    return [
        <><span className="code f7">{name}</span><br /><span className="i">{description}</span></>,
        example
    ];
}

export function UtilitiesTable({ utilities }) {
    return (
        <Table
            columns={[
                { title: "Class" },
                { title: "", headerClassName: styles.example, rowClassName: "" }
            ]}
            rows={utilities.map(x => toRowValues(x))}
            rowClassName="h13"
            fluid
        />
    );
}

UtilitiesTable.propTypes = propTypes;
