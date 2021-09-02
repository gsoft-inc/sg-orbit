import { Div } from "@react-components/html";
import { Flex } from "@react-components/layout";
import { storiesOfBuilder } from "@stories/utils";

////////////

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Flex")
        .segment(segment)
        .build();
}

stories()
    .add("inline", () =>
        <>
            <Flex inline>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Flex>
            <Flex inline>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Flex>
        </>
    )
    .add("nested", () =>
        <Flex direction="row" gap={8}>
            <Flex direction="row" gap={1}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Flex>
            <Flex direction="column" gap={12}>
                <Div backgroundColor="beetle-5">Delta</Div>
                <Div backgroundColor="beetle-5">Echo</Div>
                <Div backgroundColor="beetle-5">Foxtrot</Div>
            </Flex>
        </Flex>
    );

stories("/row")
    .add("default", () =>
        <Flex direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("fluid", () =>
        <Flex fluid direction="row">
            <Div backgroundColor="primary-5" width="100%">Alpha</Div>
            <Div backgroundColor="primary-5" width="100%">Bravo</Div>
            <Div backgroundColor="primary-5" width="100%">Charlie</Div>
        </Flex>
    )
    .add("items start", () =>
        <Flex alignItems="start" height="200px" direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("items center", () =>
        <Flex alignItems="center" height="200px" direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("items end", () =>
        <Flex alignItems="end" height="200px" direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("justify start", () =>
        <Flex justifyContent="start" fluid direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("justify center", () =>
        <Flex justifyContent="center" fluid direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("justify end", () =>
        <Flex justifyContent="end" fluid direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("wrap", () =>
        <Flex wrap="wrap" width="25px" direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("wrap reverse", () =>
        <Flex wrap="wrap-reverse" width="25px" direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
            <Div backgroundColor="primary-5">Delta</Div>
            <Div backgroundColor="primary-5">Echo</Div>
            <Div backgroundColor="primary-5">Foxtrot</Div>
        </Flex>
    )
    .add("reverse", () =>
        <Flex reverse direction="row">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    );

stories("/column")
    .add("default", () =>
        <Flex direction="column">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("fluid", () =>
        <Flex fluid direction="column">
            <Div backgroundColor="primary-5" height="100%">Alpha</Div>
            <Div backgroundColor="primary-5" height="100%">Bravo</Div>
            <Div backgroundColor="primary-5" height="100%">Charlie</Div>
        </Flex>
    )
    .add("items start", () =>
        <Flex alignItems="start" direction="column">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("items center", () =>
        <Flex alignItems="center" direction="column">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("items end", () =>
        <Flex alignItems="end" direction="column">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("justify start", () =>
        <Flex justifyContent="start" direction="column" fluid>
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("justify center", () =>
        <Flex justifyContent="center" direction="column" fluid>
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("justify end", () =>
        <Flex justifyContent="end" direction="column" fluid>
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("wrap", () =>
        <Flex wrap="wrap" height="25px" direction="column">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    )
    .add("wrap reverse", () =>
        <Flex wrap="wrap-reverse" height="25px" direction="column">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
            <Div backgroundColor="primary-5">Delta</Div>
            <Div backgroundColor="primary-5">Echo</Div>
            <Div backgroundColor="primary-5">Foxtrot</Div>
        </Flex>
    )
    .add("reverse", () =>
        <Flex reverse direction="column">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Flex>
    );
