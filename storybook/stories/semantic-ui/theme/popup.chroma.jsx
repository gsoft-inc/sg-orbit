/* eslint max-len: 0 */

import { Button, Popup } from "semantic-ui-react";
import { createChromaticSection } from "@utils/create-section";
import { paramsBuilder } from "@utils/params-builder";
import { storiesOfBuilder } from "@utils/stories-of-builder";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Popup"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .chromaticDelay(100)
                .width("1800px")
                .build()
        )
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-row">
                 <div className="flex flex-column w-50">
                     <div className="mb13 pb13">
                         <Popup
                             open
                             content="Adds users to your feed"
                             trigger={<Button>Add</Button>}
                         />
                     </div>
                     <div className="mb13 pb13">
                         <Popup
                             basic
                             open
                             content="Adds users to your feed"
                             trigger={<Button>Add</Button>}
                         />
                     </div>
                     <div className="mb13 pb13">
                         <Popup
                             wide
                             open
                             content="This is a wide pop-up which allows for lots of content with additional space. You can fit a lot of words here and the paragraphs will be pretty wide."
                             trigger={<Button>Add</Button>}
                         />
                     </div>
                     <div className="mb13">
                         <Popup
                             wide="very"
                             open
                             content="This is a wide pop-up which allows for lots of content with additional space. You can fit a lot of words here and the paragraphs will be pretty wide."
                             trigger={<Button>Add</Button>}
                         />
                     </div>
                 </div>
                 <div className="flex flex-column w-50">
                     <div className="mb13 pb13">
                         <Popup
                             inverted
                             open
                             content="Once upon a midnight dreary, while I pondered, weak and weary, Over many a quaint and curious volume of forgotten lore"
                             trigger={<Button>Read</Button>}
                         />
                     </div>
                     <div className="mb13 pb13">
                         <Popup trigger={<Button>Read</Button>} position="bottom center" open className="flush">
                             <Popup.Content className="pa10">
                                 <div>Hello is it tea you are looking for?</div>
                             </Popup.Content>
                         </Popup>
                     </div>
                     <div className="mb13 pt13">
                         <Popup
                             open
                             content="Adds users to your feed"
                             trigger={<Button>Add</Button>}
                             position="right center"
                         />
                     </div><div className="mb13">
                         <Popup
                             open
                             content="Adds users to your feed"
                             trigger={<Button>Add</Button>}
                             position="left center"
                         />
                     </div>
                 </div>
             </div>
    );
