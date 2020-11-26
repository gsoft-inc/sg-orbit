import { storiesOfBuilder } from "@stories/utils";

function stories() {
    return storiesOfBuilder(module, "Chromatic/Spacing")
        .build();
}

stories()
    .add("default",
         () =>
             <>
                 <div className="w1 h4 mb4 bg-sunray-400" />
                 <div className="w2 h4 mb4 bg-sunray-400" />
                 <div className="w3 h4 mb4 bg-sunray-400" />
                 <div className="w4 h4 mb4 bg-sunray-400" />
                 <div className="w5 h4 mb4 bg-sunray-400" />
                 <div className="w6 h4 mb4 bg-sunray-400" />
                 <div className="w7 h4 mb4 bg-sunray-400" />
                 <div className="w8 h4 mb4 bg-sunray-400" />
                 <div className="w9 h4 mb4 bg-sunray-400" />
                 <div className="w10 h4 mb4 bg-sunray-400" />
                 <div className="w11 h4 mb4 bg-sunray-400" />
                 <div className="w12 h4 mb4 bg-sunray-400" />
                 <div className="w13 h4 mb4 bg-sunray-400" />
             </>
    );
