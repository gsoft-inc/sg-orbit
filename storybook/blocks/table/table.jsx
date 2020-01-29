/* eslint-disable react/no-array-index-key */

import { any, arrayOf, object, oneOfType, shape, string } from "prop-types";
import { components } from "@storybook/components/html";
import { isElement } from "react-is";
import { isNil, isString } from "lodash";

const MdxTable = components.table;

const COLUMN_SHAPE = {
    title: string.isRequired,
    className: string
};

const ROW_VALUE_SHAPE = {
    value: any,
    className: string,
    style: object
};

const propTypes = {
    columns: arrayOf(shape(COLUMN_SHAPE)).isRequired,
    rows: arrayOf(arrayOf(oneOfType([any, shape(ROW_VALUE_SHAPE)]))).isRequired,
    rowClassName: string
};


export function Table({ columns, rows, rowClassName }) {
    const renderValue = (value, key) => {
        if (isString(value) || isElement(value)) {
            return <td className={rowClassName} key={key}>{value}</td>;
        }

        let classes = null;

        if (!isNil(rowClassName)) {
            classes = rowClassName;
        }

        if (!isNil(value.className)) {
            classes = !isNil(classes) ? ` ${value.className}` : value.className;
        }

        return <td className={classes} style={value.style} key={key}>{value.value}</td>;
    };

    return (
        <MdxTable>
            <thead>
                <tr>
                    {columns.map(x => <th align="left" className={x.className} key={x.title}>{x.title}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows.map((x, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            {x.map((y, valueIndex) => renderValue(y, valueIndex))}
                        </tr>
                    );
                })}
            </tbody>
        </MdxTable>
    );
}

Table.propTypes = propTypes;

Table.Raw = Table;
