import { Icon } from "semantic-ui-react";
import { storiesBuilder } from "@utils/stories-builder";

function stories(segment) {
    return storiesBuilder(module, "Semantic-UI-Theme|icon")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-column">
                 <Icon name="search" />
                 <Icon flipped="horizontally" name="search" />
                 <Icon flipped="vertically" name="search" />
                 <Icon disabled name="search" />
                 <Icon flipped="horizontally" disabled name="search" />
                 <Icon flipped="vertically" disabled name="search" />
                 <Icon name="delete" />
                 <Icon flipped="horizontally" name="delete" />
                 <Icon flipped="vertically" name="delete" />
                 <Icon disabled name="delete" />
                 <Icon disabled flipped="horizontally" name="delete" />
                 <Icon disabled flipped="vertically" name="delete" />
                 <Icon name="close" />
                 <Icon flipped="horizontally" name="close" />
                 <Icon flipped="vertically" name="close" />
                 <Icon disabled name="close" />
                 <Icon disabled flipped="horizontally" name="close" />
                 <Icon disabled flipped="vertically" name="close" />
             </div>
    );
