import { Div } from "@components/html";
import { Grid, Inline, Stack, fitContent, minmax, repeat } from "@components/layout";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Grid")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Grid>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
            <Div backgroundColor="accent-5">Delta</Div>
            <Div backgroundColor="accent-5">Echo</Div>
            <Div backgroundColor="accent-5">Foxtrot</Div>
        </Grid>
    )
    .add("inline", () =>
        <>
            <Grid inline>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Grid>
            <Grid inline>
                <Div backgroundColor="accent-10">Delta</Div>
                <Div backgroundColor="accent-10">Echo</Div>
                <Div backgroundColor="accent-10">Foxtrot</Div>
            </Grid>
        </>
    )
    .add("nesting", () =>
        <Grid templateColumns={["1fr", "1fr"]} gap={4}>
            <Grid templateColumns={[13, "auto"]}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-6">Bravo</Div>
            </Grid>
            <Grid templateColumns={["auto", 9]}>
                <Div backgroundColor="accent-8">Delta</Div>
                <Div backgroundColor="accent-9">Echo</Div>
            </Grid>
        </Grid>
    )
    .add("gap", () =>
        <Grid gap={4}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
            <Div backgroundColor="accent-5">Delta</Div>
            <Div backgroundColor="accent-5">Echo</Div>
            <Div backgroundColor="accent-5">Foxtrot</Div>
        </Grid>
    )
    .add("column gap", () =>
        <Grid columnGap={4} autoFlow="column">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
            <Div backgroundColor="accent-5">Delta</Div>
            <Div backgroundColor="accent-5">Echo</Div>
            <Div backgroundColor="accent-5">Foxtrot</Div>
        </Grid>
    )
    .add("row gap", () =>
        <Grid rowGap={4}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
            <Div backgroundColor="accent-5">Delta</Div>
            <Div backgroundColor="accent-5">Echo</Div>
            <Div backgroundColor="accent-5">Foxtrot</Div>
        </Grid>
    )
    .add("template columns", () =>
        <Stack>
            <Grid templateColumns="65px 50px 65px" gap={4}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
                <Div backgroundColor="accent-5">Delta</Div>
                <Div backgroundColor="accent-5">Echo</Div>
                <Div backgroundColor="accent-5">Foxtrot</Div>
            </Grid>
            <Grid templateColumns={[13, 10, 13]} gap={4}>
                <Div backgroundColor="accent-7">Alpha</Div>
                <Div backgroundColor="accent-7">Bravo</Div>
                <Div backgroundColor="accent-7">Charlie</Div>
                <Div backgroundColor="accent-7">Delta</Div>
                <Div backgroundColor="accent-7">Echo</Div>
                <Div backgroundColor="accent-7">Foxtrot</Div>
            </Grid>
            <Grid templateColumns={{ md: [13, 10], l: "150px 100px 150px" }} gap={4}>
                <Div backgroundColor="accent-10">Alpha</Div>
                <Div backgroundColor="accent-10">Bravo</Div>
                <Div backgroundColor="accent-10">Charlie</Div>
                <Div backgroundColor="accent-10">Delta</Div>
                <Div backgroundColor="accent-10">Echo</Div>
                <Div backgroundColor="accent-10">Foxtrot</Div>
            </Grid>
        </Stack>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
    )
    .add("template rows", () =>
        <Inline>
            <Grid templateRows="200px 100px 200px" gap={4}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
            </Grid>
            <Grid templateRows={[13, 10, 13]} gap={4}>
                <Div backgroundColor="accent-7">Alpha</Div>
                <Div backgroundColor="accent-7">Bravo</Div>
                <Div backgroundColor="accent-7">Charlie</Div>
            </Grid>
            <Grid templateRows={{ md: [13, 10, 13], l: "200px 100px 200px" }} gap={4}>
                <Div backgroundColor="accent-10">Alpha</Div>
                <Div backgroundColor="accent-10">Bravo</Div>
                <Div backgroundColor="accent-10">Charlie</Div>
            </Grid>
        </Inline>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
    )
    .add("areas", () =>
        <Stack>
            <Grid areas={["a a", "b c", "d e"]} gap={4}>
                <Div gridArea="a" backgroundColor="accent-1">Alpha</Div>
                <Div gridArea="b" backgroundColor="accent-2">Bravo</Div>
                <Div gridArea="c" backgroundColor="accent-3">Charlie</Div>
                <Div gridArea="d" backgroundColor="accent-4">Delta</Div>
                <Div gridArea="e" backgroundColor="accent-5">Echo</Div>
            </Grid>
            <Grid areas={{ md: ["a", "b", "c", "d", "e"], lg: ["a a", "b c", "d e"] }} gap={4}>
                <Div gridArea="a" backgroundColor="accent-6">Alpha</Div>
                <Div gridArea="b" backgroundColor="accent-7">Bravo</Div>
                <Div gridArea="c" backgroundColor="accent-8">Charlie</Div>
                <Div gridArea="d" backgroundColor="accent-9">Delta</Div>
                <Div gridArea="e" backgroundColor="accent-10">Echo</Div>
            </Grid>
        </Stack>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
    )
    .add("auto flow", () =>
        <Stack>
            <Grid autoFlow="column" gap={4}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
                <Div backgroundColor="accent-5">Delta</Div>
                <Div backgroundColor="accent-5">Echo</Div>
            </Grid>
            <Grid autoFlow="row" gap={4}>
                <Div backgroundColor="accent-7">Alpha</Div>
                <Div backgroundColor="accent-7">Bravo</Div>
                <Div backgroundColor="accent-7">Charlie</Div>
                <Div backgroundColor="accent-7">Delta</Div>
                <Div backgroundColor="accent-7">Echo</Div>
            </Grid>
            <Grid autoFlow={{ md: "row", lg: "column" }} gap={4}>
                <Div backgroundColor="accent-10">Alpha</Div>
                <Div backgroundColor="accent-10">Bravo</Div>
                <Div backgroundColor="accent-10">Charlie</Div>
                <Div backgroundColor="accent-10">Delta</Div>
                <Div backgroundColor="accent-10">Echo</Div>
            </Grid>
        </Stack>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
    )
    .add("auto columns", () =>
        <Stack>
            <Grid autoColumns={13} gap={4}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
                <Div backgroundColor="accent-5">Delta</Div>
                <Div backgroundColor="accent-5">Echo</Div>
            </Grid>
            <Grid autoColumns="200px" gap={4}>
                <Div backgroundColor="accent-7">Alpha</Div>
                <Div gridColumn={2} backgroundColor="accent-7">Bravo</Div>
                <Div backgroundColor="accent-7">Charlie</Div>
                <Div backgroundColor="accent-7">Delta</Div>
                <Div backgroundColor="accent-7">Echo</Div>
            </Grid>
            <Grid autoColumns={{ md: 13, lg: "200px" }} gap={4}>
                <Div backgroundColor="accent-10">Alpha</Div>
                <Div gridColumn={2} backgroundColor="accent-10">Bravo</Div>
                <Div backgroundColor="accent-10">Charlie</Div>
                <Div backgroundColor="accent-10">Delta</Div>
                <Div backgroundColor="accent-10">Echo</Div>
            </Grid>
        </Stack>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
    )
    .add("auto rows", () =>
        <Stack>
            <Grid autoRows={8} gap={4}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div gridColumn={3} backgroundColor="accent-5">Bravo</Div>
                <Div gridColumnSpan={3} backgroundColor="accent-5">Charlie</Div>
                <Div backgroundColor="accent-5">Delta</Div>
                <Div backgroundColor="accent-5">Echo</Div>
            </Grid>
            <Grid autoRows={4} gap={4}>
                <Div backgroundColor="accent-7">Alpha</Div>
                <Div gridColumn={3} backgroundColor="accent-7">Bravo</Div>
                <Div gridColumnSpan={3} backgroundColor="accent-7">Charlie</Div>
                <Div backgroundColor="accent-7">Delta</Div>
                <Div backgroundColor="accent-7">Echo</Div>
            </Grid>
            <Grid autoRows={{ md: 4, lg: 8 }} gap={4}>
                <Div backgroundColor="accent-10">Alpha</Div>
                <Div gridColumn={3} backgroundColor="accent-10">Bravo</Div>
                <Div gridColumnSpan={3} backgroundColor="accent-10">Charlie</Div>
                <Div backgroundColor="accent-10">Delta</Div>
                <Div backgroundColor="accent-10">Echo</Div>
            </Grid>
        </Stack>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
    )
    .add("column span", () =>
        <Stack>
            <Grid templateColumns={["1fr", "1fr", "1fr"]} gap={4}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div gridColumnSpan={2} backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
                <Div backgroundColor="accent-5">Delta</Div>
                <Div backgroundColor="accent-5">Echo</Div>
                <Div backgroundColor="accent-5">Foxtrot</Div>
            </Grid>
            <Grid templateColumns={["1fr", "1fr", "1fr"]} gap={4}>
                <Div backgroundColor="accent-10">Alpha</Div>
                <Div gridColumnSpan={{ md: undefined, lg: 2 }} backgroundColor="accent-10">Bravo</Div>
                <Div backgroundColor="accent-10">Charlie</Div>
                <Div backgroundColor="accent-10">Delta</Div>
                <Div backgroundColor="accent-10">Echo</Div>
                <Div backgroundColor="accent-10">Foxtrot</Div>
            </Grid>
        </Stack>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
    )
    .add("align content start", () =>
        <Grid alignContent="start" gap={4} height="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("align content center", () =>
        <Grid alignContent="center" gap={4} height="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("align content space-between", () =>
        <Grid alignContent="space-between" gap={4} height="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("align content space-around", () =>
        <Grid alignContent="space-around" gap={4} height="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("align items start", () =>
        <Grid alignItems="start" gap={4} height="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("align items center", () =>
        <Grid alignItems="center" gap={4} height="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("align items end", () =>
        <Grid alignItems="end" gap={4} height="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("justify content start", () =>
        <Grid justifyContent="start" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("justify content center", () =>
        <Grid justifyContent="center" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("justify content end", () =>
        <Grid justifyContent="end" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("justify content left", () =>
        <Grid justifyContent="left" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("justify content right", () =>
        <Grid justifyContent="right" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("justify content space between", () =>
        <Grid justifyContent="space-between" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("justify content space around", () =>
        <Grid justifyContent="space-around" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("justify content space evenly", () =>
        <Grid justifyContent="space-evenly" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("justify items start", () =>
        <Grid justifyItems="start" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("justify items center", () =>
        <Grid justifyItems="center" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("justify items end", () =>
        <Grid justifyItems="end" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("justify items left", () =>
        <Grid justifyItems="left" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("justify items right", () =>
        <Grid justifyItems="right" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
    .add("row span", () =>
        <Stack>
            <Grid templateColumns={["1fr", "1fr", "1fr"]} gap={4}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div gridRowSpan={2} backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
                <Div backgroundColor="accent-5">Delta</Div>
                <Div backgroundColor="accent-5">Echo</Div>
                <Div backgroundColor="accent-5">Foxtrot</Div>
            </Grid>
            <Grid templateColumns={["1fr", "1fr", "1fr"]} gap={4}>
                <Div backgroundColor="accent-10">Alpha</Div>
                <Div gridRowSpan={{ lg: 2 }} backgroundColor="accent-10">Bravo</Div>
                <Div backgroundColor="accent-10">Charlie</Div>
                <Div backgroundColor="accent-10">Delta</Div>
                <Div backgroundColor="accent-10">Echo</Div>
                <Div backgroundColor="accent-10">Foxtrot</Div>
            </Grid>
        </Stack>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
    )
    .add("repeat", () =>
        <Stack>
            <Grid templateColumns={repeat("auto-fit", 12)} gap={4}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
                <Div backgroundColor="accent-5">Delta</Div>
                <Div backgroundColor="accent-5">Echo</Div>
                <Div backgroundColor="accent-5">Foxtrot</Div>
            </Grid>
            <Grid templateColumns={repeat("auto-fit", 12)} gap={4}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
                <Div backgroundColor="accent-5">Delta</Div>
                <Div backgroundColor="accent-5">Echo</Div>
                <Div backgroundColor="accent-5">Foxtrot</Div>
            </Grid>
        </Stack>
    )
    .add("minmax", () =>
        <Stack>
            <Grid templateColumns={[minmax(13, "auto"), 12, 12]} gap={4}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
                <Div backgroundColor="accent-5">Delta</Div>
                <Div backgroundColor="accent-5">Echo</Div>
                <Div backgroundColor="accent-5">Foxtrot</Div>
            </Grid>
            <Grid templateColumns={[minmax("600px", "auto"), 12, 12]} gap={4}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
                <Div backgroundColor="accent-5">Delta</Div>
                <Div backgroundColor="accent-5">Echo</Div>
                <Div backgroundColor="accent-5">Foxtrot</Div>
            </Grid>
        </Stack>
    )
    .add("fit-content", () =>
        <Stack>
            <Grid templateColumns={[fitContent(13), 12, 12]} gap={4}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
                <Div backgroundColor="accent-5">Delta</Div>
                <Div backgroundColor="accent-5">Echo</Div>
                <Div backgroundColor="accent-5">Foxtrot</Div>
            </Grid>
            <Grid templateColumns={[fitContent(10), 12, 12]} gap={4}>
                <Div backgroundColor="accent-5">Alpha</Div>
                <Div backgroundColor="accent-5">Bravo</Div>
                <Div backgroundColor="accent-5">Charlie</Div>
                <Div backgroundColor="accent-5">Delta</Div>
                <Div backgroundColor="accent-5">Echo</Div>
                <Div backgroundColor="accent-5">Foxtrot</Div>
            </Grid>
        </Stack>
    );
