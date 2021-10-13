import { Box } from "@react-components/box";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/useStyledSystem")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("breakpoints", () =>
        <Box
            backgroundColor={{ base: "sunray-10", m: "primary-10", l: "cloud-1" }}
            width="200px"
        >
                Space X
        </Box>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
    );
