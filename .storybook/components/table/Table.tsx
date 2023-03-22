/* eslint-disable react/no-array-index-key */
import { isPlainObject, isString, mergeClasses } from "@components/shared";

import { components } from "@storybook/components";
import { isElement } from "react-is";
import { ComponentProps } from "react";

const MdxTable = components.table;
type MdxTableProps = ComponentProps<typeof MdxTable>;

interface Column {
    title: string;
    headerClassName?: string;
    headerStyle?: object;
    rowClassName?: string;
    rowStyle?: object;
}

interface Row {
    value?: any;
    className?: string;
    style?: object;
}

interface TableProps {
    columns: string[] | Column[];
    rows: any[] | Row[];
    headerClassName?: string;
    rowClassName?: string;
    fluid?: boolean;
}


function ensureRowsValuesMatchColumns(columns, rows) {
    const columnsCount = columns.length;

    rows.forEach((x, index) => {
        if (x.length !== columnsCount) {
            throw new Error(`Table row with index ${index} have ${x.length} values when there is ${columnsCount} columns defined.`);
        }
    });
}

interface TableRawProps extends MdxTableProps {
    fluid?: boolean;
}

function TableRaw({ fluid, className, children, ...rest }: TableRawProps) {
    const classes = mergeClasses(
        fluid && "w-100",
        className
    );

    return (
        <MdxTable className={classes} {...rest}>
            {children}
        </MdxTable>
    );
}

export function Table({ columns, rows, headerClassName, rowClassName, fluid = false, ...rest }: TableProps) {
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
            rowClassName,
            (columns[index] as Column).rowClassName
        );

        if (isString(value) || isElement(value)) {
            return <td className={defaultClasses} style={(columns[index] as Column).rowStyle} key={index}>{value}</td>;
        }

        const extraClasses = mergeClasses(
            defaultClasses,
            isPlainObject(value) && value.className
        );

        const style = {
            ...((columns[index] as Column).rowStyle || {}),
            ...(value.style || {})
        };

        return <td className={extraClasses} style={style} key={index}>{value.value}</td>;
    };

    return (
        <TableRaw fluid={fluid} {...rest}>
            <thead className="thead">
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

Table.Raw = TableRaw;
