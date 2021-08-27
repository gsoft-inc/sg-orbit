import { Box } from "../../../box";
import { Flex2 } from "@react-components/layout";
import { storiesOfBuilder } from "@stories/utils";

function Div({ children, ...rest }) {
    return (
        <Box {...rest}>
            {children}
        </Box>
    );
}

////////////

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Flex2")
        .segment(segment)
        .build();
}

stories()
    .add("inline", () =>
        <>
            <Flex2 inline>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Flex2>
            <Flex2 inline>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Flex2>
        </>
    )
    .add("nested", () =>
        <Flex2 direction="row" gap={8}>
            <Flex2 direction="row" gap={1}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Flex2>
            <Flex2 direction="column" gap={12}>
                <Div backgroundColor="beetle-5">Delta</Div>
                <Div backgroundColor="beetle-5">Echo</Div>
                <Div backgroundColor="beetle-5">Foxtrot</Div>
            </Flex2>
        </Flex2>
    );

stories("/row")
    .add("default", () =>
        <Flex2 direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("fluid", () =>
        <Flex2 fluid direction="row">
            <Div backgroundColor="primary-5" width="100%">Alpha</Div>
            <Div backgroundColor="primary-5" width="100%">Bravo</Div>
            <Div backgroundColor="primary-5" width="100%">Charlie</Div>
        </Flex2>
    )
    .add("items start", () =>
        <Flex2 alignItems="start" height="200px" direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("items center", () =>
        <Flex2 alignItems="center" height="200px" direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("items end", () =>
        <Flex2 alignItems="end" height="200px" direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("justify start", () =>
        <Flex2 justifyContent="start" fluid direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("justify center", () =>
        <Flex2 justifyContent="center" fluid direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("justify end", () =>
        <Flex2 justifyContent="end" fluid direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("wrap", () =>
        <Flex2 wrap width="100px" direction="row">
            <Div backgroundColor="primary-5">Alpha Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("reverse", () =>
        <Flex2 reverse direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    );

stories("/column")
    .add("default", () =>
        <Flex2 direction="column">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("fluid", () =>
        <Flex2 fluid direction="column">
            <Div backgroundColor="primary-5" height="100%">Alpha</Div>
            <Div backgroundColor="primary-5" height="100%">Bravo</Div>
            <Div backgroundColor="primary-5" height="100%">Charlie</Div>
        </Flex2>
    )
    .add("items start", () =>
        <Flex2 alignItems="start" direction="column">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("items center", () =>
        <Flex2 alignItems="center" direction="column">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("items end", () =>
        <Flex2 alignItems="end" direction="column">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("justify start", () =>
        <Flex2 justifyContent="start" direction="column" fluid>
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("justify center", () =>
        <Flex2 justifyContent="center" direction="column" fluid>
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("justify end", () =>
        <Flex2 justifyContent="end" direction="column" fluid>
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("wrap", () =>
        <Flex2 wrap height="100px" direction="column">
            <Div backgroundColor="primary-5">Alpha Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    )
    .add("reverse", () =>
        <Flex2 reverse direction="column">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex2>
    );
