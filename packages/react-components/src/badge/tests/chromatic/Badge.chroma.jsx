import { Badge, embedBadge } from "@react-components/badge";
import { CheckIcon } from "@react-components/icons";
import { Stack, VerticalStack } from "@react-components/stack";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Badge"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories("/pill")
    .add("default", () =>
        <Stack align="end">
            <Badge size="tiny">100</Badge>
            <Badge size="small">100</Badge>
            <Badge>100</Badge>
            <Badge size="large">100</Badge>
        </Stack>
    )
    .add("addition", () =>
        <Badge>+1</Badge>
    )
    .add("removal", () =>
        <Badge>-1</Badge>
    )
    .add("highlight", () =>
        <Badge highlight>100</Badge>
    )
    .add("disabled", () =>
        <Badge disabled>100</Badge>
    )
    .add("styling", () =>
        <Stack>
            <Badge className="bg-red">100</Badge>
            <Badge style={{ backgroundColor: "red" }}>100</Badge>
        </Stack>
    )
    .add("embedded", () =>
        <Stack align="end">
            {embedBadge(<Badge className="mr5">100</Badge>, { size: "mini" })}
            {embedBadge(<Badge className="mr5">100</Badge>, { size: "tiny" })}
            {embedBadge(<Badge className="mr5">100</Badge>, { size: "small" })}
            {embedBadge(<Badge className="mr5">100</Badge>)}
            {embedBadge(<Badge>100</Badge>, { size: "large" })}
        </Stack>
    );

stories("/inline")
    .add("default", () =>
        <VerticalStack>
            <div>Planets Visited <Badge variant="inline">2</Badge></div>
            <div className="f3">Planets Visited <Badge variant="inline">2</Badge></div>
            <div className="f1">Planets Visited <Badge variant="inline">2</Badge></div>
        </VerticalStack>
    )
    .add("addition", () =>
        <Badge variant="inline">+1</Badge>
    )
    .add("removal", () =>
        <Badge variant="inline">-1</Badge>
    )
    .add("highlight", () =>
        <Badge highlight variant="inline">100</Badge>
    )
    .add("disabled", () =>
        <Badge disabled variant="inline">100</Badge>
    )
    .add("styling", () =>
        <Stack>
            <Badge className="bg-red" variant="inline">100</Badge>
            <Badge style={{ backgroundColor: "red" }} variant="inline">100</Badge>
        </Stack>
    )
    .add("embedded", () =>
        embedBadge(<Badge variant="inline">100</Badge>)
    );

stories("/dot")
    .add("default", () =>
        <Stack align="end">
            <Badge variant="dot" size="tiny">5</Badge>
            <Badge variant="dot" size="small">5</Badge>
            <Badge variant="dot">5</Badge>
            <Badge variant="dot" size="large">5</Badge>
        </Stack>
    )
    .add("empty", () =>
        <Stack align="end">
            <Badge variant="dot"size="tiny" />
            <Badge variant="dot"size="small" />
            <Badge variant="dot" />
            <Badge variant="dot" size="large" />
        </Stack>
    )
    .add("disabled", () =>
        <Badge disabled variant="dot" />
    )
    .add("styling", () =>
        <Stack>
            <Badge variant="dot" className="bg-red" />
            <Badge variant="dot" style={{ backgroundColor: "red" }} />
        </Stack>
    )
    .add("embedded", () =>
        <Stack align="end">
            {embedBadge(<Badge variant="dot" />, { size: "small" })}
            {embedBadge(<Badge variant="dot" />)}
            {embedBadge(<Badge variant="dot" />, { size: "large" })}
        </Stack>
    );

stories("/icon")
    .add("default", () =>
        <Stack align="end">
            <Badge variant="icon" size="tiny"><CheckIcon /></Badge>
            <Badge variant="icon" size="small"><CheckIcon /></Badge>
            <Badge variant="icon"><CheckIcon /></Badge>
            <Badge variant="icon" size="large"><CheckIcon /></Badge>
        </Stack>
    )
    .add("highlight", () =>
        <Badge highlight variant="icon"><CheckIcon /></Badge>
    )
    .add("disabled", () =>
        <Badge disabled variant="icon"><CheckIcon /></Badge>
    )
    .add("styling", () =>
        <Stack>
            <Badge className="bg-red" variant="icon"><CheckIcon /></Badge>
            <Badge style={{ backgroundColor: "red" }} variant="icon"><CheckIcon /></Badge>
        </Stack>
    );
