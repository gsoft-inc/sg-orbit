import { Dimmer, Image, Loader, Segment } from "semantic-ui-react";
import { storiesBuilder } from "@utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Semantic-UI-Theme|loader")
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
                     <Segment>
                         <Dimmer active>
                             <Loader className="paused" />
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader className="paused">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active inverted>
                             <Loader className="paused" inverted>Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Loader className="paused" disabled />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader className="paused" size="mini">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader className="paused" size="tiny">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader className="paused" size="small">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader className="paused" size="medium">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                 </div>
                 <div className="w-50">
                     <Segment>
                         <Dimmer active>
                             <Loader className="paused" size="large">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader className="paused" size="big">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader className="paused" size="huge">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader className="paused" size="massive">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment inverted>
                         <Loader className="paused" active inverted />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                 </div>
             </div>
    );
