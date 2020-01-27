import { arrayOf, shape, string } from "prop-types";
import { components } from "@storybook/components/html";

import styles from "./color-table.module.css";

const Table = components.table;

const propTypes = {
    colors: arrayOf(shape({
        weight: string.isRequired,
        cssVariable: string.isRequired,
        hexaCode: string.isRequired
    })).isRequired
};

function Color({ weight, cssVariable, hexaCode }) {
    return (
        <tr>
            <td className={styles.weight}>{weight}</td>
            <td>{cssVariable}</td>
            <td className={styles.hexaCode}>{hexaCode}</td>
            <td className={styles.sample} style={{ backgroundColor: hexaCode }}></td>
        </tr>
    );
}

export function ColorTable({ colors }) {
    return (
        <Table>
            <thead>
                <tr>
                    <th align="left">Weight</th>
                    <th align="left">Variable</th>
                    <th align="left">Hexa</th>
                    <th align="left"></th>
                </tr>
            </thead>
            <tbody>
                {colors.map(x => <Color key={x.hexaCode} {...x} />)}
            </tbody>
        </Table>
    );
}

ColorTable.propTypes = propTypes;
