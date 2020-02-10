/* eslint max-len: 0 */

import { TextArea } from "@orbit-ui/react-input/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("TextArea"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-column">
                 <TextArea placeholder="Tell us more" />
                 <TextArea disabled placeholder="Tell us more" />
                 <TextArea placeholder="Tell us more" style={{ minHeight: 100 }} />
                 <TextArea rows={2} placeholder="Tell us more" />
                 <TextArea success placeholder="Tell us more" />
                 <TextArea error placeholder="Tell us more" />
                 <TextArea focused placeholder="Tell us more" />
                 <TextArea transparent placeholder="Tell us more" />
             </div>
    );
