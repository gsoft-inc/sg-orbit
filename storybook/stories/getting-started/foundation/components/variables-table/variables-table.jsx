import { Color } from "./color";
import { Table } from "@blocks";
import { arrayOf, shape, string } from "prop-types";

const propTypes = {
    variables: arrayOf(shape({
        name: string,
        value: string
    }))
};

function renderValue(value) {
    if (value.startsWith("#")) {
        return <Color value={value} />;
    }

    return value;
}

function toRowValues({ name, value }) {
    return [
        name,
        renderValue(value)
    ];
}

export function VariablesTable({ variables }) {
    return (
        <Table
            columns={[
                { title: "Name" },
                { title: "Value" }
            ]}
            rows={variables.map(x => toRowValues(x))}
            rowClassName="code f7 o-90"
        />
    );
}

VariablesTable.propTypes = propTypes;
