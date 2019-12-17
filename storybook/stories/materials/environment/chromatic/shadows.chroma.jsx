import { createChromaticSection } from "@utils/create-section";
import { paramsBuilder } from "@utils/params-builder";
import { storiesOfBuilder } from "@utils/stories-of-builder";

function stories() {
    return storiesOfBuilder(module, createChromaticSection("Shadows"))
        .parameters(
            paramsBuilder()
                .chromaticDelay(100)

                .build()
        )
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-column items-center">
                 <div className="w13 h13 shadow-100 mb8" />
                 <div className="w13 h13 shadow-200" />
             </div>
    );
