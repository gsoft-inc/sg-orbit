/* eslint max-len: 0 */

import { Dropdown } from "semantic-ui-react";
import { storiesBuilder } from "@utils/stories-builder";

function stories(segment) {
    return storiesBuilder(module, "Semantic-UI-Theme|dropdown")
        .segment(segment)
        .layoutWidth("1800px")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-row">
                 <div style={{ minWidth: "400px" }}>
                     <Dropdown
                         placeholder="Gender"
                         fluid
                         selection
                         options={[
                             {
                                 key: "Male",
                                 text: "Male",
                                 value: "Male"
                             },
                             {
                                 key: "Female",
                                 text: "Female",
                                 value: "Female"
                             }
                         ]}
                     />
                     <Dropdown
                         placeholder="Gender"
                         fluid
                         disabled
                         selection
                         options={[
                             {
                                 key: "Male",
                                 text: "Male",
                                 value: "Male"
                             },
                             {
                                 key: "Female",
                                 text: "Female",
                                 value: "Female"
                             }
                         ]}
                     />
                     <Dropdown
                         placeholder="Gender"
                         fluid
                         open
                         selection
                         options={[
                             {
                                 key: "Male",
                                 text: "Male",
                                 value: "Male"
                             },
                             {
                                 key: "Female",
                                 text: "Female",
                                 value: "Female"
                             }
                         ]}
                     />
                 </div>
                 <div style={{ minWidth: "400px" }}>
                     <Dropdown
                         placeholder="Gender"
                         fluid
                         className="small"
                         selection
                         options={[
                             {
                                 key: "Male",
                                 text: "Male",
                                 value: "Male"
                             },
                             {
                                 key: "Female",
                                 text: "Female",
                                 value: "Female"
                             }
                         ]}
                     />
                     <Dropdown
                         placeholder="Gender"
                         fluid
                         className="small"
                         open
                         selection
                         options={[
                             {
                                 key: "Male",
                                 text: "Male",
                                 value: "Male"
                             },
                             {
                                 key: "Female",
                                 text: "Female",
                                 value: "Female"
                             }
                         ]}
                     />
                 </div>
                 <div style={{ minWidth: "400px" }}>
                     <Dropdown
                         placeholder="Select Friend"
                         fluid
                         selection
                         options={[
                             {
                                 key: "Jenny Hess",
                                 text: "Jenny Hess",
                                 value: "Jenny Hess",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/women/4.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Elliot Fu",
                                 text: "Elliot Fu",
                                 value: "Elliot Fu",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/women/12.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Stevie Feliciano",
                                 text: "Stevie Feliciano",
                                 value: "Stevie Feliciano",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/men/14.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Christian",
                                 text: "Christian",
                                 value: "Christian",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/men/12.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Matt",
                                 text: "Matt",
                                 value: "Matt",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/men/44.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Justen Kitsune",
                                 text: "Justen Kitsune",
                                 value: "Justen Kitsune",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/women/14.jpg",
                                     size: "mini"
                                 }
                             }
                         ]}
                     />
                     <Dropdown
                         placeholder="Select Friend"
                         fluid
                         open
                         selection
                         options={[
                             {
                                 key: "Jenny Hess",
                                 text: "Jenny Hess",
                                 value: "Jenny Hess",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/women/4.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Elliot Fu",
                                 text: "Elliot Fu",
                                 value: "Elliot Fu",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/women/12.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Stevie Feliciano",
                                 text: "Stevie Feliciano",
                                 value: "Stevie Feliciano",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/men/14.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Christian",
                                 text: "Christian",
                                 value: "Christian",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/men/12.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Matt",
                                 text: "Matt",
                                 value: "Matt",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/men/44.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Justen Kitsune",
                                 text: "Justen Kitsune",
                                 value: "Justen Kitsune",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/women/14.jpg",
                                     size: "mini"
                                 }
                             }
                         ]}
                     />
                 </div>
                 <div style={{ minWidth: "400px" }}>
                     <Dropdown
                         placeholder="Select Friend"
                         fluid
                         className="small"
                         selection
                         options={[
                             {
                                 key: "Jenny Hess",
                                 text: "Jenny Hess",
                                 value: "Jenny Hess",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/women/4.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Elliot Fu",
                                 text: "Elliot Fu",
                                 value: "Elliot Fu",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/women/12.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Stevie Feliciano",
                                 text: "Stevie Feliciano",
                                 value: "Stevie Feliciano",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/men/14.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Christian",
                                 text: "Christian",
                                 value: "Christian",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/men/12.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Matt",
                                 text: "Matt",
                                 value: "Matt",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/men/44.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Justen Kitsune",
                                 text: "Justen Kitsune",
                                 value: "Justen Kitsune",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/women/14.jpg",
                                     size: "mini"
                                 }
                             }
                         ]}
                     />
                     <Dropdown
                         placeholder="Select Friend"
                         fluid
                         className="small"
                         open
                         selection
                         options={[
                             {
                                 key: "Jenny Hess",
                                 text: "Jenny Hess",
                                 value: "Jenny Hess",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/women/4.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Elliot Fu",
                                 text: "Elliot Fu",
                                 value: "Elliot Fu",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/women/12.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Stevie Feliciano",
                                 text: "Stevie Feliciano",
                                 value: "Stevie Feliciano",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/men/14.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Christian",
                                 text: "Christian",
                                 value: "Christian",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/men/12.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Matt",
                                 text: "Matt",
                                 value: "Matt",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/men/44.jpg",
                                     size: "mini"
                                 }
                             },
                             {
                                 key: "Justen Kitsune",
                                 text: "Justen Kitsune",
                                 value: "Justen Kitsune",
                                 image: {
                                     avatar: true,
                                     src: "https://randomuser.me/api/portraits/women/14.jpg",
                                     size: "mini"
                                 }
                             }
                         ]}
                     />
                 </div>
             </div>
    );
