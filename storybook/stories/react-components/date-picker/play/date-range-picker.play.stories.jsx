import {
    DateRangePicker
} from "@orbit-ui/react-date-picker/src";
import { logDatesChanged } from "@stories/react-components/date-picker/shared";
import { storiesBuilder } from "@utils/stories-builder";

function stories(segment) {
    return storiesBuilder(module, "Date-Range-Picker|play")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticIgnoreStory()
        .build();
}

stories()
    .add("default",
         () =>
             <DateRangePicker
                 onDatesChange={logDatesChanged}
             />
    );
