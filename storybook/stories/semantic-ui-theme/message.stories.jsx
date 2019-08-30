/* eslint max-len: 0 */

import { Icon, Message } from "semantic-ui-react";
import { storiesBuilder } from "@utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Semantic-UI-Theme|message")
        .segment(segment)
        .layoutWidth("1800px")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("default",
         () =>
             <>
                 <Message>
                     <Message.Header>Changes in Service</Message.Header>
                     <p>
                        We updated our privacy policy here to better service our customers. We
                        recommend reviewing the changes.
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
                       <Icon name="delete" />
                       <Message.Content>
                           <Message.Header>Just one second</Message.Header>
                            We are fetching that content for you.
                       </Message.Content>
                   </Message>
                <Message
                    header="Welcome back!"
                    content="This is a special notification which you can dismiss."
                />
                <Message compact>
                    Get all the best inventions in your e-mail every day. Sign up now!
                </Message>
                <Message info>
                    <Message.Header>Was this what you wanted?</Message.Header>
                    <p>Did you know it's been a while?</p>
                </Message>
                <Message warning>
                    <Message.Header>You must register before you can do that!</Message.Header>
                    <p>Visit our registration page, then try again.</p>
                </Message>
                <Message positive>
                    <Message.Header>You are eligible for a reward</Message.Header>
                    <p>Go to your <b>special offers</b> page to see now.</p>
                </Message>
                <Message negative>
                    <Message.Header>We're sorry we can't apply that discount</Message.Header>
                    <p>That offer has expired</p>
                </Message>
             </>
    );
