/* eslint max-len: 0 */

import { Form, TextArea } from "semantic-ui-react";
import { storiesBuilder } from "../../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Semantic-UI-Theme|textarea")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-column">
                 <Form>
                     <TextArea placeholder="Tell us more" />
                 </Form>
                 <Form>
                     <TextArea disabled placeholder="Tell us more" />
                 </Form>
                 <Form>
                     <TextArea placeholder="Tell us more" style={{ minHeight: 100 }} />
                 </Form>
                 <Form>
                     <TextArea rows={2} placeholder="Tell us more" />
                 </Form>
             </div>
    );
