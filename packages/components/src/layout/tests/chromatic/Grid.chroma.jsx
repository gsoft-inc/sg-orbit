import { Div } from "@components/html";
import { Grid, Inline, Stack, fitContent, minmax, repeat } from "@components/layout";

const viewports = [640, 768, 1024, 1280, 1536];

export default {
    title: "Chromatic/Grid",
    component: Grid
};

export const Default = () => (
    <Grid>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
        <Div backgroundColor="accent-5">Delta</Div>
        <Div backgroundColor="accent-5">Echo</Div>
        <Div backgroundColor="accent-5">Foxtrot</Div>
    </Grid>
);

Default.storyName = "default";

export const GridInline = () => (
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
);

GridInline.storyName = "inline";

export const Nesting = () => (
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
);

Nesting.storyName = "nesting";

export const Gap = () => (
    <Grid gap={4}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
        <Div backgroundColor="accent-5">Delta</Div>
        <Div backgroundColor="accent-5">Echo</Div>
        <Div backgroundColor="accent-5">Foxtrot</Div>
    </Grid>
);

Gap.storyName = "gap";

export const ColumnGap = () => (
    <Grid columnGap={4} autoFlow="column">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
        <Div backgroundColor="accent-5">Delta</Div>
        <Div backgroundColor="accent-5">Echo</Div>
        <Div backgroundColor="accent-5">Foxtrot</Div>
    </Grid>
);

ColumnGap.storyName = "column gap";

export const RowGap = () => (
    <Grid rowGap={4}>
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
        <Div backgroundColor="accent-5">Delta</Div>
        <Div backgroundColor="accent-5">Echo</Div>
        <Div backgroundColor="accent-5">Foxtrot</Div>
    </Grid>
);

RowGap.storyName = "row gap";

export const TemplateColumns = () => (
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
    </Stack>
);

TemplateColumns.storyName = "template columns";

export const TemplateRows = () => (
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
    </Inline>
);

TemplateRows.storyName = "template rows";

export const Areas = () => (
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
    </Stack>
);

Areas.storyName = "areas";

export const AutoFlow = () => (
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
    </Stack>
);

AutoFlow.storyName = "auto flow";

export const AutoColumns = () => (
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
    </Stack>
);

AutoColumns.storyName = "auto columns";

export const AutoRows = () => (
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
    </Stack>
);

AutoRows.storyName = "auto rows";

export const ColumnSpan = () => (
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
    </Stack>
);

ColumnSpan.storyName = "column span";

export const AlignContentStart = () => (
    <Grid alignContent="start" gap={4} height="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

AlignContentStart.storyName = "align content start";

export const AlignContentCenter = () => (
    <Grid alignContent="center" gap={4} height="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

AlignContentCenter.storyName = "align content center";

export const AlignContentSpaceBetween = () => (
    <Grid alignContent="space-between" gap={4} height="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

AlignContentSpaceBetween.storyName = "align content space-between";

export const AlignContentSpaceAround = () => (
    <Grid alignContent="space-around" gap={4} height="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

AlignContentSpaceAround.storyName = "align content space-around";

export const AlignItemsStart = () => (
    <Grid alignItems="start" gap={4} height="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

AlignItemsStart.storyName = "align items start";

export const AlignItemsCenter = () => (
    <Grid alignItems="center" gap={4} height="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

AlignItemsCenter.storyName = "align items center";

export const AlignItemsEnd = () => (
    <Grid alignItems="end" gap={4} height="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

AlignItemsEnd.storyName = "align items end";

export const JustifyContentStart = () => (
    <Grid justifyContent="start" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

JustifyContentStart.storyName = "justify content start";

export const JustifyContentCenter = () => (
    <Grid justifyContent="center" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

JustifyContentCenter.storyName = "justify content center";

export const JustifyContentEnd = () => (
    <Grid justifyContent="end" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

JustifyContentEnd.storyName = "justify content end";

export const JustifyContentLeft = () => (
    <Grid justifyContent="left" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

JustifyContentLeft.storyName = "justify content left";

export const JustifyContentRight = () => (
    <Grid justifyContent="right" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

JustifyContentRight.storyName = "justify content right";

export const JustifyContentSpaceBetween = () => (
    <Grid justifyContent="space-between" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

JustifyContentSpaceBetween.storyName = "justify content space between";

export const JustifyContentSpaceAround = () => (
    <Grid justifyContent="space-around" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

JustifyContentSpaceAround.storyName = "justify content space around";

export const JustifyContentSpaceEvenly = () => (
    <Grid justifyContent="space-evenly" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

JustifyContentSpaceEvenly.storyName = "justify content space evenly";

export const JustifyItemsStart = () => (
    <Grid justifyItems="start" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

JustifyItemsStart.storyName = "justify items start";

export const JustifyItemsCenter = () => (
    <Grid justifyItems="center" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

JustifyItemsCenter.storyName = "justify items center";

export const JustifyItemsEnd = () => (
    <Grid justifyItems="end" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

JustifyItemsEnd.storyName = "justify items end";

export const JustifyItemsLeft = () => (
    <Grid justifyItems="left" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

JustifyItemsLeft.storyName = "justify items left";

export const justifyItemsRight = () => (
    <Grid justifyItems="right" gap={4} width="300px">
        <Div backgroundColor="accent-5">Alpha</Div>
        <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
        <Div backgroundColor="accent-5">Charlie</Div>
    </Grid>
);

justifyItemsRight.storyName = "justify items right";

export const RowSpan = () => (
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
    </Stack>
);

RowSpan.storyName = "row span";

export const Repeat = () => (
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
);

Repeat.storyName = "repeat";


export const Minmax = () => (
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
);

Minmax.storyName = "minmax";

export const FitContent = () => (
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

FitContent.storyName = "fit-content";

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
