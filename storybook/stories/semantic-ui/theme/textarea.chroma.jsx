/* eslint max-len: 0 */

import { Form, TextArea } from "semantic-ui-react";
import { createSemanticThemeSection } from "@utils/create-section";
import { paramsBuilder } from "@utils/params-builder";
import { storiesOfBuilder } from "@utils/stories-of-builder";

function stories(segment) {
    return storiesOfBuilder(module, createSemanticThemeSection("Textarea"))
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
