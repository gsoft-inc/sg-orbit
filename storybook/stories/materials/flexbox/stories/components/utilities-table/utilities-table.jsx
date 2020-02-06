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
        <><span className="code f7 fw6">{name}</span><br />{description}</>,
        example
    ];
}

export function UtilitiesTable({ utilities }) {
    return (
        <Table
            columns={[
                "Class",
                { title: "", headerStyle: { width: "550px" } }
            ]}
            rows={utilities.map(x => toRowValues(x))}
            rowClassName="h13"
            fluid
        />
    );
}

UtilitiesTable.propTypes = propTypes;
