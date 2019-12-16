/* eslint max-len: 0 */

import { Button, Message } from "semantic-ui-react";
import { createChromaticSection } from "@utils/create-section";
import { paramsBuilder } from "@utils/params-builder";
import { storiesOfBuilder } from "@utils/stories-of-builder";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Message"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .chromaticDelay(100)
                .width("1800px")
                .sortLast()
                .build()
        )
        .build();
}

stories()
    .add("default",
         () =>
             <>
                 <div className="flex flex-row">
                     <div className="flex flex-column">
                         <Message>
                             <Message.Header>Setup a security policy for external sharing</Message.Header>
                             <p>
                        Easily manage external sharing links and set-up automatic access reviews for entrusted group owners.
                             </p>
                         </Message>
                         <Message>
                             <Message.Header>New Site Features</Message.Header>
                             <Message.List>
                                 <Message.Item>You can now have cover images on blog pages</Message.Item>
                                 <Message.Item>Drafts will now auto-save while writing</Message.Item>
                             </Message.List>
                         </Message>
                         <Message icon>
                             <Button>Click Here</Button>
                             <Message.Content>
                                 <Message.Header>Just one second</Message.Header>
                                 <p>We are fetching that content for you.</p>
                             </Message.Content>
                         </Message>
                         <Message icon>
                             <Message.Content>
                                 <Message.Header>Just one second</Message.Header>
                                 <p>We are fetching that content for you.</p>
                             </Message.Content>
                             <Button>Click Here</Button>
                         </Message>
                         <Message
                             onDismiss
                             header="Welcome back!"
                             content="This is a special notification which you can dismiss."
                         />
                         <Message compact>
                    Get all the best inventions in your e-mail every day. Sign up now!
                         </Message>
                     </div>
                     <div className="flex flex-column ml4">
                         <Message info>
                             <Message.Header>Was this what you wanted?</Message.Header>
                             <p>Did you know it's been a while?</p>
                         </Message>
                         <Message positive>
                             <Message.Header>You are eligible for a reward</Message.Header>
                             <p>Go to your <span className="fw6">special offers</span> page to see now.</p>
                         </Message>
                         <Message warning>
                             <Message.Header>You must register before you can do that!</Message.Header>
                             <p>Visit our registration page, then try again.</p>
                         </Message>
                         <Message negative>
                             <Message.Header>We're sorry we can't apply that discount</Message.Header>
                             <p>That offer has expired</p>
                         </Message>
                         <Message floating>
                             <Message.Header>Was this what you wanted?</Message.Header>
                             <p>Did you know it's been a while?</p>
                         </Message>
                         <Message size="small">
                             <p>This group external shares won’t be reviewed until you entrust its group owners.</p>
                         </Message>
                     </div>
                 </div>
             </>
    );
