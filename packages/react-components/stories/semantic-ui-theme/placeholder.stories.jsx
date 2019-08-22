import { Placeholder, Segment } from "semantic-ui-react";
import { storiesBuilder } from "../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Semantic-UI-Theme|placeholder")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
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
