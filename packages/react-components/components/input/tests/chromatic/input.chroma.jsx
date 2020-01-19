import { Input } from "@orbit-ui/react-input/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

// TODO: variations doesn't make sense right now since error and success are also variations and are part of default & transparent stories.

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Input"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-row">
                 <div className="flex flex-row">
                     <div className="flex flex-column items-start">
                         <Input placeholder="Search..." />
                         <Input focus placeholder="Search..." />
                         <Input disabled placeholder="Search..." />
                         <Input placeholder="Search..." defaultValue="Obiwan" />
                         <Input focus placeholder="Search..." defaultValue="Obiwan" />
                         <Input disabled placeholder="Search..." defaultValue="Obiwan" />
                         <Input icon="search" placeholder="Search..." />
                         <Input focus icon="search" placeholder="Search..." />
                         <Input disabled icon="search" placeholder="Search..." />
                         <Input icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input icon="search" iconPosition="left" placeholder="Search..." />
                         <Input icon="search" focus iconPosition="left" placeholder="Search..." />
                         <Input icon="search" disabled iconPosition="left" placeholder="Search..." />
                         <Input icon="search" iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                         <Input icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                         <Input icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                     </div>
                     <div className="flex flex-column items-start">
                         <Input loading className="paused" placeholder="Search..." />
                         <Input loading className="paused" disabled placeholder="Search..." />
                         <Input loading className="paused" disabled placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused" icon="search" placeholder="Search..." />
                         <Input loading className="paused" focus icon="search" placeholder="Search..." />
                         <Input loading className="paused" disabled icon="search" placeholder="Search..." />
                         <Input loading className="paused" icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused" focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused" disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused" icon="search" iconPosition="left" placeholder="Search..." />
                         <Input loading className="paused" icon="search" focus iconPosition="left" placeholder="Search..." />
                         <Input loading className="paused" icon="search" disabled iconPosition="left" placeholder="Search..." />
                         <Input loading className="paused" icon="search" iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused" icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused" icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                     </div>
                 </div>
                 <div className="flex flex-row">
                     <div className="flex flex-column items-start">
                         <Input className="success" placeholder="Search..." />
                         <Input className="success" focus placeholder="Search..." />
                         <Input className="success" disabled placeholder="Search..." />
                         <Input className="success" placeholder="Search..." defaultValue="Obiwan" />
                         <Input className="success" focus placeholder="Search..." defaultValue="Obiwan" />
                         <Input className="success" disabled placeholder="Search..." defaultValue="Obiwan" />
                         <Input className="success" icon="search" placeholder="Search..." />
                         <Input className="success" focus icon="search" placeholder="Search..." />
                         <Input className="success" disabled icon="search" placeholder="Search..." />
                         <Input className="success" icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input className="success" focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input className="success" disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input className="success" icon="search" iconPosition="left" placeholder="Search..." />
                         <Input className="success" icon="search" focus iconPosition="left" placeholder="Search..." />
                         <Input className="success" icon="search" disabled iconPosition="left" placeholder="Search..." />
                         <Input className="success" icon="search" iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                         <Input className="success" icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                         <Input className="success" icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                     </div>
                     <div className="flex flex-column items-start">
                         <Input loading className="paused success" placeholder="Search..." />
                         <Input loading className="paused success" disabled placeholder="Search..." />
                         <Input loading className="paused success" disabled placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused success" icon="search" placeholder="Search..." />
                         <Input loading className="paused success" focus icon="search" placeholder="Search..." />
                         <Input loading className="paused success" disabled icon="search" placeholder="Search..." />
                         <Input loading className="paused success" icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused success" focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused success" disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused success" icon="search" iconPosition="left" placeholder="Search..." />
                         <Input loading className="paused success" icon="search" focus iconPosition="left" placeholder="Search..." />
                         <Input loading className="paused success" icon="search" disabled iconPosition="left" placeholder="Search..." />
                         <Input loading className="paused success" icon="search" iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused success" icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused success" icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                     </div>
                 </div>
                 <div className="flex flex-row">
                     <div className="flex flex-column items-start">
                         <Input error placeholder="Search..." />
                         <Input error focus placeholder="Search..." />
                         <Input error disabled placeholder="Search..." />
                         <Input error placeholder="Search..." defaultValue="Obiwan" />
                         <Input error focus placeholder="Search..." defaultValue="Obiwan" />
                         <Input error disabled placeholder="Search..." defaultValue="Obiwan" />
                         <Input error icon="search" placeholder="Search..." />
                         <Input error focus icon="search" placeholder="Search..." />
                         <Input error disabled icon="search" placeholder="Search..." />
                         <Input error icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input error focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input error disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input error icon="search" iconPosition="left" placeholder="Search..." />
                         <Input error icon="search" focus iconPosition="left" placeholder="Search..." />
                         <Input error icon="search" disabled iconPosition="left" placeholder="Search..." />
                         <Input error icon="search" iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                         <Input error icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                         <Input error icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                     </div>
                     <div className="flex flex-column items-start">
                         <Input loading className="paused" error placeholder="Search..." />
                         <Input loading className="paused" error disabled placeholder="Search..." />
                         <Input loading className="paused" error disabled placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused" error icon="search" placeholder="Search..." />
                         <Input loading className="paused" error focus icon="search" placeholder="Search..." />
                         <Input loading className="paused" error disabled icon="search" placeholder="Search..." />
                         <Input loading className="paused" error icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused" error focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused" error disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused" error icon="search" iconPosition="left" placeholder="Search..." />
                         <Input loading className="paused" error icon="search" focus iconPosition="left" placeholder="Search..." />
                         <Input loading className="paused" error icon="search" disabled iconPosition="left" placeholder="Search..." />
                         <Input loading className="paused" error icon="search" iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused" error icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading className="paused" error icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                     </div>
                 </div>
             </div>
    )
    .add("transparent",
         () =>
             <div className="flex flex-row">
                 <div className="flex flex-row">
                     <div className="flex flex-column items-start">
                         <Input transparent placeholder="Search..." />
                         <Input transparent focus placeholder="Search..." />
                         <Input transparent disabled placeholder="Search..." />
                         <Input transparent placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent focus placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent disabled placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent icon="search" placeholder="Search..." />
                         <Input transparent focus icon="search" placeholder="Search..." />
                         <Input transparent disabled icon="search" placeholder="Search..." />
                         <Input transparent icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent icon="search" iconPosition="left" placeholder="Search..." />
                         <Input transparent icon="search" focus iconPosition="left" placeholder="Search..." />
                         <Input transparent icon="search" disabled iconPosition="left" placeholder="Search..." />
                         <Input transparent icon="search" iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                         <Input transparent icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                         <Input transparent icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                     </div>
                     <div className="flex flex-column items-start">
                         <Input loading transparent className="paused" placeholder="Search..." />
                         <Input loading transparent className="paused" disabled placeholder="Search..." />
                         <Input loading transparent className="paused" disabled placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading transparent className="paused" icon="search" placeholder="Search..." />
                         <Input loading transparent className="paused" focus icon="search" placeholder="Search..." />
                         <Input loading transparent className="paused" disabled icon="search" placeholder="Search..." />
                         <Input loading transparent className="paused" icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading transparent className="paused" focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading transparent className="paused" disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading transparent className="paused" icon="search" iconPosition="left" placeholder="Search..." />
                         <Input loading transparent className="paused" icon="search" focus iconPosition="left" placeholder="Search..." />
                         <Input loading transparent className="paused" icon="search" disabled iconPosition="left" placeholder="Search..." />
                         <Input loading transparent className="paused" icon="search" iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading transparent className="paused" icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                         <Input loading transparent className="paused" icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                     </div>
                 </div>
                 <div className="flex flex-row">
                     <div className="flex flex-column items-start">
                         <Input transparent className="success" placeholder="Search..." />
                         <Input transparent className="success" focus placeholder="Search..." />
                         <Input transparent className="success" disabled placeholder="Search..." />
                         <Input transparent className="success" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent className="success" focus placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent className="success" disabled placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent className="success" icon="search" placeholder="Search..." />
                         <Input transparent className="success" focus icon="search" placeholder="Search..." />
                         <Input transparent className="success" disabled icon="search" placeholder="Search..." />
                         <Input transparent className="success" icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent className="success" focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent className="success" disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent className="success" icon="search" iconPosition="left" placeholder="Search..." />
                         <Input transparent className="success" icon="search" focus iconPosition="left" placeholder="Search..." />
                         <Input transparent className="success" icon="search" disabled iconPosition="left" placeholder="Search..." />
                         <Input transparent className="success" icon="search" iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                         <Input transparent className="success" icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                         <Input transparent className="success" icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                     </div>
                     <div className="flex flex-column items-start">
                         <Input transparent loading className="paused success" placeholder="Search..." />
                         <Input transparent loading className="paused success" disabled placeholder="Search..." />
                         <Input transparent loading className="paused success" disabled placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent loading className="paused success" icon="search" placeholder="Search..." />
                         <Input transparent loading className="paused success" focus icon="search" placeholder="Search..." />
                         <Input transparent loading className="paused success" disabled icon="search" placeholder="Search..." />
                         <Input transparent loading className="paused success" icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent loading className="paused success" focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent loading className="paused success" disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent loading className="paused success" icon="search" iconPosition="left" placeholder="Search..." />
                         <Input transparent loading className="paused success" icon="search" focus iconPosition="left" placeholder="Search..." />
                         <Input transparent loading className="paused success" icon="search" disabled iconPosition="left" placeholder="Search..." />
                         <Input transparent loading className="paused success" icon="search" iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent loading className="paused success" icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent loading className="paused success" icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                     </div>
                 </div>
                 <div className="flex flex-row">
                     <div className="flex flex-column items-start">
                         <Input transparent error placeholder="Search..." />
                         <Input transparent error focus placeholder="Search..." />
                         <Input transparent error disabled placeholder="Search..." />
                         <Input transparent error placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent error focus placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent error disabled placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent error icon="search" placeholder="Search..." />
                         <Input transparent error focus icon="search" placeholder="Search..." />
                         <Input transparent error disabled icon="search" placeholder="Search..." />
                         <Input transparent error icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent error focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent error disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent error icon="search" iconPosition="left" placeholder="Search..." />
                         <Input transparent error icon="search" focus iconPosition="left" placeholder="Search..." />
                         <Input transparent error icon="search" disabled iconPosition="left" placeholder="Search..." />
                         <Input transparent error icon="search" iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                         <Input transparent error icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                         <Input transparent error icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                     </div>
                     <div className="flex flex-column items-start">
                         <Input transparent loading className="paused" error placeholder="Search..." />
                         <Input transparent loading className="paused" error disabled placeholder="Search..." />
                         <Input transparent loading className="paused" error disabled placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent loading className="paused" error icon="search" placeholder="Search..." />
                         <Input transparent loading className="paused" error focus icon="search" placeholder="Search..." />
                         <Input transparent loading className="paused" error disabled icon="search" placeholder="Search..." />
                         <Input transparent loading className="paused" error icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent loading className="paused" error focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent loading className="paused" error disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent loading className="paused" error icon="search" iconPosition="left" placeholder="Search..." />
                         <Input transparent loading className="paused" error icon="search" focus iconPosition="left" placeholder="Search..." />
                         <Input transparent loading className="paused" error icon="search" disabled iconPosition="left" placeholder="Search..." />
                         <Input transparent loading className="paused" error icon="search" iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent loading className="paused" error icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                         <Input transparent loading className="paused" error icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                     </div>
                 </div>
             </div>
    )
    .add("variations",
         () =>
             <div style={{ width: "333px" }}>
                 <Input fluid placeholder="Search..." />
                 <Input fluid focus placeholder="Search..." />
                 <Input fluid disabled placeholder="Search..." />
             </div>
    )
    .add("sizes",
         () =>
             <div className="flex flex-column items-start">
                 <Input size="tiny" placeholder="Search..." />
                 <Input size="small" placeholder="Search..." />
                 <Input placeholder="Search..." />
                 <Input size="large" placeholder="Search..." />
             </div>
    );
