import { Div } from "@react-components/html";
import { Grid, Inline, Stack, fitContent, minmax, repeat } from "@react-components/layout";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Grid")
        .segment(segment)
        .build();
}

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
    .add("nesting", () =>
        <Grid fluidColumns={2} gap={4}>
            <Grid templateColumns={[13, "auto"]}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-6">Bravo</Div>
            </Grid>
            <Grid templateColumns="auto 75px">
                <Div backgroundColor="primary-8">Delta</Div>
                <Div backgroundColor="primary-9">Echo</Div>
            </Grid>
        </Grid>
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
                <Div backgroundColor="primary-7">Alpha</Div>
                <Div backgroundColor="primary-7">Bravo</Div>
                <Div backgroundColor="primary-7">Charlie</Div>
                <Div backgroundColor="primary-7">Delta</Div>
                <Div backgroundColor="primary-7">Echo</Div>
                <Div backgroundColor="primary-7">Foxtrot</Div>
            </Grid>
            <Grid templateColumns={{ m: [13, 10], l: "150px 100px 150px" }} gap={4}>
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
    .add("template rows", () =>
        <Inline>
            <Grid templateRows="200px 100px 200px" gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
            </Grid>
            <Grid templateRows={[13, 10, 13]} gap={4}>
                <Div backgroundColor="primary-7">Alpha</Div>
                <Div backgroundColor="primary-7">Bravo</Div>
                <Div backgroundColor="primary-7">Charlie</Div>
            </Grid>
            <Grid templateRows={{ m: [13, 10, 13], l: "200px 100px 200px" }} gap={4}>
                <Div backgroundColor="primary-10">Alpha</Div>
                <Div backgroundColor="primary-10">Bravo</Div>
                <Div backgroundColor="primary-10">Charlie</Div>
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
        </Stack>,
         {
             ...paramsBuilder()
                 .viewports([900, 1280])
                 .build()
         }
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
                <Div backgroundColor="primary-7">Alpha</Div>
                <Div backgroundColor="primary-7">Bravo</Div>
                <Div backgroundColor="primary-7">Charlie</Div>
                <Div backgroundColor="primary-7">Delta</Div>
                <Div backgroundColor="primary-7">Echo</Div>
            </Grid>
            <Grid autoFlow={{ m: "row", l: "column" }} gap={4}>
                <Div backgroundColor="primary-10">Alpha</Div>
                <Div backgroundColor="primary-10">Bravo</Div>
                <Div backgroundColor="primary-10">Charlie</Div>
                <Div backgroundColor="primary-10">Delta</Div>
                <Div backgroundColor="primary-10">Echo</Div>
            </Grid>
        </Stack>,
         {
             ...paramsBuilder()
                 .viewports([900, 1280])
                 .build()
         }
    )
    .add("auto columns", () =>
        <Stack>
            <Grid autoColumns={13} gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div gridColumn={2} backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
            </Grid>
            <Grid autoColumns="200px" gap={4}>
                <Div backgroundColor="primary-7">Alpha</Div>
                <Div gridColumn={2} backgroundColor="primary-7">Bravo</Div>
                <Div backgroundColor="primary-7">Charlie</Div>
                <Div backgroundColor="primary-7">Delta</Div>
                <Div backgroundColor="primary-7">Echo</Div>
            </Grid>
            <Grid autoColumns={{ m: 13, l: "200px" }} gap={4}>
                <Div backgroundColor="primary-10">Alpha</Div>
                <Div gridColumn={2} backgroundColor="primary-10">Bravo</Div>
                <Div backgroundColor="primary-10">Charlie</Div>
                <Div backgroundColor="primary-10">Delta</Div>
                <Div backgroundColor="primary-10">Echo</Div>
            </Grid>
        </Stack>,
         {
             ...paramsBuilder()
                 .viewports([900, 1280])
                 .build()
         }
    )
    .add("auto rows", () =>
        <Stack>
            <Grid autoRows={8} gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div gridColumn={3} backgroundColor="primary-5">Bravo</Div>
                <Div gridColumnSpan={3} backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
            </Grid>
            <Grid autoRows="25px" gap={4}>
                <Div backgroundColor="primary-7">Alpha</Div>
                <Div gridColumn={3} backgroundColor="primary-7">Bravo</Div>
                <Div gridColumnSpan={3} backgroundColor="primary-7">Charlie</Div>
                <Div backgroundColor="primary-7">Delta</Div>
                <Div backgroundColor="primary-7">Echo</Div>
            </Grid>
            <Grid autoRows={{ m: "25px", l: 8 }} gap={4}>
                <Div backgroundColor="primary-10">Alpha</Div>
                <Div gridColumn={3} backgroundColor="primary-10">Bravo</Div>
                <Div gridColumnSpan={3} backgroundColor="primary-10">Charlie</Div>
                <Div backgroundColor="primary-10">Delta</Div>
                <Div backgroundColor="primary-10">Echo</Div>
            </Grid>
        </Stack>,
         {
             ...paramsBuilder()
                 .viewports([900, 1280])
                 .build()
         }
    )
    .add("column span", () =>
        <Stack>
            <Grid fluidColumns={3} gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div gridColumnSpan={2} backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
                <Div backgroundColor="primary-5">Foxtrot</Div>
            </Grid>
            <Grid fluidColumns={3} gap={4}>
                <Div backgroundColor="primary-10">Alpha</Div>
                <Div gridColumnSpan={{ m: undefined, l: 2 }} backgroundColor="primary-10">Bravo</Div>
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
    .add("align content start", () =>
        <Grid alignContent="start" gap={4} height="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("align content center", () =>
        <Grid alignContent="center" gap={4} height="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("align content space-between", () =>
        <Grid alignContent="space-between" gap={4} height="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("align content space-around", () =>
        <Grid alignContent="space-around" gap={4} height="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("align items start", () =>
        <Grid alignItems="start" gap={4} height="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("align items center", () =>
        <Grid alignItems="center" gap={4} height="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("align items end", () =>
        <Grid alignItems="end" gap={4} height="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("justify content start", () =>
        <Grid justifyContent="start" gap={4} width="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("justify content center", () =>
        <Grid justifyContent="center" gap={4} width="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("justify content end", () =>
        <Grid justifyContent="end" gap={4} width="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("justify content left", () =>
        <Grid justifyContent="left" gap={4} width="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("justify content right", () =>
        <Grid justifyContent="right" gap={4} width="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("justify content space between", () =>
        <Grid justifyContent="space-between" gap={4} width="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("justify content space around", () =>
        <Grid justifyContent="space-around" gap={4} width="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("justify content space evenly", () =>
        <Grid justifyContent="space-evenly" gap={4} width="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("justify items start", () =>
        <Grid justifyItems="start" gap={4} width="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("justify items center", () =>
        <Grid justifyItems="center" gap={4} width="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("justify items end", () =>
        <Grid justifyItems="end" gap={4} width="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("justify items left", () =>
        <Grid justifyItems="left" gap={4} width="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("justify items right", () =>
        <Grid justifyItems="right" gap={4} width="300px">
            <Div backgroundColor="primary-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="primary-5">Bravo</Div>
            <Div backgroundColor="primary-5">Charlie</Div>
        </Grid>
    )
    .add("row span", () =>
        <Stack>
            <Grid fluidColumns={3} gap={4}>
                <Div backgroundColor="primary-5">Alpha</Div>
                <Div gridRowSpan={2} backgroundColor="primary-5">Bravo</Div>
                <Div backgroundColor="primary-5">Charlie</Div>
                <Div backgroundColor="primary-5">Delta</Div>
                <Div backgroundColor="primary-5">Echo</Div>
                <Div backgroundColor="primary-5">Foxtrot</Div>
            </Grid>
            <Grid fluidColumns={3} gap={4}>
                <Div backgroundColor="primary-10">Alpha</Div>
                <Div gridRowSpan={{ l: 2 }} backgroundColor="primary-10">Bravo</Div>
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
