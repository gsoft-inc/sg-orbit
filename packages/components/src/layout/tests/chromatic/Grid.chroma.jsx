import { Div } from "@components/html";
import { Grid, Inline, Stack, fitContent, minmax, repeat } from "@components/layout";

const viewports = [640, 768, 1024, 1280, 1536];

export default {
    title: "Chromatic/Grid",
    component: Grid
};

export const Default = () =>
    <Grid>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
        <Div backgroundColor="accent-5">Delta</Div>
        <Div backgroundColor="accent-5">Echo</Div>
        <Div backgroundColor="accent-5">Foxtrot</Div>
    </Grid>;

export const GridInline = () =>
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
    </>;

export const Nesting = () =>
    <Grid templateColumns={["1fr", "1fr"]} gap={4}>
        <Grid templateColumns={[13, "auto"]}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-6">Bravo</Div>
        </Grid>
        <Grid templateColumns={["auto", 9]}>
            <Div backgroundColor="accent-8">Delta</Div>
            <Div backgroundColor="accent-9">Echo</Div>
        </Grid>
    </Grid>;

export const Gap = () =>
    <Grid gap={4}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
        <Div backgroundColor="accent-5">Delta</Div>
        <Div backgroundColor="accent-5">Echo</Div>
        <Div backgroundColor="accent-5">Foxtrot</Div>
    </Grid>;

export const ColumnGap = () =>
    <Grid columnGap={4} autoFlow="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
        <Div backgroundColor="accent-5">Delta</Div>
        <Div backgroundColor="accent-5">Echo</Div>
        <Div backgroundColor="accent-5">Foxtrot</Div>
    </Grid>;

export const RowGap = () =>
    <Grid rowGap={4}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
        <Div backgroundColor="accent-5">Delta</Div>
        <Div backgroundColor="accent-5">Echo</Div>
        <Div backgroundColor="accent-5">Foxtrot</Div>
    </Grid>;

export const TemplateColumns = () =>
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
        <Grid templateColumns={{ md: [13, 10], lg: "150px 100px 150px" }} gap={4}>
            <Div backgroundColor="accent-10">Alpha</Div>
            <Div backgroundColor="accent-10">Bravo</Div>
            <Div backgroundColor="accent-10">Charlie</Div>
            <Div backgroundColor="accent-10">Delta</Div>
            <Div backgroundColor="accent-10">Echo</Div>
            <Div backgroundColor="accent-10">Foxtrot</Div>
        </Grid>
    </Stack>;

export const TemplateRows = () =>
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
        <Grid templateRows={{ md: [13, 10, 13], lg: "200px 100px 200px" }} gap={4}>
            <Div backgroundColor="accent-10">Alpha</Div>
            <Div backgroundColor="accent-10">Bravo</Div>
            <Div backgroundColor="accent-10">Charlie</Div>
        </Grid>
    </Inline>;

export const Areas = () =>
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
    </Stack>;

export const AutoFlow = () =>
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
    </Stack>;

export const AutoColumns = () =>
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
    </Stack>;

export const AutoRows = () =>
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
    </Stack>;

export const ColumnSpan = () =>
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
    </Stack>;

export const AlignContentStart = () =>
    <Grid alignContent="start" gap={4} height="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const AlignContentCenter = () =>
    <Grid alignContent="center" gap={4} height="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const AlignContentSpaceBetween = () =>
    <Grid alignContent="space-between" gap={4} height="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const AlignContentSpaceAround = () =>
    <Grid alignContent="space-around" gap={4} height="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const AlignItemsStart = () =>
    <Grid alignItems="start" gap={4} height="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const AlignItemsCenter = () =>
    <Grid alignItems="center" gap={4} height="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const AlignItemsEnd = () =>
    <Grid alignItems="end" gap={4} height="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const JustifyContentStart = () =>
    <Grid justifyContent="start" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const JustifyContentCenter = () =>
    <Grid justifyContent="center" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const JustifyContentEnd = () =>
    <Grid justifyContent="end" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const JustifyContentLeft = () =>
    <Grid justifyContent="left" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const JustifyContentRight = () =>
    <Grid justifyContent="right" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const JustifyContentSpaceBetween = () =>
    <Grid justifyContent="space-between" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const JustifyContentSpaceAround = () =>
    <Grid justifyContent="space-around" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const JustifyContentSpaceEvenly = () =>
    <Grid justifyContent="space-evenly" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const JustifyItemsStart = () =>
    <Grid justifyItems="start" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const JustifyItemsCenter = () =>
    <Grid justifyItems="center" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const JustifyItemsEnd = () =>
    <Grid justifyItems="end" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const JustifyItemsLeft = () =>
    <Grid justifyItems="left" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const justifyItemsRight = () =>
    <Grid justifyItems="right" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>;

export const RowSpan = () =>
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
    </Stack>;

export const Repeat = () =>
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
    </Stack>;


export const Minmax = () =>
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
    </Stack>;

export const FitContent = () =>
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
    </Stack>;

AutoColumns.args = {
    chromatic: {
        viewports: viewports
    }
};

TemplateColumns.args = {
    chromatic: {
        viewports: viewports
    }
};

TemplateRows.args = {
    chromatic: {
        viewports: viewports
    }
};

Areas.args = {
    chromatic: {
        viewports: viewports
    }
};

RowSpan.args = {
    chromatic: {
        viewports: viewports
    }
};

ColumnSpan.args = {
    chromatic: {
        viewports: viewports
    }
};

AutoFlow.args = {
    chromatic: {
        viewports: viewports
    }
};

AutoRows.args = {
    chromatic: {
        viewports: viewports
    }
};

AutoColumns.args = {
    chromatic: {
        viewports: viewports
    }
};

Default.storyName = "default";
GridInline.storyName = "inline";
Nesting.storyName = "nesting";
Gap.storyName = "gap";
ColumnGap.storyName = "column gap";
RowGap.storyName = "row gap";
TemplateColumns.storyName = "template columns";
TemplateRows.storyName = "template rows";
Areas.storyName = "areas";
AutoFlow.storyName = "auto flow";
AutoColumns.storyName = "auto columns";
AutoRows.storyName = "auto rows";
ColumnSpan.storyName = "column span";
AlignContentStart.storyName = "align content start";
AlignContentCenter.storyName = "align content center";
AlignContentSpaceBetween.storyName = "align content space-between";
AlignContentSpaceAround.storyName = "align content space-around";
AlignItemsStart.storyName = "align items start";
AlignItemsCenter.storyName = "align items center";
AlignItemsEnd.storyName = "align items end";
JustifyContentStart.storyName = "justify content start";
JustifyContentCenter.storyName = "justify content center";
JustifyContentEnd.storyName = "justify content end";
JustifyContentLeft.storyName = "justify content left";
JustifyContentRight.storyName = "justify content right";
JustifyContentSpaceBetween.storyName = "justify content space between";
JustifyContentSpaceAround.storyName = "justify content space around";
JustifyContentSpaceEvenly.storyName = "justify content space evenly";
JustifyItemsStart.storyName = "justify items start";
JustifyItemsCenter.storyName = "justify items center";
JustifyItemsEnd.storyName = "justify items end";
JustifyItemsLeft.storyName = "justify items left";
justifyItemsRight.storyName = "justify items right";
RowSpan.storyName = "row span";
Repeat.storyName = "repeat";
Minmax.storyName = "minmax";
FitContent.storyName = "fit-content";
