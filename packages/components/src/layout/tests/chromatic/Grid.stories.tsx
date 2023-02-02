import { Div } from "@components/html";
import { Grid, Inline, Stack, fitContent, minmax, repeat } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

const viewports = [640, 768, 1024, 1280, 1536];

export default {
    title: "Chromatic/Grid",
    component: Grid
} as ComponentMeta<typeof Grid>;

type GridStory = ComponentStoryObj<typeof Grid>;

export const Default: GridStory = {
    storyName: "default",
    render: () => (
        <Grid>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
            <Div backgroundColor="accent-5">Delta</Div>
            <Div backgroundColor="accent-5">Echo</Div>
            <Div backgroundColor="accent-5">Foxtrot</Div>
        </Grid>
    )
};

export const GridInline: GridStory = {
    storyName: "inline",
    render: () => (
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
};

export const Nesting: GridStory = {
    storyName: "nesting",
    render: () => (
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
};

export const Gap: GridStory = {
    storyName: "gap",
    render: () => (
        <Grid gap={4}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
            <Div backgroundColor="accent-5">Delta</Div>
            <Div backgroundColor="accent-5">Echo</Div>
            <Div backgroundColor="accent-5">Foxtrot</Div>
        </Grid>
    )
};

export const ColumnGap: GridStory = {
    storyName: "column gap",
    render: () => (
        <Grid columnGap={4} autoFlow="column">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
            <Div backgroundColor="accent-5">Delta</Div>
            <Div backgroundColor="accent-5">Echo</Div>
            <Div backgroundColor="accent-5">Foxtrot</Div>
        </Grid>
    )
};

export const RowGap: GridStory = {
    storyName: "row gap",
    render: () => (
        <Grid rowGap={4}>
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
            <Div backgroundColor="accent-5">Delta</Div>
            <Div backgroundColor="accent-5">Echo</Div>
            <Div backgroundColor="accent-5">Foxtrot</Div>
        </Grid>
    )
};

export const TemplateColumns: GridStory = {
    storyName: "template columns",
    render: () => (
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
    )
};

export const TemplateRows: GridStory = {
    storyName: "template rows",
    render: () => (
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
    )
};

export const Areas: GridStory = {
    storyName: "areas",
    render: () => (
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
    )
};

export const AutoFlow: GridStory = {
    storyName: "auto flow",
    render: () => (
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
    )
};

export const AutoColumns: GridStory = {
    storyName: "auto columns",
    render: () => (
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
    )
};

export const AutoRows: GridStory = {
    storyName: "auto rows",
    render: () => (
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
    )
};

export const ColumnSpan: GridStory = {
    storyName: "column span",
    render: () => (
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
    )
};

export const AlignContentStart: GridStory = {
    storyName: "align content start",
    render: () => (
        <Grid alignContent="start" gap={4} height="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const AlignContentCenter: GridStory = {
    storyName: "align content center",
    render: () => (
        <Grid alignContent="center" gap={4} height="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const AlignContentSpaceBetween: GridStory = {
    storyName: "align content space-between",
    render: () => (
        <Grid alignContent="space-between" gap={4} height="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const AlignContentSpaceAround: GridStory = {
    storyName: "align content space-around",
    render: () => (
        <Grid alignContent="space-around" gap={4} height="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const AlignItemsStart: GridStory = {
    storyName: "align items start",
    render: () => (
        <Grid alignItems="start" gap={4} height="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const AlignItemsCenter: GridStory = {
    storyName: "align items center",
    render: () => (
        <Grid alignItems="center" gap={4} height="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const AlignItemsEnd: GridStory = {
    storyName: "align items end",
    render: () => (
        <Grid alignItems="end" gap={4} height="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const JustifyContentStart: GridStory = {
    storyName: "justify content start",
    render: () => (
        <Grid justifyContent="start" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const JustifyContentCenter: GridStory = {
    storyName: "justify content center",
    render: () => (
        <Grid justifyContent="center" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const JustifyContentEnd: GridStory = {
    storyName: "justify content end",
    render: () => (
        <Grid justifyContent="end" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const JustifyContentLeft: GridStory = {
    storyName: "justify content left",
    render: () => (
        <Grid justifyContent="left" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const JustifyContentRight: GridStory = {
    storyName: "justify content right",
    render: () => (
        <Grid justifyContent="right" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const JustifyContentSpaceBetween: GridStory = {
    storyName: "justify content space between",
    render: () => (
        <Grid justifyContent="space-between" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const JustifyContentSpaceAround: GridStory = {
    storyName: "justify content space around",
    render: () => (
        <Grid justifyContent="space-around" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const JustifyContentSpaceEvenly: GridStory = {
    storyName: "justify content space evenly",
    render: () => (
        <Grid justifyContent="space-evenly" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const JustifyItemsStart: GridStory = {
    storyName: "justify items start",
    render: () => (
        <Grid justifyItems="start" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const JustifyItemsCenter: GridStory = {
    storyName: "justify items center",
    render: () => (
        <Grid justifyItems="center" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const JustifyItemsEnd: GridStory = {
    storyName: "justify items end",
    render: () => (
        <Grid justifyItems="end" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const JustifyItemsLeft: GridStory = {
    storyName: "justify items left",
    render: () => (
        <Grid justifyItems="left" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const JustifyItemsRight: GridStory = {
    storyName: "justify items right",
    render: () => (
        <Grid justifyItems="right" gap={4} width="300px">
            <Div backgroundColor="accent-5">Alpha</Div>
            <Div gridColumn={2} backgroundColor="accent-5">Bravo</Div>
            <Div backgroundColor="accent-5">Charlie</Div>
        </Grid>
    )
};

export const RowSpan: GridStory = {
    storyName: "row span",
    render: () => (
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
    )
};

export const Repeat: GridStory = {
    storyName: "repeat",
    render: () => (
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
};

export const Minmax: GridStory = {
    storyName: "minmax",
    render: () => (
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
};

export const FitContent: GridStory = {
    storyName: "fit-content",
    render: () => (
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
    )
};

AutoColumns.parameters = {
    chromatic: {
        viewports: viewports
    }
};

TemplateColumns.parameters = {
    chromatic: {
        viewports: viewports
    }
};

TemplateRows.parameters = {
    chromatic: {
        viewports: viewports
    }
};

Areas.parameters = {
    chromatic: {
        viewports: viewports
    }
};

RowSpan.parameters = {
    chromatic: {
        viewports: viewports
    }
};

ColumnSpan.parameters = {
    chromatic: {
        viewports: viewports
    }
};

AutoFlow.parameters = {
    chromatic: {
        viewports: viewports
    }
};

AutoRows.parameters = {
    chromatic: {
        viewports: viewports
    }
};

AutoColumns.parameters = {
    chromatic: {
        viewports: viewports
    }
};
