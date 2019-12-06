import { SECTION } from "@stories/materials/layout/config";
import { paramsBuilder } from "@utils/params-builder";
import { storiesOfBuilder } from "@utils/stories-of-builder";

function stories() {
    return storiesOfBuilder(module, `${SECTION}/chromatic`)
        .parameters(
            paramsBuilder()
                .sortLast()
                .chromaticDelay(100)
                .sortLast()
                .build()
        )
        .build();
}

stories()
    .add("default",
         () =>
             <div>
                 <div>
                     <div className="w1 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w2 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w3 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w4 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w5 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w6 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w7 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w8 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w9 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w10 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w11 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w12 h4 mb4 bg-sunray-400" />
                 </div>
                 <div>
                     <div className="w13 h4 mb4 bg-sunray-400" />
                 </div>
             </div>
    );
