import { Placeholder, Segment } from "semantic-ui-react";
import { createChromaticSection } from "@utils/create-section";
import { paramsBuilder } from "@utils/params-builder";
import { storiesOfBuilder } from "@utils/stories-of-builder";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Placeholder"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .chromaticDelay(100)
                .width("80%")
                .build()
        )
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-row">
                 <div className="w-50">
                     <Placeholder className="paused">
                         <Placeholder.Header image>
                             <Placeholder.Line />
                             <Placeholder.Line />
                         </Placeholder.Header>
                         <Placeholder.Paragraph>
                             <Placeholder.Line />
                             <Placeholder.Line />
                             <Placeholder.Line />
                             <Placeholder.Line />
                         </Placeholder.Paragraph>
                     </Placeholder>
                     <Placeholder className="paused">
                         <Placeholder.Line />
                         <Placeholder.Line />
                         <Placeholder.Line />
                         <Placeholder.Line />
                         <Placeholder.Line />
                     </Placeholder>
                     <Placeholder className="paused">
                         <Placeholder.Header image>
                             <Placeholder.Line />
                             <Placeholder.Line />
                         </Placeholder.Header>
                     </Placeholder>
                     <Placeholder className="paused">
                         <Placeholder.Paragraph>
                             <Placeholder.Line />
                             <Placeholder.Line />
                             <Placeholder.Line />
                             <Placeholder.Line />
                             <Placeholder.Line />
                         </Placeholder.Paragraph>
                         <Placeholder.Paragraph>
                             <Placeholder.Line />
                             <Placeholder.Line />
                             <Placeholder.Line />
                         </Placeholder.Paragraph>
                     </Placeholder>
                 </div>
                 <div className="w-50">
                     <Placeholder className="paused" style={{ height: 150, width: 150 }}>
                         <Placeholder.Image />
                     </Placeholder>
                     <Placeholder className="paused" fluid>
                         <Placeholder.Header image>
                             <Placeholder.Line />
                             <Placeholder.Line />
                         </Placeholder.Header>
                         <Placeholder.Paragraph>
                             <Placeholder.Line />
                             <Placeholder.Line />
                             <Placeholder.Line />
                         </Placeholder.Paragraph>
                     </Placeholder>
                     <Segment inverted>
                         <Placeholder className="paused" inverted>
                             <Placeholder.Header image>
                                 <Placeholder.Line />
                                 <Placeholder.Line />
                             </Placeholder.Header>
                             <Placeholder.Paragraph>
                                 <Placeholder.Line />
                                 <Placeholder.Line />
                                 <Placeholder.Line />
                             </Placeholder.Paragraph>
                         </Placeholder>
                     </Segment>
                 </div>
             </div>
    );
