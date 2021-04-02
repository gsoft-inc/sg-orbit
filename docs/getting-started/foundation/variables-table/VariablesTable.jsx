import { Color } from "./Color";
import { Table } from "@stories/components";
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
                { title: "Name", headerStyle: { minWidth: "250px" } },
                { title: "Value", headerStyle: { minWidth: "250px" } }
            ]}
            rows={variables.map(x => toRowValues(x))}
            rowClassName="code f8 o-90"
            className="mt2 mb7"
        />
    );
}

VariablesTable.propTypes = propTypes;
