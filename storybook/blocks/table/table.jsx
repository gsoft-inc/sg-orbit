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
    headerClassName: string,
    rowClassName: string
};

const ROW_VALUE_SHAPE = {
    value: any,
    className: string,
    style: object
};

const propTypes = {
    columns: arrayOf(shape(COLUMN_SHAPE)).isRequired,
    rows: arrayOf(arrayOf(oneOfType([any, shape(ROW_VALUE_SHAPE)]))).isRequired,
    // TODO: Can I remove this one in favor of the "rowClassName" in column?
    rowClassName: string,
    fluid: bool
};

const defaultProps = {
    fluid: false
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
    const renderValue = (value, index) => {
        const defaultClasses = mergeClasses(
            styles.row,
            rowClassName
        );

        if (isString(value) || isElement(value)) {
            return <td className={defaultClasses} key={index}>{value}</td>;
        }

        const extraClasses = mergeClasses(
            defaultClasses,
            !isNil(value) && value.className
        );

        return <td className={extraClasses} style={value.style} key={index}>{value.value}</td>;
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
