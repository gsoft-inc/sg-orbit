/* eslint-disable react/no-array-index-key */

import styles from "./table.module.css";

import { any, arrayOf, bool, object, oneOfType, shape, string } from "prop-types";
import { components } from "@storybook/components/html";
import { isElement } from "react-is";
import { isNil } from "lodash";
import { isString } from "lodash";
import { mergeClasses } from "@orbit-ui/react-components-shared/src";

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
    rowClassName: string,
    fluid: bool
};

const defaultProps = {
    fluid: true
};

function TableRaw({ fluid, className, children, ...rest }) {
    const classes = mergeClasses(
        fluid && styles.fluid,
        className
    );

    return (
        <MdxTable className={classes} {...rest}>
            {children}
        </MdxTable>
    );
}

export function Table({ columns, rows, rowClassName, fluid }) {
    const renderValue = (value, key) => {
        if (isString(value) || isElement(value)) {
            return <td className={rowClassName} key={key}>{value}</td>;
        }

        const classes = mergeClasses(
            rowClassName,
            !isNil(value) && value.className
        );

        return <td className={classes} style={value.style} key={key}>{value.value}</td>;
    };

    return (
        <TableRaw fluid={fluid}>
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
        </TableRaw>
    );
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

Table.Raw = TableRaw;
