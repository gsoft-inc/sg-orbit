import { Table } from "@blocks";
import { arrayOf, element, shape, string } from "prop-types";

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
                { title: "Scale" },
                { title: "Value" },
                { title: "Variable" },
                { title: "" }
            ]}
            rows={utilities.map(x => toRowValues(x))}
            rowClassName="h8"
        />
    );
}

UtilitiesTable.propTypes = propTypes;
