import {
    AddIcon,
    ArrowFullIcon,
    ArrowOutlineIcon,
    CancelIcon,
    CheckmarkIcon,
    ChevronIcon,
    InfoIcon,
    MagnifierIcon
} from "@orbit-ui/icons";
import { SECTION } from "@stories/materials/icons/config";
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
                 <div className="mb4 flex">
                     <ChevronIcon className="h3 w3" />
                 </div>
                 <div className="mb4 flex">
                     <ArrowFullIcon className="w2 h2" />
                 </div>
                 <div className="mb4 flex">
                     <ArrowOutlineIcon className="w4 h4" />
                 </div>
                 <div className="mb4 flex">
                     <CancelIcon className="h3 w3" />
                 </div>
                 <div className="mb4 flex">
                     <AddIcon className="w4 h4" />
                 </div>
                 <div className="mb4 flex">
                     <MagnifierIcon className="w4 h4" />
                 </div>
                 <div className="mb4 flex">
                     <InfoIcon className="w4 h4" />
                 </div>
                 <div className="mb4 flex">
                     <CheckmarkIcon className="w4 h4" />
                 </div>
             </div>
    );
