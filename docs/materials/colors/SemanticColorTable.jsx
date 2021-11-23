import { Table } from "@stories/components";
import { Span, Div } from "@components/html";
import { func, arrayOf, shape, string } from "prop-types";
import { ShareGateTheme, ThemeProvider } from "@components/styling";
import { EmailIcon } from "@components/icons";

const propTypes = {
    colors: arrayOf(shape({
        shade: string.isRequired,
        value: string.isRequired,
        variable: string.isRequired,
        itemRenderer: func.isRequired
    })).isRequired
};

export function SemanticColorTable({ colors }) {

    function toRowValues({ shade, value, variable, usage, itemRenderer }) {
        return [
            shade,
            value,
            variable,
            usage,
            <ThemeProvider theme={ShareGateTheme} colorScheme="light"><Div height={6} backgroundColor="alias-default">{itemRenderer(value)}</Div></ThemeProvider>,
            <ThemeProvider theme={ShareGateTheme} colorScheme="dark"><Div height={6} backgroundColor="alias-default">{itemRenderer(value)}</Div></ThemeProvider>
        ];
    }

    return (
        <Table
            columns={[
                { title: "Name", headerStyle: { width: "150px" } },
                { title: "Styled System Value", headerStyle: { width: "180px" }, rowClassName: "code f7 o-90" },
                { title: "CSS Variable", headerStyle: { width: "300px" }, rowClassName: "code f7 o-90" },
                { title: "Usage", headerStyle: { width: "300px" } },
                { title: "Light", headerStyle: { width: "100px" } },
                { title: "Dark", headerStyle: { width: "100px" } }
            ]}
            rows={colors.map(x => toRowValues(x))}
        />
    );
}

export function textRenderer(value) {
    return <Div padding={2} height="100%" width="100%"><Div height="100%" width="100%"><Span color={value}>Moon</Span></Div></Div>
}

export function backgroundRenderer(value) {
    return <Div padding={2} height="100%" width="100%"><Div height="100%" width="100%" backgroundColor={value}></Div></Div>
}

export function borderRenderer(value) {
    return <Div padding={2} height="100%" width="100%"><Div height="100%" width="100%" border={value}></Div></Div>
}

export function iconRenderer(value) {
    return <Div padding={2} height="100%" width="100%"><EmailIcon fill={value}/></Div>
}

SemanticColorTable.propTypes = propTypes;
