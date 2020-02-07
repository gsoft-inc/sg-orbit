/* eslint-disable react/no-array-index-key */

import styles from "./table.module.css";

import { ArgumentError, mergeClasses } from "@orbit-ui/react-components-shared/src";
import { any, arrayOf, bool, object, oneOfType, shape, string } from "prop-types";
import { components } from "@storybook/components/html";
import { isElement } from "react-is";
import { isPlainObject, isString } from "lodash";

const MdxTable = components.table;

const COLUMN_SHAPE = {
    title: string.isRequired,
    headerClassName: string,
    headerStyle: object,
    rowClassName: string,
    rowStyle: object
};

const ROW_VALUE_SHAPE = {
    value: any,
    className: string,
    style: object
};

const propTypes = {
    columns: arrayOf(oneOfType([string, shape(COLUMN_SHAPE)])).isRequired,
    rows: arrayOf(arrayOf(oneOfType([any, shape(ROW_VALUE_SHAPE)]))).isRequired,
    headerClassName: string,
    rowClassName: string,
    fluid: bool
};

const defaultProps = {
    fluid: false
};

function ensureRowsValuesMatchColumns(columns, rows) {
    const columnsCount = columns.length;

    rows.forEach((x, index) => {
        if (x.length !== columnsCount) {
            throw new ArgumentError(`Table row with index ${index} have ${x.length} values when there is ${columnsCount} columns defined.`);
        }
    });
}

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

export function Table({ columns, rows, className, headerClassName, rowClassName, fluid }) {
    ensureRowsValuesMatchColumns(columns, rows);

    const renderHeader = (value, index) => {
        const defaultClasses = mergeClasses(
            headerClassName
        );

        if (isString(value)) {
            return <th align="left" className={defaultClasses} key={index}>{value}</th>;
        }

        const extraClasses = mergeClasses(
            defaultClasses,
            value.headerClassName
        );

        return <th align="left" className={extraClasses} style={value.headerStyle} key={index}>{value.title}</th>;
    };

    const renderValue = (value, index) => {
        const defaultClasses = mergeClasses(
            styles.row,
            rowClassName,
            columns[index].rowClassName
        );

        if (isString(value) || isElement(value)) {
            return <td className={defaultClasses} key={index}>{value}</td>;
        }

        const extraClasses = mergeClasses(
            defaultClasses,
            isPlainObject(value) && value.className
        );

        const style = {
            ...(columns[index].rowStyle || {}),
            ...(value.style || {})
        };

        return <td className={extraClasses} style={style} key={index}>{value.value}</td>;
    };

    return (
        <TableRaw fluid={fluid} className={className}>
            <thead>
                <tr>
                    {columns.map((x, index) => renderHeader(x, index))}
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
