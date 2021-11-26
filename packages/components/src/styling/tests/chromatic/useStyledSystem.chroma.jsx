import { Box } from "@components/box";
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
    .add("every single breakpoints", () =>
        <Box
            backgroundColor={{ base: "purple-5", xs: "green-5", sm: "alert-5", md: "purple-5", lg: "neutral-5", xl: "green-5" }}
            color="static-white"
            width={12}
        >
                Space X
        </Box>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
    )
    .add("match higher breakpoint", () =>
        <Box
            backgroundColor={{ base: "purple-3", sm: "alert-3" }}
            color="static-white"
            width={12}
        >
            Space X
        </Box>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
    )
    .add("match base", () =>
        <Box
            backgroundColor={{ base: "purple-8" }}
            color="static-white"
            width={12}
        >
            Space X
        </Box>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
    );
