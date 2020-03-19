import { Tag } from "@orbit-ui/react-label/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Tag"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex">
                 <div className="flex flex-column items-start">
                     <Tag className="bg-red" size="mini" />
                     <Tag className="bg-red" size="tiny" />
                     <Tag className="bg-red" size="small" />
                     <Tag className="bg-red" size="medium" />
                     <Tag className="bg-red" size="large" />
                     <Tag className="bg-red" size="big" />
                     <Tag className="bg-red" size="huge" />
                     <Tag className="bg-red" size="massive" />
                 </div>
             </div>
    );
