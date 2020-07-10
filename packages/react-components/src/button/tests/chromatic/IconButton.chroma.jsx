import { AddIcon } from "@react-components/icons";
import { IconButton, embedButton } from "@react-components/button";
import { Stack } from "@react-components/stack";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createIconButtonTestSuite } from "./createIconButtonTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("IconButton"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

createIconButtonTestSuite(<IconButton variant="solid" />, stories("/solid"));

createIconButtonTestSuite(<IconButton variant="outline" />, stories("/outline"));

createIconButtonTestSuite(<IconButton variant="ghost" />, stories("/ghost"));

stories()
    .add("embedded", () =>
        <Stack align="end">
            {embedButton(<IconButton><AddIcon /></IconButton>, { size: "small" })}
            {embedButton(<IconButton><AddIcon /></IconButton>)}
            {embedButton(<IconButton><AddIcon /></IconButton>, { size: "large" })}
        </Stack>
    );
