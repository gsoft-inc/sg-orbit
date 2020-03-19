import { Dimmer, Image, Loader, Segment } from "semantic-ui-react";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Loader"))
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
             <div className="flex">
                 <div className="w-50">
                     <Segment>
                         <Dimmer active>
                             <Loader />
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader>Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active inverted>
                             <Loader inverted>Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Loader disabled />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader size="mini">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader size="tiny">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader size="small">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader size="medium">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                 </div>
                 <div className="w-50">
                     <Segment>
                         <Dimmer active>
                             <Loader size="large">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader size="big">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader size="huge">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment>
                         <Dimmer active>
                             <Loader size="massive">Loading</Loader>
                         </Dimmer>
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                     <Segment inverted>
                         <Loader active inverted />
                         <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                     </Segment>
                 </div>
             </div>
    );
