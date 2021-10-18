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
            backgroundColor={{ base: "sunray-10", md: "primary-10", lg: "cloud-1" }}
            width="12"
        >
                Space X
        </Box>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
    );
