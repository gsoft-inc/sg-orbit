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
    .add("every single breakpoints", () =>
        <Box
            backgroundColor={{ base: "sunray-10", xs: "marine-10", sm: "beetle-10", md: "primary-10", lg: "cloud-10", xl: "botanic-10" }}
            color="white"
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
            backgroundColor={{ base: "sunray-10", sm: "beetle-10" }}
            color="white"
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
            backgroundColor={{ base: "sunray-10" }}
            color="white"
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
