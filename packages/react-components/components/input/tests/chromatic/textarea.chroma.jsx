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
             <div className="flex flex-row">
                 <div className="w-50">
                     <TextArea placeholder="Tell us more" />
                     <TextArea disabled placeholder="Tell us more" />
                     <TextArea placeholder="Tell us more" style={{ minHeight: 100 }} />
                     <TextArea rows={2} placeholder="Tell us more" />
                     <TextArea success placeholder="Tell us more" />
                     <TextArea error placeholder="Tell us more" />
                     <TextArea focused placeholder="Tell us more" />
                     <TextArea transparent placeholder="Tell us more" />
                 </div>
                 <div className="w-50">
                     <TextArea size="small" placeholder="Tell us more" />
                     <TextArea size="medium" placeholder="Tell us more" />
                     <TextArea size="large" placeholder="Tell us more" />
                     <TextArea fluid placeholder="Tell us more" />
                 </div>
             </div>
    );
