import { Div } from "@react-components/html";
import { Grid, Inline, Stack, fitContent, minmax, repeat } from "@react-components/layout";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Grid")
        .segment(segment)
        .build();
}

/*
TODO:
- nested test
- auto columns
- auto rows
- alignContent
- alignItems
- justifyContent
- justifyItems
*/

stories()
    .add("default", () =>
        <Grid>
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
            <Div backgroundColor="primary-5">Delta</Div>
            <Div backgroundColor="primary-5">Echo</Div>
            <Div backgroundColor="primary-5">Foxtrot</Div>
        </Grid>
    )
    .add("inline", () =>
        <>
            <Grid inline>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Grid>
            <Grid inline>
                <Div backgroundColor="primary-10">Delta</Div>
                <Div backgroundColor="primary-10">Echo</Div>
                <Div backgroundColor="primary-10">Foxtrot</Div>
            </Grid>
        </>
    )
    .add("gap", () =>
        <Grid gap={4}>
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
            <Div backgroundColor="primary-5">Delta</Div>
            <Div backgroundColor="primary-5">Echo</Div>
            <Div backgroundColor="primary-5">Foxtrot</Div>
        </Grid>
    )
    .add("column gap", () =>
        <Grid columnGap={4} autoFlow="column">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
            <Div backgroundColor="primary-5">Delta</Div>
            <Div backgroundColor="primary-5">Echo</Div>
            <Div backgroundColor="primary-5">Foxtrot</Div>
        </Grid>
    )
    .add("row gap", () =>
        <Grid rowGap={4}>
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
            <Div backgroundColor="primary-5">Delta</Div>
            <Div backgroundColor="primary-5">Echo</Div>
            <Div backgroundColor="primary-5">Foxtrot</Div>
        </Grid>
    )
    .add("columns", () =>
        <Stack>
            <Grid columns={3} gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
                <Div backgroundColor="primary-5">Foxtrot</Div>
            </Grid>
            <Grid columns={{ m: 2, l: 3 }} gap={4}>
                <Div backgroundColor="primary-10">Alpha</Div>
                <Div backgroundColor="primary-10">Bravo</Div>
                <Div backgroundColor="primary-10">Charlie</Div>
                <Div backgroundColor="primary-10">Delta</Div>
                <Div backgroundColor="primary-10">Echo</Div>
                <Div backgroundColor="primary-10">Foxtrot</Div>
            </Grid>
        </Stack>,
         {
             ...paramsBuilder()
                 .viewports([900, 1280])
                 .build()
         }
    )
    .add("rows", () =>
        <Stack>
            <Grid rows={2} autoFlow="column" gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
                <Div backgroundColor="primary-5">Foxtrot</Div>
            </Grid>
            <Grid rows={{ m: 3, l: 2 }} autoFlow="column" gap={4}>
                <Div backgroundColor="primary-10">Alpha</Div>
                <Div backgroundColor="primary-10">Bravo</Div>
                <Div backgroundColor="primary-10">Charlie</Div>
                <Div backgroundColor="primary-10">Delta</Div>
                <Div backgroundColor="primary-10">Echo</Div>
                <Div backgroundColor="primary-10">Foxtrot</Div>
            </Grid>
        </Stack>,
         {
             ...paramsBuilder()
                 .viewports([900, 1280])
                 .build()
         }
    )
    .add("template columns", () =>
        <Stack>
            <Grid templateColumns="65px 50px 65px" gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
                <Div backgroundColor="primary-5">Foxtrot</Div>
            </Grid>
            <Grid templateColumns={[13, 10, 13]} gap={4}>
                <Div backgroundColor="primary-10">Alpha</Div>
                <Div backgroundColor="primary-10">Bravo</Div>
                <Div backgroundColor="primary-10">Charlie</Div>
                <Div backgroundColor="primary-10">Delta</Div>
                <Div backgroundColor="primary-10">Echo</Div>
                <Div backgroundColor="primary-10">Foxtrot</Div>
            </Grid>
            <Grid templateColumns={{ m: [13, 10], l: "150px 100px 150px" }} gap={4}>
                <Div backgroundColor="primary-12">Alpha</Div>
                <Div backgroundColor="primary-12">Bravo</Div>
                <Div backgroundColor="primary-12">Charlie</Div>
                <Div backgroundColor="primary-12">Delta</Div>
                <Div backgroundColor="primary-12">Echo</Div>
                <Div backgroundColor="primary-12">Foxtrot</Div>
            </Grid>
        </Stack>,
         {
             ...paramsBuilder()
                 .viewports([900, 1280])
                 .build()
         }
    )
    .add("template rows", () =>
        <Inline>
            <Grid templateRows="200px 100px 200px" gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Grid>
            <Grid templateRows={[13, 10, 13]} gap={4}>
                <Div backgroundColor="primary-10">Alpha</Div>
                <Div backgroundColor="primary-10">Bravo</Div>
                <Div backgroundColor="primary-10">Charlie</Div>
            </Grid>
            <Grid templateRows={{ m: [13, 10, 13], l: "200px 100px 200px" }} gap={4}>
                <Div backgroundColor="primary-12">Alpha</Div>
                <Div backgroundColor="primary-12">Bravo</Div>
                <Div backgroundColor="primary-12">Charlie</Div>
            </Grid>
        </Inline>,
         {
             ...paramsBuilder()
                 .viewports([900, 1280])
                 .build()
         }
    )
    .add("areas", () =>
        <Stack>
            <Grid areas={["a a", "b c", "d e"]} gap={4}>
                <Div gridArea="a" backgroundColor="primary-1">Alpha</Div>
                <Div gridArea="b" backgroundColor="primary-2">Bravo</Div>
                <Div gridArea="c" backgroundColor="primary-3">Charlie</Div>
                <Div gridArea="d" backgroundColor="primary-4">Delta</Div>
                <Div gridArea="e" backgroundColor="primary-5">Echo</Div>
            </Grid>
            <Grid areas={{ m: ["a", "b", "c", "d", "e"], l: ["a a", "b c", "d e"] }} gap={4}>
                <Div gridArea="a" backgroundColor="primary-6">Alpha</Div>
                <Div gridArea="b" backgroundColor="primary-7">Bravo</Div>
                <Div gridArea="c" backgroundColor="primary-8">Charlie</Div>
                <Div gridArea="d" backgroundColor="primary-9">Delta</Div>
                <Div gridArea="e" backgroundColor="primary-10">Echo</Div>
            </Grid>
        </Stack>
    )
    .add("auto flow", () =>
        <Stack>
            <Grid autoFlow="column" gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
            </Grid>
            <Grid autoFlow="row" gap={4}>
                <Div backgroundColor="primary-10">Alpha</Div>
                <Div backgroundColor="primary-10">Bravo</Div>
                <Div backgroundColor="primary-10">Charlie</Div>
                <Div backgroundColor="primary-10">Delta</Div>
                <Div backgroundColor="primary-10">Echo</Div>
            </Grid>
        </Stack>
    )
    .add("column span", () =>
        <Stack>
            <Grid columns={3} gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div gridColumnSpan={2} backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
                <Div backgroundColor="primary-5">Foxtrot</Div>
            </Grid>
            <Grid columns={3} gap={4}>
                <Div backgroundColor="primary-10">Alpha</Div>
                <Div gridColumnSpan={{ m: undefined, l: 2 }} backgroundColor="primary-10">Bravo</Div>
                <Div backgroundColor="primary-10">Charlie</Div>
                <Div backgroundColor="primary-10">Delta</Div>
                <Div backgroundColor="primary-10">Echo</Div>
                <Div backgroundColor="primary-10">Foxtrot</Div>
            </Grid>
        </Stack>
    )
    .add("row span", () =>
        <Stack>
            <Grid columns={3} gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div gridRowSpan={2} backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
                <Div backgroundColor="primary-5">Foxtrot</Div>
            </Grid>
            <Grid columns={3} gap={4}>
                <Div backgroundColor="primary-10">Alpha</Div>
                <Div gridRowSpan={{ m: undefined, l: 2 }} backgroundColor="primary-10">Bravo</Div>
                <Div backgroundColor="primary-10">Charlie</Div>
                <Div backgroundColor="primary-10">Delta</Div>
                <Div backgroundColor="primary-10">Echo</Div>
                <Div backgroundColor="primary-10">Foxtrot</Div>
            </Grid>
        </Stack>
    )
    .add("repeat", () =>
        <Stack>
            <Grid templateColumns={repeat("auto-fit", 12)} gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
                <Div backgroundColor="primary-5">Foxtrot</Div>
            </Grid>
            <Grid templateColumns={repeat("auto-fit", "200px")} gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
                <Div backgroundColor="primary-5">Foxtrot</Div>
            </Grid>
        </Stack>
    )
    .add("minmax", () =>
        <Stack>
            <Grid templateColumns={[minmax(13, "auto"), 12, 12]} gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
                <Div backgroundColor="primary-5">Foxtrot</Div>
            </Grid>
            <Grid templateColumns={[minmax("600px", "auto"), 12, 12]} gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
                <Div backgroundColor="primary-5">Foxtrot</Div>
            </Grid>
        </Stack>
    )
    .add("fit-content", () =>
        <Stack>
            <Grid templateColumns={[fitContent(13), 12, 12]} gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
                <Div backgroundColor="primary-5">Foxtrot</Div>
            </Grid>
            <Grid templateColumns={[fitContent("100px"), 12, 12]} gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
                <Div backgroundColor="primary-5">Foxtrot</Div>
            </Grid>
        </Stack>
    );
