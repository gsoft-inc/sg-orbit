/* eslint max-len: 0 */

import { Label, Menu, Tab } from "semantic-ui-react";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Tab"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default",
         () =>
             <>
                 <Tab
                     menu={{ secondary: true, pointing: true }}
                     panes={[
                         {
                             menuItem: "Star",
                             render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>
                         },
                         {
                             menuItem: "Rocket",
                             render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
                         },
                         {
                             menuItem: "Galaxy",
                             render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
                         }
                     ]}
                 />
                 <Tab
                     menu={{ secondary: true, pointing: true }}
                     defaultActiveIndex={2}
                     panes={[
                         {
                             menuItem: "Star",
                             render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>
                         },
                         {
                             menuItem: "Rocket",
                             render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
                         },
                         {
                             menuItem: "Galaxy",
                             render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
                         }
                     ]}
                 />
                 <Tab
                     menu={{ secondary: true, pointing: true }}
                     panes={[
                         {
                             menuItem: { key: "users", content: "Users" },
                             render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>
                         },
                         {
                             menuItem: (
                                 <Menu.Item key="messages" className="with-label">
                                    Messages
                                     <Label className="primary" size="tiny">
                                    NEW
                                     </Label>
                                 </Menu.Item>
                             ),
                             render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
                         }
                     ]}
                 />
                 <Tab
                     menu={{ secondary: true, pointing: true }}
                     defaultActiveIndex={1}
                     panes={[
                         {
                             menuItem: { key: "users", content: "Users" },
                             render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>
                         },
                         {
                             menuItem: (
                                 <Menu.Item key="messages" className="with-label">
                                    Messages
                                     <Label className="primary" size="tiny">
                                    NEW
                                     </Label>
                                 </Menu.Item>
                             ),
                             render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>
                         }
                     ]}
                 />
             </>
    );
