/* eslint max-len: 0 */

import { Button, Icon, Label } from "semantic-ui-react";
import { createSemanticThemeSection } from "@utils/create-section";
import { paramsBuilder } from "@utils/params-builder";
import { storiesOfBuilder } from "@utils/stories-of-builder";

function stories(segment) {
    return storiesOfBuilder(module, createSemanticThemeSection("Label"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .chromaticDelay(100)
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
                     <div className="flex flex-column items-start">
                         <Label>Notification Sent</Label>
                         <Label>
                        Notification Sent <Icon name="search" />
                         </Label>
                         <Label>
                             <svg xmlns="http://www.w3.org/2000/svg" className="fill-marine-dark w5 h4 mr2" viewBox="0 0 25.5 19.5">
                                 <g data-name="Layer 2">
                                     <g data-name="Layer 1">
                                         <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                         <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                                     </g>
                                 </g>
                             </svg>
                        Notification Sent <Icon name="search" />
                         </Label>
                         <Label>
                             <svg xmlns="http://www.w3.org/2000/svg" className="fill-marine-dark w5 h4 mr2" viewBox="0 0 25.5 19.5">
                                 <g data-name="Layer 2">
                                     <g data-name="Layer 1">
                                         <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                         <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                                     </g>
                                 </g>
                             </svg>
                        Notification Sent
                         </Label>
                     </div>
                     <div className="flex flex-column items-start">
                         <Label circular>R</Label>
                         <Label circular size="mini">R</Label>
                         <Label circular size="tiny">R</Label>
                         <Label circular size="small">R</Label>
                         <Label circular size="medium">R</Label>
                         <Label circular size="large">R</Label>
                         <Label circular size="big">R</Label>
                         <Label circular size="huge">R</Label>
                         <Label circular size="massive">R</Label>
                         <Label circular size="mini" empty color="red" />
                     </div>
                     <div className="flex flex-column items-start">
                         <Label size="small">Notification Sent</Label>
                         <Label size="small">
                             <svg xmlns="http://www.w3.org/2000/svg" className="fill-marine-dark w5 h4 mr2" viewBox="0 0 25.5 19.5">
                                 <g data-name="Layer 2">
                                     <g data-name="Layer 1">
                                         <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                         <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                                     </g>
                                 </g>
                             </svg>
                        Notification Sent <Icon name="search" />
                         </Label>
                         <Label size="small">
                             <svg xmlns="http://www.w3.org/2000/svg" className="fill-marine-dark w5 h4 mr2" viewBox="0 0 25.5 19.5">
                                 <g data-name="Layer 2">
                                     <g data-name="Layer 1">
                                         <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                         <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                                     </g>
                                 </g>
                             </svg>
                        Notification Sent
                         </Label>
                         <Label size="small">
                        Notification Sent <Icon name="search" />
                         </Label>
                         <Label size="large">Notification Sent</Label>
                         <Label size="large">
                             <svg xmlns="http://www.w3.org/2000/svg" className="fill-marine-dark w5 h4 mr2" viewBox="0 0 25.5 19.5">
                                 <g data-name="Layer 2">
                                     <g data-name="Layer 1">
                                         <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                         <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                                     </g>
                                 </g>
                             </svg>
                        Notification Sent <Icon name="search" />
                         </Label>
                         <Label size="large">
                             <svg xmlns="http://www.w3.org/2000/svg" className="fill-marine-dark w5 h4 mr2" viewBox="0 0 25.5 19.5">
                                 <g data-name="Layer 2">
                                     <g data-name="Layer 1">
                                         <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                         <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                                     </g>
                                 </g>
                             </svg>
                        Notification Sent
                         </Label>
                         <Label size="large">
                        Notification Sent <Icon name="search" />
                         </Label>
                     </div>
                     <div className="flex flex-column items-start">
                         <Label>
                             <Label circular empty size="mini" color="red" />
                        Group added
                         </Label>
                         <Label>
                             <Label circular empty size="mini" color="red" />
                        Group added
                             <Button icon circular size="tiny" className="transparent">
                                 <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                                     <g transform="rotate(45 7.207 4.793)">
                                         <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                         <rect x="5" y=".828" width="2" height="12" rx="1" />
                                     </g>
                                 </svg>
                             </Button>
                         </Label>
                         <Label>
                             <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="fill-marine-dark w5 h4 mr2"
                                 viewBox="0 0 25.5 19.5"
                             >
                                 <g data-name="Layer 2">
                                     <g data-name="Layer 1">
                                         <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                         <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                                     </g>
                                 </g>
                             </svg>
                        Group added
                             <Button icon circular size="tiny" className="transparent">
                                 <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                                     <g transform="rotate(45 7.207 4.793)">
                                         <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                         <rect x="5" y=".828" width="2" height="12" rx="1" />
                                     </g>
                                 </svg>
                             </Button>
                         </Label>
                         <Label>
                             <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="fill-marine-dark w5 h4 mr2"
                                 viewBox="0 0 25.5 19.5"
                             >
                                 <g data-name="Layer 2">
                                     <g data-name="Layer 1">
                                         <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                         <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                                     </g>
                                 </g>
                             </svg>
                        Group added
                             <Button disabled icon circular size="tiny" className="transparent">
                                 <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                                     <g transform="rotate(45 7.207 4.793)">
                                         <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                         <rect x="5" y=".828" width="2" height="12" rx="1" />
                                     </g>
                                 </svg>
                             </Button>
                         </Label>
                     </div>
                     <div className="flex flex-column items-start">
                         <Label size="small">
                             <Label circular empty size="mini" color="red" />
                        Group added
                         </Label>
                         <Label size="small">
                             <Label circular empty size="mini" color="red" />
                        Group added
                             <Button icon circular size="tiny" className="transparent">
                                 <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                                     <g transform="rotate(45 7.207 4.793)">
                                         <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                         <rect x="5" y=".828" width="2" height="12" rx="1" />
                                     </g>
                                 </svg>
                             </Button>
                         </Label>
                         <Label size="small">
                             <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="fill-marine-dark w5 h4 mr2"
                                 viewBox="0 0 25.5 19.5"
                             >
                                 <g data-name="Layer 2">
                                     <g data-name="Layer 1">
                                         <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                         <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                                     </g>
                                 </g>
                             </svg>
                        Group added
                             <Button icon circular size="tiny" className="transparent">
                                 <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                                     <g transform="rotate(45 7.207 4.793)">
                                         <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                         <rect x="5" y=".828" width="2" height="12" rx="1" />
                                     </g>
                                 </svg>
                             </Button>
                         </Label>
                         <Label size="small">
                             <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="fill-marine-dark w5 h4 mr2"
                                 viewBox="0 0 25.5 19.5"
                             >
                                 <g data-name="Layer 2">
                                     <g data-name="Layer 1">
                                         <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                         <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                                     </g>
                                 </g>
                             </svg>
                        Group added
                             <Button disabled icon circular size="tiny" className="transparent">
                                 <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                                     <g transform="rotate(45 7.207 4.793)">
                                         <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                         <rect x="5" y=".828" width="2" height="12" rx="1" />
                                     </g>
                                 </svg>
                             </Button>
                         </Label>
                     </div>
                     <div className="flex flex-column items-start">
                         <Label size="large">
                             <Label circular empty size="mini" color="red" />
                        Group added
                         </Label>
                         <Label size="large">
                             <Label circular empty size="mini" color="red" />
                        Group added
                             <Button icon circular size="tiny" className="transparent">
                                 <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                                     <g transform="rotate(45 7.207 4.793)">
                                         <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                         <rect x="5" y=".828" width="2" height="12" rx="1" />
                                     </g>
                                 </svg>
                             </Button>
                         </Label>
                         <Label size="large">
                             <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="fill-marine-dark w5 h4 mr2"
                                 viewBox="0 0 25.5 19.5"
                             >
                                 <g data-name="Layer 2">
                                     <g data-name="Layer 1">
                                         <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                         <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                                     </g>
                                 </g>
                             </svg>
                        Group added
                             <Button icon circular size="tiny" className="transparent">
                                 <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                                     <g transform="rotate(45 7.207 4.793)">
                                         <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                         <rect x="5" y=".828" width="2" height="12" rx="1" />
                                     </g>
                                 </svg>
                             </Button>
                         </Label>
                         <Label size="large">
                             <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="fill-marine-dark w5 h4 mr2"
                                 viewBox="0 0 25.5 19.5"
                             >
                                 <g data-name="Layer 2">
                                     <g data-name="Layer 1">
                                         <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                         <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                                     </g>
                                 </g>
                             </svg>
                        Group added
                             <Button disabled icon circular size="tiny" className="transparent">
                                 <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                                     <g transform="rotate(45 7.207 4.793)">
                                         <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                         <rect x="5" y=".828" width="2" height="12" rx="1" />
                                     </g>
                                 </svg>
                             </Button>
                         </Label>
                     </div>
                 </div>
             </>
    ).add("basic", () =>
        <div className="flex flex-row">
            <div className="flex flex-column items-start">
                <Label basic size="small">Notification Sent</Label>
                <Label basic size="small">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-marine-dark w5 h4 mr2" viewBox="0 0 25.5 19.5">
                        <g data-name="Layer 2">
                            <g data-name="Layer 1">
                                <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                            </g>
                        </g>
                    </svg>
                        Notification Sent <Icon name="search" />
                </Label>
                <Label basic size="small">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-marine-dark w5 h4 mr2" viewBox="0 0 25.5 19.5">
                        <g data-name="Layer 2">
                            <g data-name="Layer 1">
                                <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                            </g>
                        </g>
                    </svg>
                        Notification Sent
                </Label>
                <Label basic size="small">
                        Notification Sent <Icon name="search" />
                </Label>
                <Label basic size="large">Notification Sent</Label>
                <Label basic size="large">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-marine-dark w5 h4 mr2" viewBox="0 0 25.5 19.5">
                        <g data-name="Layer 2">
                            <g data-name="Layer 1">
                                <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                            </g>
                        </g>
                    </svg>
                        Notification Sent <Icon name="search" />
                </Label>
                <Label basic size="large">
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-marine-dark w5 h4 mr2" viewBox="0 0 25.5 19.5">
                        <g data-name="Layer 2">
                            <g data-name="Layer 1">
                                <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                            </g>
                        </g>
                    </svg>
                        Notification Sent
                </Label>
                <Label basic size="large">
                        Notification Sent <Icon name="search" />
                </Label>
            </div>
            <div className="flex flex-column items-start">
                <Label basic>
                    <Label circular empty size="mini" color="red" />
                        Group added
                </Label>
                <Label basic>
                    <Label circular empty size="mini" color="red" />
                        Group added
                    <Button icon circular size="tiny" className="transparent">
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                            <g transform="rotate(45 7.207 4.793)">
                                <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                <rect x="5" y=".828" width="2" height="12" rx="1" />
                            </g>
                        </svg>
                    </Button>
                </Label>
                <Label basic>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-marine-dark w5 h4 mr2"
                        viewBox="0 0 25.5 19.5"
                    >
                        <g data-name="Layer 2">
                            <g data-name="Layer 1">
                                <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                            </g>
                        </g>
                    </svg>
                        Group added
                    <Button icon circular size="tiny" className="transparent">
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                            <g transform="rotate(45 7.207 4.793)">
                                <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                <rect x="5" y=".828" width="2" height="12" rx="1" />
                            </g>
                        </svg>
                    </Button>
                </Label>
                <Label basic>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-marine-dark w5 h4 mr2"
                        viewBox="0 0 25.5 19.5"
                    >
                        <g data-name="Layer 2">
                            <g data-name="Layer 1">
                                <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                            </g>
                        </g>
                    </svg>
                        Group added
                    <Button disabled icon circular size="tiny" className="transparent">
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                            <g transform="rotate(45 7.207 4.793)">
                                <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                <rect x="5" y=".828" width="2" height="12" rx="1" />
                            </g>
                        </svg>
                    </Button>
                </Label>
            </div>
            <div className="flex flex-column items-start">
                <Label basic size="small">
                    <Label circular empty size="mini" color="red" />
                        Group added
                </Label>
                <Label basic size="small">
                    <Label circular empty size="mini" color="red" />
                        Group added
                    <Button icon circular size="tiny" className="transparent">
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                            <g transform="rotate(45 7.207 4.793)">
                                <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                <rect x="5" y=".828" width="2" height="12" rx="1" />
                            </g>
                        </svg>
                    </Button>
                </Label>
                <Label basic size="small">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-marine-dark w5 h4 mr2"
                        viewBox="0 0 25.5 19.5"
                    >
                        <g data-name="Layer 2">
                            <g data-name="Layer 1">
                                <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                            </g>
                        </g>
                    </svg>
                        Group added
                    <Button icon circular size="tiny" className="transparent">
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                            <g transform="rotate(45 7.207 4.793)">
                                <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                <rect x="5" y=".828" width="2" height="12" rx="1" />
                            </g>
                        </svg>
                    </Button>
                </Label>
                <Label basic size="small">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-marine-dark w5 h4 mr2"
                        viewBox="0 0 25.5 19.5"
                    >
                        <g data-name="Layer 2">
                            <g data-name="Layer 1">
                                <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                            </g>
                        </g>
                    </svg>
                        Group added
                    <Button disabled icon circular size="tiny" className="transparent">
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                            <g transform="rotate(45 7.207 4.793)">
                                <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                <rect x="5" y=".828" width="2" height="12" rx="1" />
                            </g>
                        </svg>
                    </Button>
                </Label>
            </div>
            <div className="flex flex-column items-start">
                <Label basic size="large">
                    <Label circular empty size="mini" color="red" />
                        Group added
                </Label>
                <Label basic size="large">
                    <Label circular empty size="mini" color="red" />
                        Group added
                    <Button icon circular size="tiny" className="transparent">
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                            <g transform="rotate(45 7.207 4.793)">
                                <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                <rect x="5" y=".828" width="2" height="12" rx="1" />
                            </g>
                        </svg>
                    </Button>
                </Label>
                <Label basic size="large">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-marine-dark w5 h4 mr2"
                        viewBox="0 0 25.5 19.5"
                    >
                        <g data-name="Layer 2">
                            <g data-name="Layer 1">
                                <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                            </g>
                        </g>
                    </svg>
                        Group added
                    <Button icon circular size="tiny" className="transparent">
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                            <g transform="rotate(45 7.207 4.793)">
                                <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                <rect x="5" y=".828" width="2" height="12" rx="1" />
                            </g>
                        </svg>
                    </Button>
                </Label>
                <Label basic size="large">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-marine-dark w5 h4 mr2"
                        viewBox="0 0 25.5 19.5"
                    >
                        <g data-name="Layer 2">
                            <g data-name="Layer 1">
                                <path d="M22.75 19.5h-20A2.75 2.75 0 0 1 0 16.75v-14A2.75 2.75 0 0 1 2.75 0h20a2.75 2.75 0 0 1 2.75 2.75v14a2.75 2.75 0 0 1-2.75 2.75zm-20-18A1.25 1.25 0 0 0 1.5 2.75v14A1.25 1.25 0 0 0 2.75 18h20A1.25 1.25 0 0 0 24 16.75v-14a1.25 1.25 0 0 0-1.25-1.25z" />
                                <path d="M12.75 11.5a.72.72 0 0 1-.46-.16l-9-7a.75.75 0 0 1 .92-1.18l8.54 6.64 8.54-6.64a.75.75 0 0 1 .92 1.18l-9 7a.72.72 0 0 1-.46.16zM3.75 16.5a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l4-4a.75.75 0 1 1 1.06 1.06l-4 4a.74.74 0 0 1-.53.22zM21.75 16.5a.74.74 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06.74.74 0 0 1-.53.22z" />
                            </g>
                        </g>
                    </svg>
                        Group added
                    <Button disabled icon circular size="tiny" className="transparent">
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                            <g transform="rotate(45 7.207 4.793)">
                                <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                <rect x="5" y=".828" width="2" height="12" rx="1" />
                            </g>
                        </svg>
                    </Button>
                </Label>
            </div>
        </div>
    );
