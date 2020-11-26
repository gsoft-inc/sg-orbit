import { Inline } from "@react-components/layout";
import { storiesOfBuilder } from "@stories/utils";

function stories() {
    return storiesOfBuilder(module, "Chromatic/Borders")
        .build();
}

stories()
    .add("radiuses",
         () =>
             <Inline>
                 <div>
                     <div className="w13 h13 br1 overflow-hidden bg-cloud-200" alt="Astronaut floating in space" />
                 </div>
                 <div>
                     <div className="w13 h13 br2 overflow-hidden bg-cloud-200" alt="Astronaut floating in space" />
                 </div>
                 <div>
                     <div className="w13 h13 br3 overflow-hidden bg-cloud-200" alt="Astronaut floating in space" />
                 </div>
                 <div>
                     <div className="w13 h13 br4 overflow-hidden bg-cloud-200" alt="Astronaut floating in space" />
                 </div>
                 <div>
                     <div className="w13 h8 br-pill overflow-hidden bg-cloud-200" alt="Astronaut floating in space" />
                 </div>
                 <div>
                     <div className="w13 h13 br-100 overflow-hidden bg-cloud-200" alt="Astronaut floating in space" />
                 </div>
                 <div>
                     <div className="w13 h13 br0 overflow-hidden bg-cloud-200" alt="Astronaut floating in space" />
                 </div>
             </Inline>
    );
