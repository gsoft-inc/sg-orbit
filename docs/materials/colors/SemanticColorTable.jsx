import { ShareGateTheme, ThemeProvider } from "@components/styling";
import { arrayOf, func, shape, string } from "prop-types";

import { Div } from "@components/html";
import { DocsContext } from "@storybook/addon-docs";
import { InfoIcon } from "@components/icons";
import { Table } from "@stories/components";
import { Text } from "@components/typography";
import { useContext } from "react";

const propTypes = {
    colors: arrayOf(shape({
        value: string.isRequired,
        variable: string.isRequired,
        itemRenderer: func.isRequired
    })).isRequired
};

function toRowValues({ value, variable, itemRenderer }) {
    return [
        value,
        variable,
        itemRenderer(value),
    ];
}

export function SemanticColorTable({ colors }) {
    const docsContext = useContext(DocsContext);

    return (
        <ThemeProvider theme={ShareGateTheme} colorScheme={docsContext.globals.colorScheme}>
            <Table
                columns={[
                    { title: "Prop Value", headerStyle: { width: "325px" }, rowClassName: "code" },
                    { title: "CSS Variable", headerStyle: { width: "325px" }, rowClassName: "code" },
                    { title: "", headerStyle: { width: "300px" }, rowStyle: { backgroundColor: "var(--o-ui-bg-alias-default)" } },
                ]}
                rows={colors.map(x => toRowValues(x))}
            />
        </ThemeProvider>
    );
}

export function textRenderer(value) {
    return <Div height={6} display="flex" alignItems="center" justifyContent="center"><Text color={value} size="lg">Moon</Text></Div>
}

export function backgroundRenderer(value) {
    return <Div height={6} backgroundColor={value}></Div>
}

export function borderRenderer(value) {
    return <Div height={6} border={value}></Div>
}

export function iconRenderer(value) {
    return <Div height={6} display="flex" alignItems="center" justifyContent="center"><InfoIcon fill={value} size="lg" /></Div>
}

SemanticColorTable.propTypes = propTypes;
