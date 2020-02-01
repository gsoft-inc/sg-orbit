import { Table } from "@blocks";
import { arrayOf, element, shape, string } from "prop-types";

import styles from "./utilities-table.module.css";

const propTypes = {
    utilities: arrayOf(shape({
        name: string.isRequired,
        description: string.isRequired,
        example: element.isRequired
    }))
};

function toRowValues({ name, description, example }) {
    return [
        <><span className="b">{name}</span><br /><span className="i">{description}</span></>,
        example
    ];
}

export function UtilitiesTable({ utilities }) {
    return (
        <Table 
            columns={[
                { title: "Class" },
                { title: "", className: styles.example }
            ]}
            rows={utilities.map(x => toRowValues(x))}
            rowClassName="h13"
        />
    );
}

UtilitiesTable.propTypes = propTypes;