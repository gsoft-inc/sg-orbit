import { Placeholder, Segment } from "semantic-ui-react";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Placeholder"))
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
                     <Placeholder>
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
                     <Placeholder>
                         <Placeholder.Line />
                         <Placeholder.Line />
                         <Placeholder.Line />
                         <Placeholder.Line />
                         <Placeholder.Line />
                     </Placeholder>
                     <Placeholder>
                         <Placeholder.Header image>
                             <Placeholder.Line />
                             <Placeholder.Line />
                         </Placeholder.Header>
                     </Placeholder>
                     <Placeholder>
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
                     <Placeholder style={{ height: 150, width: 150 }}>
                         <Placeholder.Image />
                     </Placeholder>
                     <Placeholder fluid>
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
                         <Placeholder inverted>
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
