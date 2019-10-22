import { SECTION } from "@stories/materials/environment/config";
import { paramsBuilder } from "@utils/params-builder";
import { storiesOfBuilder } from "@utils/stories-of-builder";

function stories() {
    return storiesOfBuilder(module, `${SECTION}/chromatic`)
        .parameters(
            paramsBuilder()
                .chromaticDelay(100)
                .sortLast()
                .build()
        )
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-column items-center">
                 <div className="w13 h13 shadow-4 mb8" />
                 <div className="w13 h13 shadow-5" />
             </div>
    );
