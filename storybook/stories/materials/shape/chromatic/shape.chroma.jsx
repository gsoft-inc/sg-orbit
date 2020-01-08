import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories() {
    return storiesOfBuilder(module, createChromaticSection("Shape"))
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-row">
                 <div className="mr5 flex flex-column">
                     <div className="w13 h13 br1 overflow-hidden bg-cloud-200" alt="Astronaut floating in space" />
                 </div>
                 <div className="mr5 flex flex-column">
                     <div className="w13 h13 br2 overflow-hidden bg-cloud-200" alt="Astronaut floating in space" />
                 </div>
                 <div className="mr5 flex flex-column">
                     <div className="w13 h13 br3 overflow-hidden bg-cloud-200" alt="Astronaut floating in space" />
                 </div>
                 <div className="mr5 flex flex-column">
                     <div className="w13 h13 br4 overflow-hidden bg-cloud-200" alt="Astronaut floating in space" />
                 </div>
                 <div className="mr5 flex flex-column">
                     <div className="w13 h8 br-pill overflow-hidden bg-cloud-200" alt="Astronaut floating in space" />
                 </div>
                 <div className="mr5 flex flex-column">
                     <div className="w13 h13 br-100 overflow-hidden bg-cloud-200" alt="Astronaut floating in space" />
                 </div>
                 <div className="mr5 flex flex-column">
                     <div className="w13 h13 br0 overflow-hidden bg-cloud-200" alt="Astronaut floating in space" />
                 </div>
             </div>
    );
